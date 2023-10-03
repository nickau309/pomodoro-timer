import { PositiveNumberInput } from "../../../../../../components";
import { usePomoTimerDispatch } from "../../../../../../contexts";
import type { SlotDurationProps } from "./SlotDuration.types";

export default function SlotDuration({ slot, value }: SlotDurationProps) {
  const dispatch = usePomoTimerDispatch();

  const handleBlur = (value: number) => {
    dispatch({
      type: "SET_DURATION",
      key: slot,
      value,
    });
  };

  return (
    <div className="grid grid-rows-[auto_max-content] items-center gap-1">
      <PositiveNumberInput
        label={slot}
        max="120"
        defaultValue={value}
        onBlur={handleBlur}
        vertical
      />
    </div>
  );
}
