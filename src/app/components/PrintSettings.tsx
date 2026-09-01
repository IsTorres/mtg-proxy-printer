import { FileText, FileImage, Image, Scissors, Square, Info } from "lucide-react";

interface PrintSettingsProps {
  showCutLines: boolean;
  onToggleCutLines: () => void;
  safeMargin: boolean;
  onToggleSafeMargin: () => void;
  cardSpacing: number;
  onSpacingChange: (mm: number) => void;
  onExportPDF: () => void;
  onExportPNG: () => void;
  onExportJPG: () => void;
  exporting: boolean;
  hasCards: boolean;
}

export function PrintSettings({
  showCutLines,
  onToggleCutLines,
  safeMargin,
  onToggleSafeMargin,
  cardSpacing,
  onSpacingChange,
  onExportPDF,
  onExportPNG,
  onExportJPG,
  exporting,
  hasCards,
}: PrintSettingsProps) {
  return (
    <div className="right-6 top-16 bottom-6 w-80 bg-surface-container/90 backdrop-blur-lg shadow-2xl flex flex-col pointer-events-auto border border-outline-variant/20 z-20">
      {/* Header */}
      <div className="p-6 border-b border-outline-variant/20">
        <h2 className="font-display text-lg font-semibold text-on-surface">
          Configuração de Impressão
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Ajuste os parâmetros antes de exportar o documento final.
        </p>
      </div>

      {/* Scrollable Controls */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Toggles */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono text-primary tracking-[0.1em] uppercase">
            Guias Visuais
          </label>

          {/* Cut Lines */}
          <div className="flex items-center justify-between p-3 bg-surface-variant rounded-lg">
            <div className="flex items-center gap-3">
              <Scissors size={16} className="text-on-surface-variant" />
              <span className="text-sm text-on-surface">Linhas de Corte</span>
            </div>
            <button
              onClick={onToggleCutLines}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${
                showCutLines ? "bg-primary" : "bg-surface-container-highest"
              }`}
            >
              <div
                className={`absolute top-[2px] w-5 h-5 rounded-full transition-all duration-300 shadow-sm ${
                  showCutLines
                    ? "left-[26px] bg-on-primary"
                    : "left-[2px] bg-on-surface-variant"
                }`}
              />
            </button>
          </div>

          {/* Safe Margin */}
          <div className="flex items-center justify-between p-3 bg-surface-variant rounded-lg">
            <div className="flex items-center gap-3">
              <Square size={16} className="text-on-surface-variant" />
              <span className="text-sm text-on-surface">Forçar Margem Segura</span>
            </div>
            <button
              onClick={onToggleSafeMargin}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${
                safeMargin ? "bg-primary" : "bg-surface-container-highest"
              }`}
            >
              <div
                className={`absolute top-[2px] w-5 h-5 rounded-full transition-all duration-300 shadow-sm ${
                  safeMargin
                    ? "left-[26px] bg-on-primary"
                    : "left-[2px] bg-on-surface-variant"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Card Spacing Slider */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <label className="text-xs font-mono text-primary tracking-[0.1em] uppercase">
              Espaçamento Entre Cartas
            </label>
            <span className="text-xs font-mono text-on-surface-variant">{cardSpacing}mm</span>
          </div>
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={cardSpacing}
            onChange={e => onSpacingChange(Number(e.target.value))}
            className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Info Box */}
        <div className="bg-surface-container-lowest p-3 rounded-lg flex gap-3 items-start border border-outline-variant/10">
          <Info size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-on-surface-variant">
            As imagens serão redimensionadas para o padrão oficial (63×88mm) a 300 DPI.
          </p>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 bg-surface-container border-t border-outline-variant/20 flex flex-col gap-2">
        <button
          onClick={onExportPDF}
          disabled={exporting || !hasCards}
          className="w-full bg-primary text-on-primary text-sm font-semibold py-3 px-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-30"
        >
          <FileText size={16} />
          {exporting ? "Exportando…" : "Exportar PDF (Todas)"}
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onExportPNG}
            disabled={exporting || !hasCards}
            className="bg-surface-variant text-on-surface-variant text-xs font-mono py-2 px-3 rounded-lg hover:bg-surface-bright transition-colors flex items-center justify-center gap-1.5 border border-outline-variant/20 disabled:opacity-30"
          >
            <Image size={12} />
            PNG
          </button>
          <button
            onClick={onExportJPG}
            disabled={exporting || !hasCards}
            className="bg-surface-variant text-on-surface-variant text-xs font-mono py-2 px-3 rounded-lg hover:bg-surface-bright transition-colors flex items-center justify-center gap-1.5 border border-outline-variant/20 disabled:opacity-30"
          >
            <FileImage size={12} />
            JPG
          </button>
        </div>
      </div>
    </div>
  );
}
