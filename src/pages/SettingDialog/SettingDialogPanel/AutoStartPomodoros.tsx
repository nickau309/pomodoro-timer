import { usePomoTimerDispatch } from "../../../App";
import Toggle from "../../../components/Toggle";
import { WORKER_MESSAGE } from "../../../constants/workerMessage";

type AutoStartPomodorosProps = {
  autoStartPomodoro: boolean;
};

export default function AutoStartPomodoros({
  autoStartPomodoro,
}: AutoStartPomodorosProps) {
  const dispatch = usePomoTimerDispatch();

  const handleChange = (autoStartPomodoro: boolean) => {
    dispatch({
      type: WORKER_MESSAGE.UPDATE_AUTO_START_POMODORO,
      autoStartPomodoro,
    });
  };

  return (
    <div className="flex items-center justify-between py-5">
      <Toggle
        label="Auto Start Pomodoros"
        checked={autoStartPomodoro}
        onChange={handleChange}
      />
    </div>
  );
}
