import { Toggle } from "../../../../components";
import { usePomoTimerDispatch } from "../../../../contexts";
import { AutoStartPomodorosProps } from "./AutoStartPomodoros.types";

export default function AutoStartPomodoros({
  checked,
}: AutoStartPomodorosProps) {
  const dispatch = usePomoTimerDispatch();

  return (
    <div className="flex items-center justify-between py-5">
      <Toggle
        label="Auto Start Pomodoros"
        checked={checked}
        onChange={(shouldAutoStartPomodoro) => {
          dispatch({
            type: "SET_SHOULD_AUTO_START_POMODORO",
            shouldAutoStartPomodoro,
          });
        }}
      />
    </div>
  );
}
