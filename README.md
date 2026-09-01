# MTG Proxy Printer

A client-side React application for creating printable Magic: The Gathering proxy card sheets. Search for cards via the Scryfall API, build a deck list, and print A4 pages with a 3×3 grid of cards (63×88mm each).

## Features

- **Card search** — debounced search against the Scryfall API with instant results dropdown
- **Deck management** — add cards, adjust quantities, remove entries, clear all
- **A4 print preview** — scaled preview of the final 9-card-per-page layout with page navigation
- **Cut lines toggle** — optional thin borders around each card slot for easy cutting
- **Print-optimized output** — `window.print()` with `@media print` rules that hide UI and show the full card grid

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Print tips

In the browser print dialog:
- Set paper size to **A4**
- Set margins to **None**
- Disable headers and footers
- Enable **Background graphics**

## Project structure

```
src/
├── main.tsx                          React entry point
├── app/
│   ├── App.tsx                       App shell
│   ├── page/Home.tsx                 Main page (search + deck + preview)
│   ├── components/                   UI components
│   ├── hooks/                        Custom React hooks
│   ├── types/                        TypeScript interfaces
│   ├── lib/                          API helpers
│   └── constants/                    App constants
└── styles/                           CSS (Tailwind, theme, fonts)
```

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Lucide React icons
- Scryfall API (card data and images)
