import { useState, useCallback, useRef, useEffect } from "react";
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
}

export function PrintPreview({
  previewCards,
  showCutLines,
  safePage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PrintPreviewProps) {
  const [zoom, setZoom] = useState(ZOOM_DEFAULT);
  const mainRef = useRef<HTMLElement>(null);

  const zoomIn = useCallback(() => {
    setZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(ZOOM_DEFAULT);
  }, []);

  // Ctrl+scroll wheel zoom
  useEffect(() => {
    const el = mainRef.current;
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
      ref={mainRef}
      className="flex-1 flex flex-col items-center justify-center bg-background overflow-auto p-8"
      style={{
        backgroundImage: "radial-gradient(rgba(200,169,110,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Navigation + Zoom controls */}
      <div className="mb-5 flex items-center gap-5 flex-shrink-0">
        <PageNavigation
          safePage={safePage}
          totalPages={totalPages}
          onPrev={onPrevPage}
          onNext={onNextPage}
        />

        <div className="flex items-center gap-1 ml-2 pl-3 border-l border-border">
          <button
            onClick={zoomOut}
            disabled={zoom <= ZOOM_MIN}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={resetZoom}
            className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors w-10 text-center"
            title="Reset zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={zoomIn}
            disabled={zoom >= ZOOM_MAX}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>

      {/* Paper shadow + sheet */}
      <div
        className="flex-shrink-0"
        style={{
          width: `${A4_W * zoom}px`,
          height: `${A4_H * zoom}px`,
          overflow: "hidden",
          boxShadow: "0 12px 60px rgba(0,0,0,0.7), 0 2px 12px rgba(0,0,0,0.5)",
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
          <PrintSheet cards={previewCards} showCutLines={showCutLines} />
        </div>
      </div>

      <div className="mt-4 text-[9px] font-mono text-muted-foreground/50 tracking-[0.18em] flex-shrink-0">
        A4 · 210 × 297 MM · 9 CARDS PER PAGE · 63 × 88 MM
      </div>
    </main>
  );
}
