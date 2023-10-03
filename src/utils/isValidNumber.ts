import getMax from "./getMax";
import getMin from "./getMin";

export default function isValidNumber(
  value: number,
  min: string | number | undefined,
  max: string | number | undefined,
) {
  return (
    Number.isSafeInteger(value) && value >= getMin(min) && value <= getMax(max)
  );
}
