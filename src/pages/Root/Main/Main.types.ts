import type { Color } from "../../../types";
import type { Data } from "../../../types/data";

export type MainProps = {
  color: Color;
  data: Data;
  initTimeLeftInSec: number;
  isTiming: boolean;
  timeLeft: number;
};
