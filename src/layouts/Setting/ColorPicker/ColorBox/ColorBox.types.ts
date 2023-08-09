import { Color } from "../../../../types";

export type ColorBoxProps = {
  color: Color;
  handleClick: () => void;
  isCurrentColor: boolean;
};
