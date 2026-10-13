
import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }

      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    } catch (error) {
      console.error("Error reading Local Storage:", error);

      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        key,
        JSON.stringify(storedValue)
      );
    } catch (error) {
      console.error("Error saving to Local Storage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
