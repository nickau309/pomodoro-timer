import { Dialog } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { usePomoTimerDispatch } from "../../App";
import ColorBox from "../../components/ColorBox";
import type { ColorBoxRef } from "../../components/ColorBox";
import { COLOR } from "../../constants/pomoTimer";
import { WORKER_MESSAGE } from "../../constants/workerMessage";
import type { Color, Slot } from "../../types/pomoTimer";

type ColorPickerDialogProps = {
  colorBoxRef: React.RefObject<ColorBoxRef>;
  currentColor: Color | null;
  currentSlot: Slot | null;
  onClose: () => void;
};

export default function ColorPickerDialogPanel({
  colorBoxRef,
  currentColor,
  currentSlot,
  onClose,
}: ColorPickerDialogProps) {
  const dispatch = usePomoTimerDispatch();

  const pickColor = (color: Color) => {
    if (currentSlot !== null) {
      dispatch({
        type: WORKER_MESSAGE.UPDATE_THEME,
        key: currentSlot,
        value: color,
      });
    }
    onClose();
  };

  return (
    <Dialog.Panel className="w-full max-w-md rounded-lg bg-white">
      <Dialog.Title className="border-b border-stone-400/20 p-4 text-center font-bold text-neutral-600">
        Pick a color for {currentSlot}
      </Dialog.Title>
      <div className="grid grid-cols-5 gap-3 p-4">
        {Object.values(COLOR).map((color) => (
          <ColorBox
            key={color}
            ref={color === currentColor ? colorBoxRef : null}
            color={color}
            onClick={pickColor.bind(null, color)}
            rounded="xl"
          >
            {color === currentColor && (
              <span>
                <CheckIcon className="h-6 w-6 stroke-white stroke-[2.5]" />
              </span>
            )}
          </ColorBox>
        ))}
      </div>
    </Dialog.Panel>
  );
}
