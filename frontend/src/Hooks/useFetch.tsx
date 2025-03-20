import { useState, useEffect } from "react";

interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: BodyInit | null;
  }

function useFetch(url: string, options: FetchOptions = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return; // Prevent fetching if URL is empty

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: options.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          body: options.body ? JSON.stringify(options.body) : null,
          ...options,
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();
        setData(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
        console.error(err.message, options);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [options, url]);

  return { data, error, loading };
}

export default useFetch;
