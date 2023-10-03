import { Toggle } from "../../../../../components";
import { usePomoTimerDispatch } from "../../../../../contexts";
import type { AutoStartPomodorosProps } from "./AutoStartPomodoros.types";

export default function AutoStartPomodoros({
  checked,
}: AutoStartPomodorosProps) {
  const dispatch = usePomoTimerDispatch();

  const handleChange = (shouldAutoStartPomodoro: boolean) => {
    dispatch({
      type: "SET_SHOULD_AUTO_START_POMODORO",
      shouldAutoStartPomodoro,
    });
  };

  return (
    <div className="flex items-center justify-between py-5">
      <Toggle
        label="Auto Start Pomodoros"
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
}
