import { usePomoTimerDispatch } from "../../../App";
import Toggle from "../../../components/Toggle";
import { WORKER_MESSAGE } from "../../../constants/workerMessage";

type AutoStartBreaksProps = {
  autoStartBreak: boolean;
};

export default function AutoStartBreaks({
  autoStartBreak,
}: AutoStartBreaksProps) {
  const dispatch = usePomoTimerDispatch();

  const handleChange = (autoStartBreak: boolean) => {
    dispatch({
      type: WORKER_MESSAGE.UPDATE_AUTO_START_BREAK,
      autoStartBreak,
    });
  };

  return (
    <div className="flex items-center justify-between py-5">
      <Toggle
        label="Auto Start Breaks"
        checked={autoStartBreak}
        onChange={handleChange}
      />
    </div>
  );
}
