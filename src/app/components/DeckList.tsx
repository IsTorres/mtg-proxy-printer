import { Layers } from "lucide-react";
import type { CardEntry } from "../types";
import { DeckEntry } from "./DeckEntry";

interface DeckListProps {
  entries: CardEntry[];
  totalCards: number;
  totalPages: number;
  onAdjustQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function DeckList({
  entries,
  totalCards,
  totalPages,
  onAdjustQty,
  onRemove,
  onClearAll,
}: DeckListProps) {
  return (
    <>
      <div className="px-4 pt-3 pb-1 flex items-center justify-between flex-shrink-0">
        <span className="text-[9px] font-mono text-muted-foreground tracking-[0.2em]">
          DECK LIST
        </span>
        <span className="text-[10px] font-mono text-muted-foreground">
          {totalCards}{" "}
          <span className="text-muted-foreground/60">cards</span>
          {" · "}
          {totalPages}{" "}
          <span className="text-muted-foreground/60">{totalPages === 1 ? "page" : "pages"}</span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center px-4">
            <Layers size={28} className="text-muted-foreground opacity-30" />
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Search for cards above and add them to your proxy sheet.
            </p>
          </div>
        ) : (
          <div className="space-y-0.5 pt-1">
            {entries.map(entry => (
              <DeckEntry
                key={entry.card.id}
                entry={entry}
                onAdjustQty={onAdjustQty}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div className="px-4 py-3 border-t border-border flex-shrink-0">
          <button
            onClick={onClearAll}
            className="w-full text-[10px] font-mono text-muted-foreground hover:text-red-400 transition-colors tracking-widest"
          >
            CLEAR ALL
          </button>
        </div>
      )}
    </>
  );
}
