import { useState } from "react";
import { Scissors, Info, Printer, X } from "lucide-react";

interface HeaderProps {
  showCutLines: boolean;
  onToggleCutLines: () => void;
}

export function Header({ showCutLines, onToggleCutLines }: HeaderProps) {
  const [showTip, setShowTip] = useState(false);

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
