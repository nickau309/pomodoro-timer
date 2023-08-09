import { usePomoTimerDispatch } from "../../../contexts";
import { CountResetButtonProps } from "./CountResetButton.types";

export default function CountResetButton({
  count,
  slot,
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
      className="mb-1 opacity-60 duration-100 ease-in-out hover:opacity-80"
    >
      {slot !== "Pomodoro" && "Before "}#{count + 1}
    </button>
  );
}
