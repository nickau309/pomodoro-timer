import { useCallback, useEffect } from "react";

export default function useBeforeUnload(enabled: boolean) {
  const handler = useCallback(
    (e: BeforeUnloadEvent) => {
      if (enabled) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    },
    [enabled]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener("beforeunload", handler);
      return () => {
        window.removeEventListener("beforeunload", handler);
      };
    }
  }, [enabled, handler]);
}
