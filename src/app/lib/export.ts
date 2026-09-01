import { jsPDF } from "jspdf";
import type { CardImage } from "../types";
import {
  CARD_W_PX,
  CARD_H_PX,
  CARDS_PER_PAGE,
  SAFE_MARGIN_MM,
  A4_W_PX,
  A4_H_PX,
} from "../constants";

interface ExportOptions {
  safeMargin: boolean;
  cardSpacing: number;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export async function renderPageToCanvas(
  cards: CardImage[],
  showCutLines: boolean,
  options: ExportOptions
): Promise<HTMLCanvasElement> {
  const { safeMargin, cardSpacing } = options;

  const canvas = document.createElement("canvas");
  canvas.width = A4_W_PX;
  canvas.height = A4_H_PX;
  const ctx = canvas.getContext("2d")!;

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, A4_W_PX, A4_H_PX);

  // Convert mm to px at 300 DPI (1mm ≈ 11.811px)
  const mmToPx = 11.811;
  const spacingPx = cardSpacing * mmToPx;
  const padPx = safeMargin ? SAFE_MARGIN_MM * mmToPx : 0;

  // Grid dimensions
  const gridW = CARD_W_PX * 3 + spacingPx * 2;
  const gridH = CARD_H_PX * 3 + spacingPx * 2;
  const offsetX = (A4_W_PX - gridW) / 2;
  const offsetY = (A4_H_PX - gridH) / 2;

  const slots = Array.from({ length: CARDS_PER_PAGE }, (_, i) => cards[i] ?? null);

  const imagePromises = slots.map(card =>
    card ? loadImage(card.url).catch(() => null) : Promise.resolve(null)
  );
  const images = await Promise.all(imagePromises);

  for (let i = 0; i < CARDS_PER_PAGE; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = offsetX + col * (CARD_W_PX + spacingPx);
    const y = offsetY + row * (CARD_H_PX + spacingPx);

    const img = images[i];
    if (img) {
      ctx.drawImage(img, x, y, CARD_W_PX, CARD_H_PX);
    } else {
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(x, y, CARD_W_PX, CARD_H_PX);
      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = "#cccccc";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, CARD_W_PX, CARD_H_PX);
      ctx.setLineDash([]);
    }

    if (showCutLines) {
      ctx.strokeStyle = "#99907c";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      ctx.strokeRect(x, y, CARD_W_PX, CARD_H_PX);
      ctx.setLineDash([]);
    }
  }

  return canvas;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadPNG(
  cards: CardImage[],
  showCutLines: boolean,
  pageNum: number,
  options: ExportOptions
) {
  const canvas = await renderPageToCanvas(cards, showCutLines, options);
  canvas.toBlob(blob => {
    if (blob) downloadBlob(blob, `proxy-page-${pageNum}.png`);
  }, "image/png");
}

export async function downloadJPG(
  cards: CardImage[],
  showCutLines: boolean,
  pageNum: number,
  options: ExportOptions
) {
  const canvas = await renderPageToCanvas(cards, showCutLines, options);
  canvas.toBlob(blob => {
    if (blob) downloadBlob(blob, `proxy-page-${pageNum}.jpg`);
  }, "image/jpeg", 0.95);
}

export async function downloadPDF(
  allPages: CardImage[][],
  showCutLines: boolean,
  options: ExportOptions
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  for (let i = 0; i < allPages.length; i++) {
    if (i > 0) doc.addPage();
    const canvas = await renderPageToCanvas(allPages[i], showCutLines, options);
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    doc.addImage(imgData, "JPEG", 0, 0, 210, 297);
  }

  doc.save("proxy-sheet.pdf");
}
