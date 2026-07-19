import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";

/**
 * Показывает fallback (мок-данные) сразу, чтобы страница не мигала пустым
 * состоянием, и подменяет их на реальные данные с бэкенда, как только он
 * ответит. Если бэкенд недоступен — молча остаёмся на мок-данных.
 */
export function useApiData<T>(path: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    let cancelled = false;

    fetchJson<T>(path)
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        console.warn(`Не удалось загрузить ${path}, используются мок-данные`, err);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return data;
}
