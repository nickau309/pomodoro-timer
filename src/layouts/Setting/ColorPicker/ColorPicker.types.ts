import { Slot } from "../../../types";

export type ColorPickerProps = {
  closeColorPicker: () => void;
  isColorPickerOpen: boolean;
  slot: Slot;
};
