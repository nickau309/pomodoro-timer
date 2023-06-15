import React from "react";
import { Dialog } from "@headlessui/react";
import { useSetting, useSettingDispatch } from "../../../contexts";
import ColorBox from "./ColorBox";

export default function ColorPicker({
  closeColorPicker,
  isColorPickerOpen,
  slot,
}) {
  const setting = useSetting();
  const dispatch = useSettingDispatch();

  const color = setting.color[slot];

  const pickColor = (value) => {
    dispatch({
      type: "color",
      color: {
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
        {[...new Array(8)].map((_, i) => (
          <ColorBox
            key={i}
            color={`pomo${i + 1}`}
            handleClick={() => pickColor(`pomo${i + 1}`)}
            isCurrentColor={color === `pomo${i + 1}`}
          />
        ))}
      </div>
    </Dialog.Panel>
  );
}
