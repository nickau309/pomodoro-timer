import { usePomoTimerDispatch } from "../../App";
import { WORKER_MESSAGE } from "../../constants/workerMessage";
import type { Slot } from "../../types/pomoTimer";

type CountResetButtonProps = {
  count: number;
  currentSlot: Slot;
};

export default function CountResetButton({
  count,
  currentSlot,
}: CountResetButtonProps) {
  const dispatch = usePomoTimerDispatch();

  const handleClick = () => {
    if (confirm("Do you want to refresh the pomodoro count?")) {
      dispatch({
        type: WORKER_MESSAGE.RESET_COUNT,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="opacity-60 duration-100 ease-in-out hover:opacity-80"
    >
      {currentSlot !== "Pomodoro" && "Before "}#{count + 1}
    </button>
  );
}
