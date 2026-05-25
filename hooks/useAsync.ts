import { useState, useCallback } from 'react';

export const useAsync = <T, Args extends any[]>(
  asyncFunction: (...args: Args) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: Args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await asyncFunction(...args);
      setData(response);
      return response;
    } catch (e: any) {
      const message = typeof e === 'string' ? e : (e.message || 'Ocurrió un error inesperado');
      setError(message);
      // No relanzamos el error para evitar crashes globales
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { data, loading, error, execute };
};
