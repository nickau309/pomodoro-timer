import { usePomoTimerDispatch } from "../../../../contexts";
import type { CountResetButtonProps } from "./CountResetButton.types";

export default function CountResetButton({
  count,
  currentSlot,
}: CountResetButtonProps) {
  const dispatch = usePomoTimerDispatch();

  const handleClick = () => {
    if (confirm("Do you want to refresh the pomodoro count?")) {
      dispatch({ type: "RESET_COUNT" });
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
