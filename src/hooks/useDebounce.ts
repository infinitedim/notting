<<<<<<< HEAD
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
=======
import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
>>>>>>> 2dcd0f28e12fc93f948ae538bd86309586515130
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
<<<<<<< HEAD
=======

export default useDebounce;
>>>>>>> 2dcd0f28e12fc93f948ae538bd86309586515130
