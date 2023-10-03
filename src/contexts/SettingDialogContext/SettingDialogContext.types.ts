import type { ReactNode } from "react";
import type { Slot } from "../../types";

export type SettingDialogProviderProps = {
  children: ReactNode;
};

export type SettingDialogState =
  | { isColorPickerOpen: false; isOpen: false; slot: null }
  | { isColorPickerOpen: false; isOpen: true; slot: null | Slot }
  | { isColorPickerOpen: true; isOpen: true; slot: Slot };

export type SettingDialogControl = {
  closeColorPicker: () => void;
  closeDialog: () => void;
  openColorPicker: (slot: Slot) => void;
  openDialog: () => void;
};
