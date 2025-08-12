import { useState } from "react";
import type { Setting, Slot } from "../../../types/pomoTimer";
import ColorPickerDialog from "../../ColorPickerDialog";
import SettingDialog from "../../SettingDialog";
import SettingButton from "./SettingButton";

type Dialog = "COLOR_PICKER" | "SETTING" | null;

export type SettingProps = {
  setting: Setting;
};

export default function Setting({ setting }: SettingProps) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const [currentSlot, setCurrentSlot] = useState<Slot | null>(null);

  const openColorPicker = (slot: Slot) => {
    setDialog("COLOR_PICKER");
    setCurrentSlot(slot);
  };

  const openSetting = () => {
    setDialog("SETTING");
  };

  const closeDialog = () => {
    setDialog(null);
    setCurrentSlot(null);
  };

  const currentColor = currentSlot !== null ? setting.theme[currentSlot] : null;

  return (
    <>
      <SettingButton onClick={openSetting} />
      <SettingDialog
        onClose={closeDialog}
        open={dialog === "SETTING"}
        openColorPicker={openColorPicker}
        setting={setting}
        currentSlot={currentSlot}
      />
      <ColorPickerDialog
        currentColor={currentColor}
        currentSlot={currentSlot}
        onClose={openSetting}
        open={dialog === "COLOR_PICKER"}
      />
    </>
  );
}
