import { Toggle } from "../../../../components";
import { usePomoTimerDispatch } from "../../../../contexts";
import { AutoStartBreaksProps } from "./AutoStartBreaks.types";

export default function AutoStartBreaks({ checked }: AutoStartBreaksProps) {
  const dispatch = usePomoTimerDispatch();

  return (
    <div className="flex items-center justify-between py-5">
      <Toggle
        label="Auto Start Breaks"
        checked={checked}
        onChange={(shouldAutoStartBreak) => {
          dispatch({
            type: "SET_SHOULD_AUTO_START_BREAK",
            shouldAutoStartBreak,
          });
        }}
      />
    </div>
  );
}
