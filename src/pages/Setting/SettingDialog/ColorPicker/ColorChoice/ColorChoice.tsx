import { useEffect, useRef } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ColorBox, type ColorBoxHandle } from "../../../../../components";
import {
  usePomoTimerDispatch,
  useSettingDialog,
  useSettingDialogControl,
} from "../../../../../contexts";
import type { ColorChoiceProps } from "./ColorChoice.types";

export default function ColorChoice({ color, theme }: ColorChoiceProps) {
  const ref = useRef<ColorBoxHandle>(null);

  const dispatch = usePomoTimerDispatch();
  const { slot } = useSettingDialog();
  const { closeColorPicker } = useSettingDialogControl();

  const isCurrentColor = slot !== null && theme[slot] === color;

  useEffect(() => {
    if (isCurrentColor) {
      ref.current?.focus();
    }
  }, [isCurrentColor]);

  const handleClick = () => {
    if (slot !== null) {
      dispatch({
        type: "SET_THEME",
        key: slot,
        value: color,
      });
      closeColorPicker();
    }
  };

  return (
    <ColorBox ref={ref} color={color} onClick={handleClick} rounded="xl">
      {isCurrentColor && (
        <span>
          <CheckIcon className="h-6 w-6 stroke-white stroke-[2.5]" />
        </span>
      )}
    </ColorBox>
  );
}
