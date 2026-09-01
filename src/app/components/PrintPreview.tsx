import { useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import type { CardImage } from "../types";
import { A4_W, A4_H, ZOOM_MIN, ZOOM_MAX, ZOOM_STEP, ZOOM_DEFAULT } from "../constants";
import { PrintSheet } from "./PrintSheet";
import { PageNavigation } from "./PageNavigation";

interface PrintPreviewProps {
  previewCards: CardImage[];
  showCutLines: boolean;
  safePage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  safeMargin: boolean;
  cardSpacing: number;
}

export function PrintPreview({
  previewCards,
  showCutLines,
  safePage,
  totalPages,
  onPrevPage,
  onNextPage,
  safeMargin,
  cardSpacing,
}: PrintPreviewProps) {
  const [zoom, setZoom] = useState(ZOOM_DEFAULT);
  const canvasRef = useRef<HTMLDivElement>(null);

  const zoomIn = useCallback(() => {
    setZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(ZOOM_DEFAULT);
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      setZoom(z => {
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(z + delta).toFixed(2)));
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main
      className="flex-1 flex flex-col bg-background overflow-hidden relative"
      style={{
        backgroundImage: "radial-gradient(rgba(242,202,80,0.03) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[1000px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Navigation + Zoom controls — always visible */}
      <div className="relative z-10 flex items-center gap-5 px-6 py-3 flex-shrink-0 border-b border-outline-variant/20">
        <PageNavigation
          safePage={safePage}
          totalPages={totalPages}
          onPrev={onPrevPage}
          onNext={onNextPage}
        />

        <div className="flex items-center gap-1 ml-2 pl-3 border-l border-outline-variant/30">
          <button
            onClick={zoomOut}
            disabled={zoom <= ZOOM_MIN}
            className="p-1 text-on-surface-variant hover:text-on-surface disabled:opacity-20 transition-colors"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={resetZoom}
            className="text-[10px] font-mono text-on-surface-variant hover:text-on-surface transition-colors w-10 text-center"
            title="Reset zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={zoomIn}
            disabled={zoom >= ZOOM_MAX}
            className="p-1 text-on-surface-variant hover:text-on-surface disabled:opacity-20 transition-colors"
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>

      {/* Scrollable canvas area */}
      <div
        ref={canvasRef}
        className="relative z-10 flex-1 overflow-auto flex items-start justify-center p-8"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Paper sheet with zoom */}
          <div
            style={{
              width: `${A4_W * zoom}px`,
              height: `${A4_H * zoom}px`,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                width: `${A4_W}px`,
                height: `${A4_H}px`,
              }}
            >
              <PrintSheet
                cards={previewCards}
                showCutLines={showCutLines}
                safeMargin={safeMargin}
                cardSpacing={cardSpacing}
              />
            </div>
          </div>

          {/* Info label below paper */}
          <div className="text-[9px] font-mono text-on-surface-variant/50 tracking-[0.18em]">
            A4 · 210 × 297 MM · 9 CARDS PER PAGE · 63 × 88 MM
          </div>
        </div>
      </div>
    </main>
  );
}
