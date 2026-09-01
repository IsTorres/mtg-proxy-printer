import { useState, useMemo, useCallback } from "react";

export function usePagination(totalPages: number) {
  const [previewPage, setPreviewPage] = useState(0);

  const safePage = useMemo(
    () => Math.min(previewPage, totalPages - 1),
    [previewPage, totalPages]
  );

  const prev = useCallback(() => {
    setPreviewPage(p => Math.max(0, p - 1));
  }, []);

  const next = useCallback(() => {
    setPreviewPage(p => p + 1);
  }, []);

  const reset = useCallback(() => {
    setPreviewPage(0);
  }, []);

  return {
    previewPage,
    safePage,
    prev,
    next,
    reset,
  };
}
