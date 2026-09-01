import { jsPDF } from "jspdf";
import type { CardImage } from "../types";
import {
  A4_W_PX,
  A4_H_PX,
  CARD_W_PX,
  CARD_H_PX,
  CARDS_PER_PAGE,
} from "../constants";

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
  showCutLines: boolean
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = A4_W_PX;
  canvas.height = A4_H_PX;
  const ctx = canvas.getContext("2d")!;

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, A4_W_PX, A4_H_PX);

  // Center the 3x3 grid on A4
  const gridW = CARD_W_PX * 3;
  const gridH = CARD_H_PX * 3;
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
    const x = offsetX + col * CARD_W_PX;
    const y = offsetY + row * CARD_H_PX;

    const img = images[i];
    if (img) {
      ctx.drawImage(img, x, y, CARD_W_PX, CARD_H_PX);
    } else {
      // Empty slot
      ctx.fillStyle = "#f2f2f2";
      ctx.fillRect(x, y, CARD_W_PX, CARD_H_PX);
      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = "#cccccc";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, CARD_W_PX, CARD_H_PX);
      ctx.setLineDash([]);
    }

    if (showCutLines) {
      ctx.strokeStyle = "#bbbbbb";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, CARD_W_PX, CARD_H_PX);
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
  pageNum: number
) {
  const canvas = await renderPageToCanvas(cards, showCutLines);
  canvas.toBlob(blob => {
    if (blob) downloadBlob(blob, `proxy-page-${pageNum}.png`);
  }, "image/png");
}

export async function downloadJPG(
  cards: CardImage[],
  showCutLines: boolean,
  pageNum: number
) {
  const canvas = await renderPageToCanvas(cards, showCutLines);
  canvas.toBlob(blob => {
    if (blob) downloadBlob(blob, `proxy-page-${pageNum}.jpg`);
  }, "image/jpeg", 0.95);
}

export async function downloadPDF(
  allPages: CardImage[][],
  showCutLines: boolean
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  for (let i = 0; i < allPages.length; i++) {
    if (i > 0) doc.addPage();
    const canvas = await renderPageToCanvas(allPages[i], showCutLines);
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    doc.addImage(imgData, "JPEG", 0, 0, 210, 297);
  }

  doc.save("proxy-sheet.pdf");
}
