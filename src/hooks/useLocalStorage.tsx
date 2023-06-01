import { useState } from "react";

const getStorageValue = <T,>(key: string, defaultValue: T): T => {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);

    if (saved !== null) {
      const parsed: unknown = JSON.parse(saved);

      // Check if the parsed values are of the same type as the D
      if (typeof parsed === typeof defaultValue) {
        return parsed as T;
      }
    }

    return defaultValue;
  }

  return defaultValue;
};

export const useLocalStorage = <D,>(key: string, defaultValue: D) => {
  const [isError, setIsError] = useState(false);
  const [value, saveValue] = useState<D>(() => {
    return getStorageValue(key, defaultValue);
  });

  // saving input name
  const setValue = (newValue: D) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      saveValue(newValue);
    } catch (error) {
      console.error("Error saving to local storage", error);
      setIsError(true);
    }
  };

  return { value, isError, setValue };
};
