import { Dialog } from "@headlessui/react";
import { usePomoTimer, usePomoTimerDispatch } from "../../../contexts";
import { Color } from "../../../types";
import ColorBox from "./ColorBox";
import { ColorPickerProps } from "./ColorPicker.types";

export default function ColorPicker({
  closeColorPicker,
  isColorPickerOpen,
  slot,
}: ColorPickerProps) {
  const { setting } = usePomoTimer();
  const dispatch = usePomoTimerDispatch();

  const color = setting.theme[slot];

  const pickColor = (value: Color) => {
    dispatch({
      type: "SET_THEME",
      theme: {
        [slot]: value,
      },
    });
    closeColorPicker();
  };

  return (
    <Dialog.Panel
      className={
        isColorPickerOpen ? "w-full max-w-md rounded-lg bg-white" : "hidden"
      }
    >
      <Dialog.Title className="border-b border-stone-400/20 p-4 text-center font-bold text-neutral-600">
        Pick a color for {slot}
      </Dialog.Title>
      <div className="grid grid-cols-5 gap-3 p-4">
        {new Array(8).fill(null).map((_, i) => (
          <ColorBox
            key={i}
            color={`pomo${i + 1}` as Color}
            handleClick={() => {
              pickColor(`pomo${i + 1}` as Color);
            }}
            isCurrentColor={color === `pomo${i + 1}`}
          />
        ))}
      </div>
    </Dialog.Panel>
  );
}
