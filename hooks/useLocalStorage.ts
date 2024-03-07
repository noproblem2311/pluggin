"use client";
import { useState } from "react";

export const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    let value;
    if (typeof window !== "undefined") {
      value = localStorage.getItem(keyName);
    }
    return value || defaultValue;
  });

  const setValue = async (newValue: any)  => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(storedValue) : newValue;
      if (typeof window !== "undefined") {
        localStorage.setItem(keyName,!!newValue === false ? valueToStore :  JSON.stringify(valueToStore));
      }
      setStoredValue(valueToStore);
    } catch (err) {
      console.log(err);
    }
  };

  return [storedValue, setValue] as const;
};
