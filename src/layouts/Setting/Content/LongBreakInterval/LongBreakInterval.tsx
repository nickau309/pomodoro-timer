import { HorizontalNumberInput } from "../../../../components";
import { usePomoTimerDispatch } from "../../../../contexts";
import { LongBreakIntervalProps } from "./LongBreakInterval.types";

export default function LongBreakInterval({ value }: LongBreakIntervalProps) {
  const dispatch = usePomoTimerDispatch();

  return (
    <div className="flex items-center justify-between py-5">
      <HorizontalNumberInput
        label="Long Break Interval"
        value={value}
        onChange={(longBreakInterval) => {
          dispatch({
            type: "SET_LONG_BREAK_INTERVAL",
            longBreakInterval,
          });
        }}
      />
    </div>
  );
}
