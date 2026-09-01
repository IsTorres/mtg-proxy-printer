import { useState, useCallback, useRef, useEffect } from "react";
import type { ScryfallCard } from "../types";
import { searchCards } from "../lib/scryfall";
import { SEARCH_DEBOUNCE_MS, MAX_QUERY_LENGTH } from "../constants";

export function useScryfallSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ScryfallCard[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setNoResults(false);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setSearching(true);
    setNoResults(false);

    try {
      const { cards, notFound } = await searchCards(q, controller.signal);
      setResults(cards);
      setNoResults(notFound || cards.length === 0);
    } catch {
      if (!controller.signal.aborted) {
        setResults([]);
      }
    } finally {
      if (!controller.signal.aborted) {
        setSearching(false);
      }
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), SEARCH_DEBOUNCE_MS);
    return () => {
      clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, [query, doSearch]);

  const setQueryLimited = useCallback((value: string) => {
    setQuery(value.slice(0, MAX_QUERY_LENGTH));
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setNoResults(false);
  }, []);

  return {
    query,
    setQuery: setQueryLimited,
    results,
    noResults,
    searching,
    clearSearch,
  };
}
