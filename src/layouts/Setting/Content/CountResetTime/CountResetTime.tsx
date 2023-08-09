import { TimeInput } from "../../../../components";
import { usePomoTimerDispatch } from "../../../../contexts";
import { CountResetTimeProps } from "./CountResetTime.types";

export default function CountResetTime({ value }: CountResetTimeProps) {
  const dispatch = usePomoTimerDispatch();

  return (
    <div className="flex items-center justify-between py-5">
      <TimeInput
        label="Count Reset Time"
        value={value}
        onChange={(resetTime) => {
          dispatch({
            type: "SET_RESET_TIME",
            resetTime,
          });
        }}
      />
    </div>
  );
}
