import { useState, useCallback, useRef, useEffect } from "react";
import {
  Search,
  X,
  Printer,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Loader2,
  Layers,
  Scissors,
  Info,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface ScryfallCard {
  id: string;
  name: string;
  type_line: string;
  set_name: string;
  image_uris?: { normal: string; large: string };
  card_faces?: Array<{ image_uris?: { normal: string; large: string } }>;
}

interface CardEntry {
  card: ScryfallCard;
  qty: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function imageUrl(card: ScryfallCard, size: "normal" | "large" = "normal"): string {
  if (card.image_uris) return card.image_uris[size] ?? card.image_uris.normal;
  if (card.card_faces?.[0]?.image_uris)
    return card.card_faces[0].image_uris[size] ?? card.card_faces[0].image_uris.normal ?? "";
  return "";
}

const CARDS_PER_PAGE = 9;
// A4 at 96 dpi: 793.7 × 1122.5 px
const A4_W = 793.7;
const A4_H = 1122.5;
const PREVIEW_SCALE = 0.46;

// ── PrintSheet ─────────────────────────────────────────────────────────────

function PrintSheet({
  cards,
  showCutLines,
}: {
  cards: ScryfallCard[];
  showCutLines: boolean;
}) {
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
              src={imageUrl(card, "large")}
              alt={card.name}
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

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ScryfallCard[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const [entries, setEntries] = useState<CardEntry[]>([]);
  const [previewPage, setPreviewPage] = useState(0);
  const [showCutLines, setShowCutLines] = useState(true);
  const [showTip, setShowTip] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const flatCards = entries.flatMap(({ card, qty }) =>
    Array<ScryfallCard>(qty).fill(card)
  );
  const totalPages = Math.max(1, Math.ceil(flatCards.length / CARDS_PER_PAGE));
  const safePage = Math.min(previewPage, totalPages - 1);
  const previewCards = flatCards.slice(safePage * CARDS_PER_PAGE, (safePage + 1) * CARDS_PER_PAGE);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setNoResults(false);
      return;
    }
    setSearching(true);
    setNoResults(false);
    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(q)}&unique=cards&order=name`
      );
      if (res.status === 404) {
        setResults([]);
        setNoResults(true);
        return;
      }
      if (!res.ok) {
        setResults([]);
        return;
      }
      const data = await res.json();
      const cards = (data.data as ScryfallCard[]).slice(0, 10);
      setResults(cards);
      setNoResults(cards.length === 0);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 380);
    return () => clearTimeout(debounceRef.current);
  }, [query, doSearch]);

  const addCard = (card: ScryfallCard) => {
    setEntries(prev => {
      const existing = prev.find(e => e.card.id === card.id);
      if (existing)
        return prev.map(e => (e.card.id === card.id ? { ...e, qty: e.qty + 1 } : e));
      return [...prev, { card, qty: 1 }];
    });
    setQuery("");
    setResults([]);
    setNoResults(false);
  };

  const removeEntry = (id: string) =>
    setEntries(prev => prev.filter(e => e.card.id !== id));

  const adjustQty = (id: string, delta: number) =>
    setEntries(prev =>
      prev.map(e => (e.card.id === id ? { ...e, qty: Math.max(1, e.qty + delta) } : e))
    );

  const clearAll = () => {
    setEntries([]);
    setPreviewPage(0);
  };

  return (
    <>
      {/* ── Global print + utility styles ── */}
      <style>{`
        @media print {
          .screen-ui { display: none !important; }
          .print-area { display: block !important; }
          @page { margin: 0; size: A4 portrait; }
        }
        .print-area { display: none; }

        /* Thin amber scrollbar */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.35); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(200,169,110,0.65); }
      `}</style>

      {/* ── Screen UI ── */}
      <div className="screen-ui min-h-screen bg-background text-foreground flex flex-col font-sans">
        {/* Header */}
        <header className="border-b border-border px-5 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-semibold tracking-[0.2em] text-accent uppercase select-none">
              Proxy Forge
            </span>
            <span className="hidden sm:block w-px h-3.5 bg-border" />
            <span className="hidden sm:block text-[10px] font-mono text-muted-foreground tracking-widest">
              MTG · A4 PRINT LAYOUT
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Cut lines toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer group select-none">
              <div
                className={`w-8 h-4 rounded-none relative transition-colors ${
                  showCutLines ? "bg-accent/30" : "bg-muted"
                }`}
                onClick={() => setShowCutLines(v => !v)}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 bg-accent transition-all ${
                    showCutLines ? "left-4" : "left-0.5"
                  }`}
                />
              </div>
              <Scissors size={12} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-[11px] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                Cut lines
              </span>
            </label>

            {/* Print tip */}
            <div className="relative">
              <button
                onClick={() => setShowTip(v => !v)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Info size={14} />
              </button>
              {showTip && (
                <div className="absolute right-0 top-7 w-64 bg-card border border-border p-3 z-50 shadow-2xl">
                  <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
                    In the print dialog:<br />
                    · Set paper size to <span className="text-foreground">A4</span><br />
                    · Set margins to <span className="text-foreground">None</span><br />
                    · Disable headers &amp; footers<br />
                    · Enable <span className="text-foreground">Background graphics</span>
                  </p>
                  <button
                    onClick={() => setShowTip(false)}
                    className="absolute top-1.5 right-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}
            </div>

            {/* Print button */}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-accent text-[#0c0c11] px-4 py-2 text-[12px] font-mono font-medium tracking-wider hover:bg-accent/80 transition-colors"
            >
              <Printer size={13} />
              PRINT
            </button>
          </div>
        </header>

        <div className="flex flex-1 min-h-0">
          {/* ── Left sidebar ── */}
          <aside className="w-72 flex-shrink-0 border-r border-border flex flex-col overflow-hidden">
            {/* Search section */}
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
                  onChange={e => setQuery(e.target.value)}
                  onBlur={() => setTimeout(() => { setResults([]); setNoResults(false); }, 160)}
                  onKeyDown={e => {
                    if (e.key === "Escape") { setQuery(""); setResults([]); setNoResults(false); }
                    if (e.key === "Enter" && results.length > 0) addCard(results[0]);
                  }}
                  placeholder="Lightning Bolt…"
                  className="w-full bg-input-background border border-border pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
                {(query && !searching) && (
                  <button
                    onMouseDown={() => { setQuery(""); setResults([]); setNoResults(false); }}
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

              {/* Results dropdown */}
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
                        onMouseDown={() => addCard(card)}
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

            {/* Deck list */}
            <div className="px-4 pt-3 pb-1 flex items-center justify-between flex-shrink-0">
              <span className="text-[9px] font-mono text-muted-foreground tracking-[0.2em]">
                DECK LIST
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                {flatCards.length}{" "}
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
                  {entries.map(({ card, qty }) => (
                    <div
                      key={card.id}
                      className="flex items-center gap-2 px-2 py-1.5 group hover:bg-muted/30 transition-colors"
                    >
                      <img
                        src={imageUrl(card)}
                        alt={card.name}
                        className="w-6 h-[34px] object-cover flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="text-[12px] flex-1 truncate min-w-0 text-foreground/90">
                        {card.name}
                      </span>

                      {/* Qty controls */}
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <button
                          onClick={() => adjustQty(card.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus size={9} />
                        </button>
                        <span className="w-5 text-center text-[11px] font-mono text-accent">
                          {qty}
                        </span>
                        <button
                          onClick={() => adjustQty(card.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus size={9} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeEntry(card.id)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-all flex-shrink-0 ml-0.5"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {entries.length > 0 && (
              <div className="px-4 py-3 border-t border-border flex-shrink-0">
                <button
                  onClick={clearAll}
                  className="w-full text-[10px] font-mono text-muted-foreground hover:text-red-400 transition-colors tracking-widest"
                >
                  CLEAR ALL
                </button>
              </div>
            )}
          </aside>

          {/* ── A4 Preview ── */}
          <main className="flex-1 flex flex-col items-center justify-center bg-background overflow-auto p-8"
            style={{ backgroundImage: "radial-gradient(rgba(200,169,110,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          >
            {/* Page navigation */}
            <div className="mb-5 flex items-center gap-5 flex-shrink-0">
              <button
                onClick={() => setPreviewPage(p => Math.max(0, p - 1))}
                disabled={safePage === 0}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.18em]">
                PAGE {safePage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPreviewPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={safePage >= totalPages - 1}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Paper shadow + sheet */}
            <div
              className="flex-shrink-0"
              style={{
                width: `${A4_W * PREVIEW_SCALE}px`,
                height: `${A4_H * PREVIEW_SCALE}px`,
                overflow: "hidden",
                boxShadow: "0 12px 60px rgba(0,0,0,0.7), 0 2px 12px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  transform: `scale(${PREVIEW_SCALE})`,
                  transformOrigin: "top left",
                  width: `${A4_W}px`,
                  height: `${A4_H}px`,
                }}
              >
                <PrintSheet cards={previewCards} showCutLines={showCutLines} />
              </div>
            </div>

            <div className="mt-4 text-[9px] font-mono text-muted-foreground/50 tracking-[0.18em] flex-shrink-0">
              A4 · 210 × 297 MM · 9 CARDS PER PAGE · 63 × 88 MM
            </div>
          </main>
        </div>
      </div>

      {/* ── Print area (hidden on screen, shown on print) ── */}
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
