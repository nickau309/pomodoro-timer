import { useEffect, useRef } from "react";

export default function useInterval(fn: () => void, delay: number | null) {
  const callback = useRef(fn);

  // Update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // Set on mount, clear on unmount
  useEffect(() => {
    if (delay !== null && delay >= 0) {
      const timeout = setInterval(() => {
        callback.current();
      }, delay);

      return () => {
        clearInterval(timeout);
      };
    }
  }, [delay]);
}
