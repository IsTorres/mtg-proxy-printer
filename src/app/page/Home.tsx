import { useState, useCallback } from "react";
import type { CardImage } from "../types";
import { CARDS_PER_PAGE } from "../constants";
import { useScryfallSearch } from "../hooks/useScryfallSearch";
import { useDeck } from "../hooks/useDeck";
import { usePagination } from "../hooks/usePagination";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CustomCardUpload } from "../components/CustomCardUpload";
import { DeckList } from "../components/DeckList";
import { PrintPreview } from "../components/PrintPreview";
import { PrintSheet } from "../components/PrintSheet";

export function Home() {
  const { query, setQuery, results, noResults, searching, clearSearch } = useScryfallSearch();
  const { entries, flatCards, totalPages, addCard, addCustomCard, removeEntry, adjustQty, clearAll } = useDeck();
  const { safePage, prev, next, reset } = usePagination(totalPages);
  const [showCutLines, setShowCutLines] = useState(true);

  const handleSelectCard = useCallback(
    (card: CardImage) => {
      addCard(card);
      clearSearch();
    },
    [addCard, clearSearch]
  );

  const handleClearAll = useCallback(() => {
    clearAll();
    reset();
  }, [clearAll, reset]);

  const previewCards = flatCards.slice(
    safePage * CARDS_PER_PAGE,
    (safePage + 1) * CARDS_PER_PAGE
  );

  return (
    <>
      <style>{`
        @media print {
          .screen-ui { display: none !important; }
          .print-area { display: block !important; }
          @page { margin: 0; size: A4 portrait; }
        }
        .print-area { display: none; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.35); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(200,169,110,0.65); }
      `}</style>

      <div className="screen-ui min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Header
          showCutLines={showCutLines}
          onToggleCutLines={() => setShowCutLines(v => !v)}
          flatCards={flatCards}
          totalPages={totalPages}
          currentPage={safePage}
        />

        <div className="flex flex-1 min-h-0">
          <aside className="w-72 flex-shrink-0 border-r border-border flex flex-col overflow-hidden">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              results={results}
              noResults={noResults}
              searching={searching}
              onSelectCard={handleSelectCard}
            />
            <CustomCardUpload onAddCustom={addCustomCard} />
            <DeckList
              entries={entries}
              totalCards={flatCards.length}
              totalPages={totalPages}
              onAdjustQty={adjustQty}
              onRemove={removeEntry}
              onClearAll={handleClearAll}
            />
          </aside>

          <PrintPreview
            previewCards={previewCards}
            showCutLines={showCutLines}
            safePage={safePage}
            totalPages={totalPages}
            onPrevPage={prev}
            onNextPage={next}
          />
        </div>
      </div>

      <div className="print-area">
        {Array.from({ length: totalPages }).map((_, pageIdx) => (
          <PrintSheet
            key={pageIdx}
            cards={flatCards.slice(pageIdx * CARDS_PER_PAGE, (pageIdx + 1) * CARDS_PER_PAGE)}
            showCutLines={showCutLines}
          />
        ))}
      </div>
    </>
  );
}
