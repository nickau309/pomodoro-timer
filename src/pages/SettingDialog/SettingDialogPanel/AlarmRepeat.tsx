import { useEffect, useId, useState } from "react";
import { usePomoTimerDispatch } from "../../../App";
import NumberInput from "../../../components/NumberInput";
import {
  MAX_ALARM_REPEAT,
  MIN_ALARM_REPEAT,
} from "../../../constants/pomoTimer";
import { WORKER_MESSAGE } from "../../../constants/workerMessage";
import { ALARM_REPEAT_SCHEMA } from "../../../schema/pomoTimer";

type AlarmRepeatProps = {
  repeat: number;
};

export default function AlarmRepeat({ repeat }: AlarmRepeatProps) {
  const id = useId();

  const [value, setValue] = useState(repeat);

  useEffect(() => {
    setValue(repeat);
  }, [repeat]);

  const dispatch = usePomoTimerDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  };

  const handleBlur = () => {
    if (isValid) {
      dispatch({
        type: WORKER_MESSAGE.UPDATE_ALARM_REPEAT,
        repeat: value,
      });
    } else {
      setValue(repeat);
    }
  };

  const isValid = ALARM_REPEAT_SCHEMA.safeParse(value).success;

  return (
    <div className="grid grid-cols-[max-content_5rem] items-center justify-end gap-4">
      <label htmlFor={id} className="cursor-text font-bold text-neutral-600">
        repeat
      </label>
      <NumberInput
        aria-invalid={!isValid}
        id={id}
        min={MIN_ALARM_REPEAT}
        max={MAX_ALARM_REPEAT}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        value={value}
      />
    </div>
  );
}
