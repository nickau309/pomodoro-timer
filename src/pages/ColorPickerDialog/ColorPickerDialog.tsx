import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import type { ColorBoxRef } from "../../components/ColorBox";
import type { Color, Slot } from "../../types/pomoTimer";
import ColorPickerDialogPanel from "./ColorPickerDialogPanel";

type ColorPickerDialogProps = {
  currentColor: Color | null;
  onClose: () => void;
  open: boolean;
  currentSlot: Slot | null;
};

export default function ColorPickerDialog({
  currentColor,
  currentSlot,
  onClose,
  open,
}: ColorPickerDialogProps) {
  const colorBoxRef = useRef<ColorBoxRef>(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      initialFocus={colorBoxRef}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <ColorPickerDialogPanel
            colorBoxRef={colorBoxRef}
            currentColor={currentColor}
            currentSlot={currentSlot}
            onClose={onClose}
          />
        </div>
      </div>
    </Dialog>
  );
}
