"use client";

import { useEffect, useState } from "react";

export function useDebouce<T>(value: T, delay?: number) {
  const [deboucedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return deboucedValue;
}
