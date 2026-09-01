export const CARDS_PER_PAGE = 9;

// A4 at 96 dpi: 793.7 × 1122.5 px
export const A4_W = 793.7;
export const A4_H = 1122.5;

export const PREVIEW_SCALE = 0.65;
export const SEARCH_DEBOUNCE_MS = 380;
export const SCRYFALL_API = "https://api.scryfall.com/cards/search";
export const MAX_QUERY_LENGTH = 200;

export const ZOOM_MIN = 0.3;
export const ZOOM_MAX = 2.0;
export const ZOOM_STEP = 0.1;
export const ZOOM_DEFAULT = 0.65;

// Canvas at 300 DPI for print-quality export
export const DPI = 300;
export const A4_W_PX = 2480;  // 210mm at 300dpi
export const A4_H_PX = 3508;  // 297mm at 300dpi
export const CARD_W_PX = 744;  // 63mm at 300dpi
export const CARD_H_PX = 1039; // 88mm at 300dpi
export const CARD_ASPECT_RATIO = 63 / 88; // ≈ 0.7159

// Print defaults
export const DEFAULT_CARD_SPACING = 2; // mm
export const DEFAULT_SAFE_MARGIN = true;
export const SAFE_MARGIN_MM = 15; // mm
