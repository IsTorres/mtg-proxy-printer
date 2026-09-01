import React from "react";
import type { CardImage } from "../types";
import { CARDS_PER_PAGE, SAFE_MARGIN_MM, A4_W, A4_H } from "../constants";

interface PrintSheetProps {
  cards: CardImage[];
  showCutLines: boolean;
  safeMargin: boolean;
  cardSpacing: number;
}

function PrintSheetInner({ cards, showCutLines, safeMargin, cardSpacing }: PrintSheetProps) {
  const slots = Array.from({ length: CARDS_PER_PAGE }, (_, i) => cards[i] ?? null);
  const pad = safeMargin ? SAFE_MARGIN_MM : 0;

  return (
    <div
      style={{
        width: `${A4_W}px`,
        height: `${A4_H}px`,
        backgroundColor: "white",
        display: "grid",
        gridTemplateColumns: "repeat(3, 63mm)",
        gridTemplateRows: "repeat(3, 88mm)",
        justifyContent: "center",
        alignContent: "center",
        gap: `${cardSpacing}mm`,
        padding: safeMargin ? `${pad}mm` : 0,
        boxSizing: "border-box",
        pageBreakAfter: "always",
        breakAfter: "page",
      }}
    >
      {slots.map((card, i) => (
        <div
          key={i}
          style={{
            width: "63mm",
            height: "88mm",
            overflow: "hidden",
            position: "relative",
            outline: showCutLines ? "0.3mm dashed #99907c" : "none",
            boxSizing: "border-box",
          }}
        >
          {card ? (
            <img
              src={card.url}
              alt={card.name}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f5f5",
                border: "0.5mm dashed #ccc",
                boxSizing: "border-box",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export const PrintSheet = React.memo(PrintSheetInner);
