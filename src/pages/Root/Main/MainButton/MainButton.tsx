import { useAudioControl, usePomoTimerDispatch } from "../../../../contexts";
import { classNames } from "../../../../utils";
import type { MainButtonProps } from "./MainButton.types";

export default function MainButton({ color, isTiming }: MainButtonProps) {
  const play = useAudioControl();

  const dispatch = usePomoTimerDispatch();

  const handleClick = () => {
    play({ name: "button" });
    dispatch({ type: isTiming ? "STOP_TIMER" : "START_TIMER" });
  };

  return (
    <button
      className={classNames(
        "h-12 w-40 select-none rounded-md bg-white text-xl font-bold uppercase",
        `text-${color}`,
        isTiming && "translate-y-1.5",
        "transition-colors duration-500",
        !isTiming && "shadow-[0px_6px_rgb(235,235,235)]",
        "min-[512px]:h-[3.25rem] min-[512px]:w-44",
        "sm:h-14 sm:w-48 sm:text-2xl",
      )}
      onClick={handleClick}
    >
      {isTiming ? "Stop" : "Start"}
    </button>
  );
}
