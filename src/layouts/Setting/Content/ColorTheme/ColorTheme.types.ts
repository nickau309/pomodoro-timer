import { Slot, Theme } from "../../../../types";

export type ColorThemeProps = {
  theme: Theme;
  openColorPicker: (slot: Slot) => void;
};
