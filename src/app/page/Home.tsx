import { useState, useCallback } from "react";
import type { CardImage } from "../types";
import {
  CARDS_PER_PAGE,
  DEFAULT_CARD_SPACING,
  DEFAULT_SAFE_MARGIN,
} from "../constants";
import { useScryfallSearch } from "../hooks/useScryfallSearch";
import { useDeck } from "../hooks/useDeck";
import { usePagination } from "../hooks/usePagination";
import { SearchBar } from "../components/SearchBar";
import { CustomCardUpload } from "../components/CustomCardUpload";
import { DeckList } from "../components/DeckList";
import { PrintPreview } from "../components/PrintPreview";
import { PrintSheet } from "../components/PrintSheet";
import { PrintSettings } from "../components/PrintSettings";
import { downloadPDF, downloadPNG, downloadJPG } from "../lib/export";

export function Home() {
  const { query, setQuery, results, noResults, searching, clearSearch } =
    useScryfallSearch();
  const {
    entries,
    flatCards,
    totalPages,
    addCard,
    addCustomCard,
    removeEntry,
    adjustQty,
    clearAll,
  } = useDeck();
  const { safePage, prev, next, reset } = usePagination(totalPages);

  // Print settings
  const [showCutLines, setShowCutLines] = useState(true);
  const [safeMargin, setSafeMargin] = useState(DEFAULT_SAFE_MARGIN);
  const [cardSpacing, setCardSpacing] = useState(DEFAULT_CARD_SPACING);
  const [exporting, setExporting] = useState(false);

  const handleSelectCard = useCallback(
    (card: CardImage) => {
      addCard(card);
      clearSearch();
    },
    [addCard, clearSearch],
  );

  const handleClearAll = useCallback(() => {
    clearAll();
    reset();
  }, [clearAll, reset]);

  const previewCards = flatCards.slice(
    safePage * CARDS_PER_PAGE,
    (safePage + 1) * CARDS_PER_PAGE,
  );

  const exportOptions = { safeMargin, cardSpacing };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const pages: CardImage[][] = [];
      for (let i = 0; i < totalPages; i++) {
        pages.push(
          flatCards.slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE),
        );
      }
      await downloadPDF(pages, showCutLines, exportOptions);
    } finally {
      setExporting(false);
    }
  };

  const handleExportPNG = async () => {
    setExporting(true);
    try {
      await downloadPNG(
        previewCards,
        showCutLines,
        safePage + 1,
        exportOptions,
      );
    } finally {
      setExporting(false);
    }
  };

  const handleExportJPG = async () => {
    setExporting(true);
    try {
      await downloadJPG(
        previewCards,
        showCutLines,
        safePage + 1,
        exportOptions,
      );
    } finally {
      setExporting(false);
    }
  };

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
        ::-webkit-scrollbar-thumb { background: rgba(242,202,80,0.2); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(242,202,80,0.4); }
      `}</style>

      <div className="screen-ui h-screen bg-background text-foreground flex flex-col font-sans overflow-hidden">
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0 border-r border-outline-variant/30 flex flex-col overflow-hidden bg-sidebar">
            {/* Brand */}
            <div className="px-6 py-5 border-b border-outline-variant/30">
              <h1 className="font-display text-xl font-bold tracking-[0.15em] text-primary uppercase">
                Proxy Forge
              </h1>
              <p className="text-[10px] font-mono text-on-surface-variant tracking-[0.2em] mt-1">
                MTG · A4 PRINT LAYOUT
              </p>
            </div>

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

          {/* Canvas Area */}
          <PrintPreview
            previewCards={previewCards}
            showCutLines={showCutLines}
            safePage={safePage}
            totalPages={totalPages}
            onPrevPage={prev}
            onNextPage={next}
            safeMargin={safeMargin}
            cardSpacing={cardSpacing}
          />

          <PrintSettings
            showCutLines={showCutLines}
            onToggleCutLines={() => setShowCutLines((v) => !v)}
            safeMargin={safeMargin}
            onToggleSafeMargin={() => setSafeMargin((v) => !v)}
            cardSpacing={cardSpacing}
            onSpacingChange={setCardSpacing}
            onExportPDF={handleExportPDF}
            onExportPNG={handleExportPNG}
            onExportJPG={handleExportJPG}
            exporting={exporting}
            hasCards={flatCards.length > 0}
          />
        </div>
      </div>

      <div className="print-area">
        {Array.from({ length: totalPages }).map((_, pageIdx) => (
          <PrintSheet
            key={pageIdx}
            cards={flatCards.slice(
              pageIdx * CARDS_PER_PAGE,
              (pageIdx + 1) * CARDS_PER_PAGE,
            )}
            showCutLines={showCutLines}
            safeMargin={safeMargin}
            cardSpacing={cardSpacing}
          />
        ))}
      </div>
    </>
  );
}
