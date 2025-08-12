import clsx from "clsx";
import { useId } from "react";
import { usePomoTimerDispatch } from "../../../App";
import { WORKER_MESSAGE } from "../../../constants/workerMessage";
import { computeResetTime } from "../../../utils/pomoTimer";

type CountResetTimeProps = {
  resetTime: Date;
};

export default function CountResetTime({ resetTime }: CountResetTimeProps) {
  const id = useId();

  const dispatch = usePomoTimerDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.validity.valid) {
      return;
    }

    const [hh, mm] = e.target.value.split(":");

    const resetTime = computeResetTime(parseInt(hh), parseInt(mm));

    dispatch({
      type: WORKER_MESSAGE.UPDATE_RESET_TIME,
      resetTime,
    });
  };

  const hour = resetTime.getHours().toString().padStart(2, "0");
  const minute = resetTime.getMinutes().toString().padStart(2, "0");

  const value = `${hour}:${minute}`;

  return (
    <div className="flex items-center justify-between py-5">
      <label htmlFor={id} className="cursor-text font-bold text-neutral-600">
        Count Reset Time
      </label>
      <input
        type="time"
        id={id}
        value={value}
        onChange={handleChange}
        className={clsx(
          "rounded bg-neutral-200/60 px-2.5 py-2 text-neutral-600",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400",
          "[&::-webkit-calendar-picker-indicator]:rounded-full",
          "focus-visible:[&::-webkit-calendar-picker-indicator]:outline-none focus-visible:[&::-webkit-calendar-picker-indicator]:ring-2 focus-visible:[&::-webkit-calendar-picker-indicator]:ring-blue-400",
        )}
      />
    </div>
  );
}
