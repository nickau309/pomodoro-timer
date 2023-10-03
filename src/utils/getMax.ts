import isNumericString from "./isNumericString";

export default function getMax(x: string | number | undefined) {
  if (typeof x === "number" && !Number.isNaN(x)) {
    if (x < Number.MAX_SAFE_INTEGER) {
      return Math.max(Math.trunc(x), 1);
    }
  } else if (typeof x === "string" && isNumericString(x)) {
    return getMax(Number(x));
  }
  return Number.MAX_SAFE_INTEGER;
}
