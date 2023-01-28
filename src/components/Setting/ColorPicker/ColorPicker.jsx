import React from "react";
import { Dialog } from "@headlessui/react";
import ColorBox from "./ColorBox";

export default function ColorPicker({
  closeColorPicker,
  color,
  isColorPickerOpen,
  setColor,
  slot,
}) {
  const pickColor = (value) => {
    setColor(value);
    closeColorPicker();
  };

  return (
    <Dialog.Panel
      className={
        isColorPickerOpen ? "w-full max-w-md rounded-lg bg-white" : "hidden"
      }
    >
      <Dialog.Title className="border-b border-stone-400/20 p-4 text-center font-bold text-neutral-600">
        {`Pick a color for ${slot}`}
      </Dialog.Title>
      <div className="grid grid-cols-5 gap-3 p-4">
        {[...new Array(8)].map((_, i) => (
          <ColorBox
            key={`pomo${i + 1}`}
            color={`pomo${i + 1}`}
            handleClick={() => {
              pickColor(`pomo${i + 1}`);
            }}
            isCurrentColor={color === `pomo${i + 1}`}
          />
        ))}
      </div>
    </Dialog.Panel>
  );
}
