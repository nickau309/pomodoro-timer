import isNumericString from "./isNumericString";

export default function getMin(x: string | number | undefined) {
  if (typeof x === "number" && !Number.isNaN(x)) {
    if (x > 1) {
      return Math.min(Math.trunc(x), Number.MAX_SAFE_INTEGER);
    }
  } else if (typeof x === "string" && isNumericString(x)) {
    return getMin(Number(x));
  }
  return 1;
}
