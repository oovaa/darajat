import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading local storage:", error);
      return initialValue;
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to local storage:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage