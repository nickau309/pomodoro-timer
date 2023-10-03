import type { DataState, Status } from "../../../contexts";
import type { Color } from "../../../types";

export type MainProps = {
  color: Color;
  data: DataState;
  initTimeLeftInSec: number;
  status: Status;
};
