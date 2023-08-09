import { Slot } from "../../../types";

export type ContentProps = {
  closeDialog: () => void;
  isColorPickerOpen: boolean;
  openColorPicker: (slot: Slot) => void;
};
