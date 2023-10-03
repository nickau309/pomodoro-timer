import { TimeInput } from "../../../../../components";
import { usePomoTimerDispatch } from "../../../../../contexts";
import type { CountResetTimeProps } from "./CountResetTime.types";

export default function CountResetTime({ value }: CountResetTimeProps) {
  const dispatch = usePomoTimerDispatch();

  const handleChange = (resetTime: string) => {
    dispatch({
      type: "SET_RESET_TIME",
      resetTime,
    });
  };

  return (
    <div className="flex items-center justify-between py-5">
      <TimeInput
        label="Count Reset Time"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
