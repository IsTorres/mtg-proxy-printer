import { useState, useRef, useEffect } from "react";
import { Scissors, Info, Printer, X, Download, FileImage, FileText, Image } from "lucide-react";
import type { CardImage } from "../types";
import { CARDS_PER_PAGE } from "../constants";
import { downloadPDF, downloadPNG, downloadJPG } from "../lib/export";

interface HeaderProps {
  showCutLines: boolean;
  onToggleCutLines: () => void;
  flatCards: CardImage[];
  totalPages: number;
  currentPage: number;
}

export function Header({ showCutLines, onToggleCutLines, flatCards, totalPages, currentPage }: HeaderProps) {
  const [showTip, setShowTip] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [exporting, setExporting] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDownload) return;
    const handleClick = (e: MouseEvent) => {
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) {
        setShowDownload(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDownload]);

  const handleExport = async (format: "pdf" | "png" | "jpg") => {
    setExporting(true);
    setShowDownload(false);
    try {
      if (format === "pdf") {
        const pages: CardImage[][] = [];
        for (let i = 0; i < totalPages; i++) {
          pages.push(flatCards.slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE));
        }
        await downloadPDF(pages, showCutLines);
      } else {
        const pageCards = flatCards.slice(
          currentPage * CARDS_PER_PAGE,
          (currentPage + 1) * CARDS_PER_PAGE
        );
        if (format === "png") {
          await downloadPNG(pageCards, showCutLines, currentPage + 1);
        } else {
          await downloadJPG(pageCards, showCutLines, currentPage + 1);
        }
      }
    } finally {
      setExporting(false);
    }
  };

  return (
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
        <label className="flex items-center gap-1.5 cursor-pointer group select-none">
          <div
            className={`w-8 h-4 rounded-none relative transition-colors ${
              showCutLines ? "bg-accent/30" : "bg-muted"
            }`}
            onClick={onToggleCutLines}
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

        {/* Download dropdown */}
        <div className="relative" ref={downloadRef}>
          <button
            onClick={() => setShowDownload(v => !v)}
            disabled={exporting || flatCards.length === 0}
            className="flex items-center gap-2 border border-border text-foreground px-3 py-2 text-[12px] font-mono font-medium tracking-wider hover:bg-muted/50 transition-colors disabled:opacity-30"
          >
            <Download size={13} />
            {exporting ? "EXPORTING…" : "DOWNLOAD"}
          </button>
          {showDownload && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-card border border-border z-50 shadow-2xl">
              <button
                onClick={() => handleExport("pdf")}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors border-b border-border/50"
              >
                <FileText size={12} />
                PDF (all pages)
              </button>
              <button
                onClick={() => handleExport("png")}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors border-b border-border/50"
              >
                <Image size={12} />
                PNG (current page)
              </button>
              <button
                onClick={() => handleExport("jpg")}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
              >
                <FileImage size={12} />
                JPG (current page)
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-accent text-[#0c0c11] px-4 py-2 text-[12px] font-mono font-medium tracking-wider hover:bg-accent/80 transition-colors"
        >
          <Printer size={13} />
          PRINT
        </button>
      </div>
    </header>
  );
}
