import clsx from "clsx";
import { useId } from "react";
import { usePomoTimerDispatch } from "../../../App";
import { WORKER_MESSAGE } from "../../../constants/workerMessage";

type AlarmVolumeProps = {
  volume: number;
};

export default function AlarmVolume({ volume }: AlarmVolumeProps) {
  const id = useId();

  const dispatch = usePomoTimerDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.validity.valid) {
      return;
    }

    const volume = e.target.valueAsNumber;

    dispatch({
      type: WORKER_MESSAGE.UPDATE_ALARM_VOLUME,
      volume,
    });
  };

  return (
    <div className="flex items-center justify-end gap-4">
      <label htmlFor={id} className="sr-only">
        volume
      </label>
      <span className="cursor-text font-bold text-neutral-400/80">
        {volume}
      </span>
      <input
        type="range"
        id={id}
        value={volume}
        onChange={handleChange}
        className={clsx(
          "h-6 w-36 appearance-none rounded-full",
          "focus:outline-none focus:ring-2 focus:ring-blue-400",
          "track:h-2 track:rounded track:bg-neutral-400/50",
          "thumb:h-6 thumb:w-6 thumb:cursor-pointer thumb:rounded-full thumb:bg-white thumb:shadow-[0_0_6px_rgba(0,0,0,.15),0_0_4px_rgba(0,0,0,.12)]",
          "[&::-moz-range-thumb]:border-none",
          "[&::-webkit-slider-thumb]:-translate-y-2 [&::-webkit-slider-thumb]:appearance-none",
        )}
      />
    </div>
  );
}
