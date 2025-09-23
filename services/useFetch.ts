import { useCallback, useEffect, useRef, useState } from "react";

export const useFetch = <T>(
  fetchfunction: (signal?: AbortSignal) => Promise<T>,
  autoFetch: boolean = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const res = await fetchfunction(controller.signal);
      setData(res);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // وقتی کاربر cancel کرده، خطا نگه نمی‌داریم
        console.log("Fetch aborted");
      } else {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      }
    } finally {
      setLoading(false);
    }
  }, [fetchfunction]);

  const reset = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [autoFetch, fetchData]);

  return {
    data,
    error,
    loading,
    reset,
    fetchData,
  };
};
