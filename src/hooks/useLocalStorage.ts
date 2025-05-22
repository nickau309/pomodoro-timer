import { useSyncExternalStore } from "react";
import { getItem } from "../services/localStorage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
}

export default function useLocalStorage(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => getItem(key),
    () => null,
  );
}
