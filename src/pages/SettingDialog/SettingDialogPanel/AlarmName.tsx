import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { usePomoTimerDispatch } from "../../../App";
import { ALARM_NAME } from "../../../constants/pomoTimer";
import { WORKER_MESSAGE } from "../../../constants/workerMessage";
import type { AlarmName } from "../../../types/pomoTimer";

type AlarmNameProps = {
  name: AlarmName;
};

export default function AlarmName({ name }: AlarmNameProps) {
  const dispatch = usePomoTimerDispatch();

  const handleChange = (name: AlarmName) => {
    dispatch({
      type: WORKER_MESSAGE.UPDATE_ALARM_NAME,
      name,
    });
  };

  return (
    <div className="relative flex items-center justify-between">
      <Listbox value={name} onChange={handleChange}>
        <Listbox.Label className="cursor-text font-bold text-neutral-600">
          Alarm Sound
        </Listbox.Label>
        <Listbox.Button
          className={clsx(
            "flex w-36 justify-between rounded bg-neutral-200/75 py-2 pl-3 pr-1 text-neutral-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
          )}
        >
          <span className="capitalize">{name}</span>
          <ChevronUpDownIcon className="h-6 w-6" />
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            "absolute right-0 top-10 z-10 mt-1 w-36 select-none rounded bg-white py-2 shadow-[0_3px_6px_rgba(0,0,0,.15),0_2px_4px_rgba(0,0,0,.12)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
          )}
        >
          {Object.values(ALARM_NAME).map((item) => (
            <Listbox.Option
              key={item}
              value={item}
              className={clsx(
                "cursor-pointer p-3 capitalize text-neutral-500",
                "ui-active:bg-neutral-300 ui-active:text-neutral-700",
              )}
            >
              {item}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
