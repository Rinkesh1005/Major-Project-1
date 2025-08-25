// src/useFetch.js
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null); // Changed initial state to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result); // Set the data directly, whether it's an array or an object
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
          setData(null); // Set data to null on error
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;