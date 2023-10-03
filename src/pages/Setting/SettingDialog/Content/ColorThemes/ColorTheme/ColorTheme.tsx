import { useEffect, useRef } from "react";
import { ColorBox, type ColorBoxHandle } from "../../../../../../components";
import {
  useSettingDialog,
  useSettingDialogControl,
} from "../../../../../../contexts";
import type { ColorThemeProps } from "./ColorTheme.types";

export default function ColorTheme({ color, slot }: ColorThemeProps) {
  const ref = useRef<ColorBoxHandle>(null);

  const { isColorPickerOpen, slot: slotToFocus } = useSettingDialog();
  const { openColorPicker } = useSettingDialogControl();

  useEffect(() => {
    if (!isColorPickerOpen && slot === slotToFocus) {
      ref.current?.focus();
    }
  }, [isColorPickerOpen, slot, slotToFocus]);

  const handleClick = () => {
    openColorPicker(slot);
  };

  return (
    <ColorBox
      ref={ref}
      aria-label={slot}
      color={color}
      onClick={handleClick}
      rounded="lg"
    />
  );
}
