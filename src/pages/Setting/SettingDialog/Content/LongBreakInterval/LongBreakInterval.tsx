import { PositiveNumberInput } from "../../../../../components";
import { usePomoTimerDispatch } from "../../../../../contexts";
import type { LongBreakIntervalProps } from "./LongBreakInterval.types";

export default function LongBreakInterval({ value }: LongBreakIntervalProps) {
  const dispatch = usePomoTimerDispatch();

  const handleBlur = (longBreakInterval: number) => {
    dispatch({
      type: "SET_LONG_BREAK_INTERVAL",
      longBreakInterval,
    });
  };

  return (
    <div className="grid grid-cols-[max-content_5rem] items-center justify-between py-5">
      <PositiveNumberInput
        label="Long Break Interval"
        max="16"
        defaultValue={value}
        onBlur={handleBlur}
      />
    </div>
  );
}
