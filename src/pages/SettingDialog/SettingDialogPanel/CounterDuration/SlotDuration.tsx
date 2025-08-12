import { useEffect, useId, useState } from "react";
import { usePomoTimerDispatch } from "../../../../App";
import NumberInput from "../../../../components/NumberInput";
import { MAX_TIME, MIN_TIME } from "../../../../constants/pomoTimer";
import { WORKER_MESSAGE } from "../../../../constants/workerMessage";
import { TIME_SCHEMA } from "../../../../schema/pomoTimer";
import type { Slot } from "../../../../types/pomoTimer";

type SlotDurationProps = {
  slot: Slot;
  time: number;
};

export default function SlotDuration({ slot, time }: SlotDurationProps) {
  const id = useId();

  const [value, setValue] = useState(time);

  const dispatch = usePomoTimerDispatch();

  useEffect(() => {
    setValue(time);
  }, [time]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  };

  const handleBlur = () => {
    if (isValid) {
      dispatch({
        type: WORKER_MESSAGE.UPDATE_DURATION,
        key: slot,
        value,
      });
    } else {
      setValue(time);
    }
  };

  const isValid = TIME_SCHEMA.safeParse(value).success;

  return (
    <div className="grid grid-rows-[auto_max-content] items-center gap-1">
      <label
        htmlFor={id}
        className="cursor-text text-sm font-bold text-neutral-400/80"
      >
        {slot}
      </label>
      <NumberInput
        aria-invalid={!isValid}
        id={id}
        min={MIN_TIME}
        max={MAX_TIME}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        value={value}
      />
    </div>
  );
}
