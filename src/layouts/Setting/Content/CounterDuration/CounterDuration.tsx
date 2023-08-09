import { VerticalNumberInput } from "../../../../components";
import { usePomoTimerDispatch } from "../../../../contexts";
import { CounterDurationProps } from "./CounterDuration.types";
import { Slot } from "../../../../types";

export default function CounterDuration({ duration }: CounterDurationProps) {
  const dispatch = usePomoTimerDispatch();

  return (
    <div className="flex flex-col gap-2.5 py-5">
      <div className="font-bold text-neutral-600">Time (minutes)</div>
      <div className="flex items-center justify-between gap-1">
        {Object.entries(duration).map((entry) => (
          <VerticalNumberInput
            key={entry[0]}
            label={entry[0]}
            value={entry[1]}
            onBlur={(value) => {
              dispatch({
                type: "SET_DURATION",
                slot: entry[0] as Slot,
                duration: value,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
