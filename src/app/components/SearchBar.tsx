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
    <div className="p-4 border-b border-border">
      <div className="text-[9px] font-mono text-muted-foreground tracking-[0.2em] mb-2">
        SEARCH CARDS
      </div>

      <div className="relative">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <input
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Lightning Bolt…"
          className="w-full bg-input-background border border-border pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
        />
        {query && !searching && (
          <button
            onMouseDown={() => onQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={11} />
          </button>
        )}
        {searching && (
          <Loader2
            size={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground animate-spin"
          />
        )}
      </div>

      {(results.length > 0 || noResults) && (
        <div className="mt-1 border border-border bg-card overflow-hidden">
          {noResults ? (
            <div className="px-3 py-2.5 text-[11px] font-mono text-muted-foreground">
              No cards found.
            </div>
          ) : (
            results.map(card => (
              <button
                key={card.id}
                onMouseDown={() => onSelectCard(toCardImage(card))}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent/10 text-left group transition-colors border-b border-border/50 last:border-0"
              >
                <img
                  src={imageUrl(card)}
                  alt={card.name}
                  className="w-7 h-[39px] object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] leading-tight truncate">{card.name}</div>
                  <div className="text-[10px] font-mono text-muted-foreground truncate mt-0.5">
                    {card.set_name}
                  </div>
                </div>
                <Plus
                  size={12}
                  className="text-muted-foreground group-hover:text-accent flex-shrink-0 transition-colors"
                />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
