import { usePomoTimerDispatch } from "../../../contexts";
import { useButtonSound } from "../../../hooks";
import { classNames } from "../../../utils";
import { MainButtonProps } from "./MainButton.types";

export default function MainButton({ color, isTiming }: MainButtonProps) {
  const { play } = useButtonSound();
  const dispatch = usePomoTimerDispatch();

  const handleClick = () => {
    play();
    dispatch({ type: isTiming ? "STOP_TIMER" : "START_TIMER" });
  };

  return (
    <button
      className={classNames(
        "h-14 w-48 select-none rounded bg-white text-xl font-bold uppercase",
        `text-${color}`,
        "transition-colors duration-500",
        isTiming ? "translate-y-1.5" : "shadow-[0px_6px_rgb(235,235,235)]"
      )}
      onClick={handleClick}
    >
      {isTiming ? "Stop" : "Start"}
    </button>
  );
}
