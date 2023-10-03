import getMax from "./getMax";
import getMin from "./getMin";

export default function getValidNumber(
  value: number,
  min: string | number | undefined,
  max: string | number | undefined,
) {
  const _max = getMax(max);
  const _min = getMin(min);
  if (value > _max) {
    return _max;
  } else if (value < _min) {
    return _min;
  } else {
    return Math.trunc(value);
  }
}
