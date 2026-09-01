import { Search, X, Loader2, Plus } from "lucide-react";
import type { ScryfallCard, CardImage } from "../types";
import { imageUrl, toCardImage } from "../lib/scryfall";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  results: ScryfallCard[];
  noResults: boolean;
  searching: boolean;
  onSelectCard: (card: CardImage) => void;
}

export function SearchBar({
  query,
  onQueryChange,
  results,
  noResults,
  searching,
  onSelectCard,
}: SearchBarProps) {
  const handleBlur = () => {
    setTimeout(() => onQueryChange(""), 160);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onQueryChange("");
    if (e.key === "Enter" && results.length > 0) onSelectCard(toCardImage(results[0]));
  };

  return (
    <div className="px-5 py-4 border-b border-outline-variant/30">
      <div className="text-[10px] font-mono text-primary tracking-[0.15em] mb-2 uppercase">
        Search Cards
      </div>

      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
        />
        <input
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Lightning Bolt…"
          className="w-full bg-surface-container border border-outline-variant/30 rounded-lg pl-9 pr-8 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        {query && !searching && (
          <button
            onMouseDown={() => onQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
          >
            <X size={12} />
          </button>
        )}
        {searching && (
          <Loader2
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary animate-spin"
          />
        )}
      </div>

      {(results.length > 0 || noResults) && (
        <div className="mt-2 border border-outline-variant/30 bg-surface-container rounded-lg overflow-hidden shadow-lg">
          {noResults ? (
            <div className="px-3 py-2.5 text-[11px] font-mono text-on-surface-variant">
              No cards found.
            </div>
          ) : (
            results.map(card => (
              <button
                key={card.id}
                onMouseDown={() => onSelectCard(toCardImage(card))}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-primary/5 text-left group transition-colors border-b border-outline-variant/20 last:border-0"
              >
                <img
                  src={imageUrl(card)}
                  alt={card.name}
                  className="w-7 h-[39px] object-cover flex-shrink-0 rounded"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-display font-semibold leading-tight truncate text-on-surface">
                    {card.name}
                  </div>
                  <div className="text-[10px] font-mono text-on-surface-variant truncate mt-0.5">
                    {card.set_name}
                  </div>
                </div>
                <Plus
                  size={12}
                  className="text-on-surface-variant group-hover:text-primary flex-shrink-0 transition-colors"
                />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
