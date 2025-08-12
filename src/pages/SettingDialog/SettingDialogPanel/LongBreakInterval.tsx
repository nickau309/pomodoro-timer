import { useEffect, useId, useState } from "react";
import { usePomoTimerDispatch } from "../../../App";
import NumberInput from "../../../components/NumberInput";
import {
  MAX_LONG_BREAK_INTERVAL,
  MIN_LONG_BREAK_INTERVAL,
} from "../../../constants/pomoTimer";
import { WORKER_MESSAGE } from "../../../constants/workerMessage";
import { LONG_BREAK_INTERVAL_SCHEMA } from "../../../schema/pomoTimer";

type LongBreakIntervalProps = {
  longBreakInterval: number;
};

export default function LongBreakInterval({
  longBreakInterval,
}: LongBreakIntervalProps) {
  const id = useId();

  const [value, setValue] = useState(longBreakInterval);

  useEffect(() => {
    setValue(longBreakInterval);
  }, [longBreakInterval]);

  const dispatch = usePomoTimerDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  };

  const handleBlur = () => {
    if (isValid) {
      dispatch({
        type: WORKER_MESSAGE.UPDATE_LONG_BREAK_INTERVAL,
        longBreakInterval: value,
      });
    } else {
      setValue(longBreakInterval);
    }
  };

  const isValid = LONG_BREAK_INTERVAL_SCHEMA.safeParse(value).success;

  return (
    <div className="grid grid-cols-[max-content_5rem] items-center justify-between py-5">
      <label htmlFor={id} className="cursor-text font-bold text-neutral-600">
        Long Break Interval
      </label>
      <NumberInput
        aria-invalid={!isValid}
        id={id}
        min={MIN_LONG_BREAK_INTERVAL}
        max={MAX_LONG_BREAK_INTERVAL}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        value={value}
      />
    </div>
  );
}
