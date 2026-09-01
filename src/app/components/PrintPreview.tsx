import type { ScryfallCard } from "../types";
import { A4_W, A4_H, PREVIEW_SCALE } from "../constants";
import { PrintSheet } from "./PrintSheet";
import { PageNavigation } from "./PageNavigation";

interface PrintPreviewProps {
  previewCards: ScryfallCard[];
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
  return (
    <main
      className="flex-1 flex flex-col items-center justify-center bg-background overflow-auto p-8"
      style={{
        backgroundImage: "radial-gradient(rgba(200,169,110,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <PageNavigation
        safePage={safePage}
        totalPages={totalPages}
        onPrev={onPrevPage}
        onNext={onNextPage}
      />

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
  );
}
