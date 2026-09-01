import React from "react";
import { X, Minus, Plus } from "lucide-react";
import type { CardEntry } from "../types";
import { imageUrl } from "../lib/scryfall";

interface DeckEntryProps {
  entry: CardEntry;
  onAdjustQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

function DeckEntryInner({ entry, onAdjustQty, onRemove }: DeckEntryProps) {
  const { card, qty } = entry;

  return (
    <div className="flex items-center gap-2 px-2 py-1.5 group hover:bg-muted/30 transition-colors">
      <img
        src={imageUrl(card)}
        alt={card.name}
        className="w-6 h-[34px] object-cover flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity"
      />
      <span className="text-[12px] flex-1 truncate min-w-0 text-foreground/90">
        {card.name}
      </span>

      <div className="flex items-center gap-0.5 flex-shrink-0">
        <button
          onClick={() => onAdjustQty(card.id, -1)}
          className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Minus size={9} />
        </button>
        <span className="w-5 text-center text-[11px] font-mono text-accent">
          {qty}
        </span>
        <button
          onClick={() => onAdjustQty(card.id, 1)}
          className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus size={9} />
        </button>
      </div>

      <button
        onClick={() => onRemove(card.id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-all flex-shrink-0 ml-0.5"
      >
        <X size={11} />
      </button>
    </div>
  );
}

export const DeckEntry = React.memo(DeckEntryInner);
