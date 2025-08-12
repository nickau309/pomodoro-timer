import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import type { ColorBoxRef } from "../../components/ColorBox";
import type { Setting, Slot } from "../../types/pomoTimer";
import SettingDialogPanel from "./SettingDialogPanel";

type SettingDialogProps = {
  currentSlot: Slot | null;
  onClose: () => void;
  open: boolean;
  openColorPicker: (slot: Slot) => void;
  setting: Setting;
};

export default function SettingDialog({
  currentSlot,
  onClose,
  open,
  openColorPicker,
  setting,
}: SettingDialogProps) {
  const colorBoxRef = useRef<ColorBoxRef>(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      initialFocus={colorBoxRef}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto p-4 pt-24">
        <div className="flex min-h-full items-center justify-center">
          <SettingDialogPanel
            colorBoxRef={colorBoxRef}
            currentSlot={currentSlot}
            onClose={onClose}
            openColorPicker={openColorPicker}
            setting={setting}
          />
        </div>
      </div>
    </Dialog>
  );
}
