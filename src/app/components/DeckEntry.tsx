import React from "react";
import { X, Minus, Plus } from "lucide-react";
import type { CardEntry } from "../types";

interface DeckEntryProps {
  entry: CardEntry;
  onAdjustQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

function DeckEntryInner({ entry, onAdjustQty, onRemove }: DeckEntryProps) {
  const { card, qty } = entry;

  return (
    <div className="flex items-center gap-2 px-2 py-1.5 group hover:bg-surface-variant/50 rounded-lg transition-colors">
      <img
        src={card.url}
        alt={card.name}
        className="w-6 h-[34px] object-cover flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity rounded"
      />
      <span className="text-[12px] font-display font-semibold flex-1 truncate min-w-0 text-on-surface/90">
        {card.name}
      </span>

      <div className="flex items-center gap-0.5 flex-shrink-0">
        <button
          onClick={() => onAdjustQty(card.id, -1)}
          className="w-5 h-5 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <Minus size={9} />
        </button>
        <span className="w-5 text-center text-[11px] font-mono text-primary">
          {qty}
        </span>
        <button
          onClick={() => onAdjustQty(card.id, 1)}
          className="w-5 h-5 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <Plus size={9} />
        </button>
      </div>

      <button
        onClick={() => onRemove(card.id)}
        className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all flex-shrink-0 ml-0.5"
      >
        <X size={11} />
      </button>
    </div>
  );
}

export const DeckEntry = React.memo(DeckEntryInner);
