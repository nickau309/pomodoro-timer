import { Cog8ToothIcon } from "@heroicons/react/20/solid";
import { useSettingDialogControl } from "../../../contexts";
import { classNames } from "../../../utils";

export default function SettingButton() {
  const { openDialog } = useSettingDialogControl();

  return (
    <button
      onClick={openDialog}
      className={classNames(
        "flex gap-1 rounded bg-white/20 px-2 py-2 opacity-90 duration-100 ease-in-out",
        "hover:opacity-100 active:translate-y-0.5 min-[512px]:px-3",
      )}
    >
      <Cog8ToothIcon className="h-5 w-5" />
      <span className="hidden select-none text-sm min-[512px]:block">
        Setting
      </span>
    </button>
  );
}
