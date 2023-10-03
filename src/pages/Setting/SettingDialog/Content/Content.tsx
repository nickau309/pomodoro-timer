import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSettingDialogControl } from "../../../../contexts";
import { classNames } from "../../../../utils";
import Alarm from "./Alarm";
import AutoStartBreaks from "./AutoStartBreaks";
import AutoStartPomodoros from "./AutoStartPomodoros";
import ColorThemes from "./ColorThemes";
import CounterDuration from "./CounterDuration";
import CountResetTime from "./CountResetTime";
import LongBreakInterval from "./LongBreakInterval";
import ResetToDefault from "./ResetToDefault";
import type { ContentProps } from "./Content.types";

export default function Content({ setting }: ContentProps) {
  const { closeDialog } = useSettingDialogControl();

  return (
    <>
      <div className="flex flex-col divide-y divide-stone-400/20 p-5 pb-0">
        <div className="mb-3 flex justify-between">
          <Dialog.Title className="font-bold uppercase text-neutral-400/80">
            Timer Setting
          </Dialog.Title>
          <button
            type="button"
            aria-label="Close"
            onClick={closeDialog}
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <XMarkIcon className="h-6 w-6 stroke-[3] opacity-30 duration-100 ease-in-out hover:opacity-50" />
          </button>
        </div>
        <CounterDuration duration={setting.duration} />
        <AutoStartBreaks checked={setting.shouldAutoStartBreak} />
        <AutoStartPomodoros checked={setting.shouldAutoStartPomodoro} />
        <LongBreakInterval value={setting.longBreakInterval} />
        <Alarm alarm={setting.alarm} />
        <ColorThemes theme={setting.theme} />
        <CountResetTime value={setting.resetTime} />
        <ResetToDefault />
      </div>
      <div className="rounded-b-lg bg-neutral-200/60 px-5 py-3.5 text-right">
        <button
          type="button"
          onClick={closeDialog}
          className={classNames(
            "select-none rounded bg-neutral-800 px-6 py-2 text-sm text-white opacity-90 shadow-[0_2px_2px_rgb(0,0,0,0.2)] duration-100 ease-in-out",
            "hover:opacity-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
            "active:translate-y-0.5 active:shadow-none",
          )}
        >
          OK
        </button>
      </div>
    </>
  );
}
