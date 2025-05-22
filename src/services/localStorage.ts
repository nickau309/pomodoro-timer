export function getItem(key: string) {
  return window.localStorage.getItem(key);
}

export function setItem(key: string, newValue: string) {
  window.localStorage.setItem(key, newValue);
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}
