import React from "react";
import type { CardImage } from "../types";
import { CARDS_PER_PAGE } from "../constants";

interface PrintSheetProps {
  cards: CardImage[];
  showCutLines: boolean;
}

function PrintSheetInner({ cards, showCutLines }: PrintSheetProps) {
  const slots = Array.from({ length: CARDS_PER_PAGE }, (_, i) => cards[i] ?? null);

  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        backgroundColor: "white",
        display: "grid",
        gridTemplateColumns: "repeat(3, 63mm)",
        gridTemplateRows: "repeat(3, 88mm)",
        justifyContent: "center",
        alignContent: "center",
        gap: 0,
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
            outline: showCutLines ? "0.3mm solid #bbb" : "none",
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
                backgroundColor: "#f2f2f2",
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
