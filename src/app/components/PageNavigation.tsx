import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageNavigationProps {
  safePage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function PageNavigation({
  safePage,
  totalPages,
  onPrev,
  onNext,
}: PageNavigationProps) {
  return (
    <div className="flex items-center gap-5 flex-shrink-0">
      <button
        onClick={onPrev}
        disabled={safePage === 0}
        className="p-1 text-on-surface-variant hover:text-on-surface disabled:opacity-20 transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="text-[10px] font-mono text-on-surface-variant tracking-[0.18em]">
        PAGE {safePage + 1} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={safePage >= totalPages - 1}
        className="p-1 text-on-surface-variant hover:text-on-surface disabled:opacity-20 transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
