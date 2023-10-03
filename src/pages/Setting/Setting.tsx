import { SettingDialogProvider } from "../../contexts";
import SettingButton from "./SettingButton";
import SettingDialog from "./SettingDialog";
import type { SettingProps } from "./Setting.types";

export default function Setting({ setting }: SettingProps) {
  return (
    <SettingDialogProvider>
      <SettingButton />
      <SettingDialog setting={setting} />
    </SettingDialogProvider>
  );
}
