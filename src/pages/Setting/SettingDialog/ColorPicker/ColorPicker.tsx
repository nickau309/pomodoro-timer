import { Dialog } from "@headlessui/react";
import { COLOR } from "../../../../constants";
import { useSettingDialog } from "../../../../contexts";
import ColorChoice from "./ColorChoice";
import type { ColorPickerProps } from "./ColorPicker.types";

export default function ColorPicker({ theme }: ColorPickerProps) {
  const { slot } = useSettingDialog();

  return (
    <>
      <Dialog.Title className="border-b border-stone-400/20 p-4 text-center font-bold text-neutral-600">
        Pick a color for {slot}
      </Dialog.Title>
      <div className="grid grid-cols-5 gap-3 p-4">
        {COLOR.map((color) => (
          <ColorChoice key={color} color={color} theme={theme} />
        ))}
      </div>
    </>
  );
}
