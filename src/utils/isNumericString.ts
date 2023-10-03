export default function isNumericString(x: string) {
  return !Number.isNaN(Number(x)) && x.trim() !== "";
}
