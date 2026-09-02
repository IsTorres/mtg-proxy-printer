import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side: "left" | "right";
  title?: string;
  children: ReactNode;
}

export function MobileDrawer({
  isOpen,
  onClose,
  side,
  title,
  children,
}: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <div className="sm:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 bottom-0 z-50 w-[85vw] max-w-[360px] bg-sidebar flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          side === "left"
            ? `left-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`
            : `right-0 ${isOpen ? "translate-x-0" : "translate-x-full"}`
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/30 flex-shrink-0">
          {title && (
            <h2 className="font-display text-lg font-semibold text-on-surface">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-2 -mr-2 text-on-surface-variant hover:text-on-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
