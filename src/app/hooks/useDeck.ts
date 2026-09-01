import { useState, useMemo, useCallback, useEffect } from "react";
import type { CardImage, CardEntry } from "../types";
import { CARDS_PER_PAGE } from "../constants";

const STORAGE_KEY = "mtg-proxy-deck";

function loadEntries(): CardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveEntries(entries: CardEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // quota exceeded — custom card data URLs too large; silently skip
  }
}

export function useDeck() {
  const [entries, setEntries] = useState<CardEntry[]>(loadEntries);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const addCard = useCallback((card: CardImage) => {
    setEntries(prev => {
      const existing = prev.find(e => e.card.id === card.id);
      if (existing)
        return prev.map(e => (e.card.id === card.id ? { ...e, qty: e.qty + 1 } : e));
      return [...prev, { card, qty: 1 }];
    });
  }, []);

  const addCustomCard = useCallback((name: string, url: string) => {
    const card: CardImage = { id: crypto.randomUUID(), name, url };
    setEntries(prev => [...prev, { card, qty: 1 }]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.card.id !== id));
  }, []);

  const adjustQty = useCallback((id: string, delta: number) => {
    setEntries(prev =>
      prev.map(e => (e.card.id === id ? { ...e, qty: Math.max(1, e.qty + delta) } : e))
    );
  }, []);

  const clearAll = useCallback(() => {
    setEntries([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const flatCards = useMemo(
    () => entries.flatMap(({ card, qty }) => Array<CardImage>(qty).fill(card)),
    [entries]
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(flatCards.length / CARDS_PER_PAGE)),
    [flatCards]
  );

  return {
    entries,
    flatCards,
    totalPages,
    addCard,
    addCustomCard,
    removeEntry,
    adjustQty,
    clearAll,
  };
}
