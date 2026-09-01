---
name: mtg-proxy-printer
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#bbc7dd'
  on-secondary: '#253142'
  secondary-container: '#3c475a'
  on-secondary-container: '#aab6cb'
  tertiary: '#cdced7'
  on-tertiary: '#2d3037'
  tertiary-container: '#b1b3bb'
  on-tertiary-container: '#42454c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#d7e3fa'
  secondary-fixed-dim: '#bbc7dd'
  on-secondary-fixed: '#101c2c'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#e1e2ea'
  tertiary-fixed-dim: '#c4c6ce'
  on-tertiary-fixed: '#191c22'
  on-tertiary-fixed-variant: '#44474d'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  card-title:
    fontFamily: Source Serif 4
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  display-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1440px
  sidebar-width: 320px
---

## Brand & Style

This design system is tailored for a technical yet mystical utility: proxy printing for Magic: The Gathering. The brand personality is **precise, sophisticated, and utilitarian**. It avoids the clutter often found in fantasy-themed tools, opting instead for a **Minimalist-Modern** aesthetic that emphasizes functional clarity and high-end editorial quality.

The target audience consists of players who value efficiency and visual fidelity. The UI should evoke a sense of professional-grade craftsmanship—as if the user is operating a high-end digital forge. We achieve this through a "Dark Mode First" approach, using deep charcoal surfaces, thin technical lines, and amber highlights that mimic the glow of a furnace or an enchanted artifact.

## Colors

The palette is rooted in a "Deep Space" hierarchy to ensure the vibrant art of the cards remains the focal point.

*   **Primary (Amber/Gold):** Used exclusively for primary actions, success states, and critical branding elements. It provides a warm, high-contrast glow against the dark backgrounds.
*   **Neutral (Charcoal/Slate):** 
    *   `#0F1115` serves as the base canvas.
    *   `#1A1D23` is used for elevated containers like sidebars and search inputs.
    *   `#8E9AAF` (Slate Gray) is used for secondary text and borders to maintain low-visual-noise.
*   **Functional Colors:** Semantic colors (error, warning) should be desaturated to fit the dark aesthetic, using deep reds and muted oranges.

## Typography

The typography strategy balances modern technicality with a nod to the game's heritage.

*   **UI Elements (Geist):** A high-performance sans-serif used for all functional interface elements, navigation, and settings. It ensures legibility in dense data views.
*   **Headlines & Card Context (Source Serif 4):** A sophisticated serif used for page titles and card names within the list. This creates a high-contrast pairing that feels "premium."
*   **Technical Metadata (JetBrains Mono):** Used for print dimensions, card counts, and system status. The monospaced nature reinforces the "tool" aspect of the application.

## Layout & Spacing

The system utilizes a **Fixed Sidebar + Fluid Content** model. 

1.  **Sidebar:** Occupies a fixed 320px on the left, housing the search engine and the active "deck list." This area uses a tighter spacing rhythm (`8px` to `16px`) to maximize vertical density.
2.  **Main Canvas:** A fluid area centered on the A4 Print Preview. The preview container should have a generous `48px` or `80px` margin to isolate the "paper" from the UI.
3.  **Grid System:** For card selection results, use a responsive CSS grid with a `16px` gutter. Card thumbnails should maintain a standard 2.5" x 3.5" aspect ratio.
4.  **A4 Preview:** This is a fixed-ratio container that mimics physical media. It should use a white background to clearly differentiate the "printable area" from the digital interface.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Micro-Borders** rather than heavy shadows.

*   **Level 0 (Background):** `#0F1115` - The base surface.
*   **Level 1 (Panels):** `#1A1D23` - Sidebar and top-bar. No shadows, but a `1px` border of `#8E9AAF` at 10% opacity.
*   **Level 2 (Active Inputs/Modals):** Subtle inner glows using the primary color (`#D4AF37`) at very low opacity (5-10%) to indicate focus.
*   **Print Preview:** The A4 sheet uses a crisp white surface with a soft, wide-spread shadow (`box-shadow: 0 20px 40px rgba(0,0,0,0.4)`) to make it appear as if it is floating above the dark workbench.

## Shapes

The design system uses a **Soft (0.25rem)** roundedness to maintain a professional, architectural feel. 

*   **Standard Components:** Buttons, search inputs, and chips use `4px` (rounded-sm).
*   **Cards:** Real MTG cards have specific corner radii; the UI should mimic this only for the "card" objects within the grid, typically using a `12px` (rounded-lg) radius to feel authentic.
*   **A4 Sheet:** Remains sharp (`0px`) or has a very minimal `2px` radius to reflect a stack of paper.

## Components

*   **Buttons:**
    *   *Primary:* Solid `#D4AF37` with black text (`#0F1115`). High-impact for "Print" or "Download."
    *   *Secondary:* Outlined with Slate Gray. For "Add to Deck" or "Clear Search."
*   **Search Input:** A "Sleek" design—no background fill, just a bottom border or a very subtle dark-gray container. Use a JetBrains Mono placeholder for a technical feel.
*   **Card Selection Grid:** Each item shows a high-res thumbnail with a hover state that reveals an "Add" button and a quantity counter.
*   **The 'A4 Sheet' Preview:** A 210mm x 297mm (scaled) container. It should feature thin, dotted "Cut Lines" in a light gray to guide the user.
*   **Status Chips:** Small, monospaced labels (e.g., "9/9 CARDS") using the primary amber color for the text and a transparent background with a thin border.
*   **Deck List:** A vertical list in the sidebar using `Source Serif 4` for titles and `JetBrains Mono` for quantity and set codes. Use subtle horizontal dividers.