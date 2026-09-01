import { useState, useMemo, useCallback } from "react";
import type { ScryfallCard, CardEntry } from "../types";
import { CARDS_PER_PAGE } from "../constants";

export function useDeck() {
  const [entries, setEntries] = useState<CardEntry[]>([]);

  const addCard = useCallback((card: ScryfallCard) => {
    setEntries(prev => {
      const existing = prev.find(e => e.card.id === card.id);
      if (existing)
        return prev.map(e => (e.card.id === card.id ? { ...e, qty: e.qty + 1 } : e));
      return [...prev, { card, qty: 1 }];
    });
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
  }, []);

  const flatCards = useMemo(
    () => entries.flatMap(({ card, qty }) => Array<ScryfallCard>(qty).fill(card)),
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
    removeEntry,
    adjustQty,
    clearAll,
  };
}
