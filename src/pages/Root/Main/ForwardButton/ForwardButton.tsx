import { ForwardIcon } from "@heroicons/react/20/solid";
import { usePomoTimerDispatch } from "../../../../contexts";
import { classNames } from "../../../../utils";
import type { ForwardButtonProps } from "./ForwardButton.types";

export default function ForwardButton({ isTiming }: ForwardButtonProps) {
  const dispatch = usePomoTimerDispatch();

  const handleClick = () => {
    dispatch({ type: "FINISH_SLOT" });
  };

  return (
    <button
      disabled={!isTiming}
      onClick={handleClick}
      aria-label="Finish a slot"
      className={classNames(
        "absolute right-[calc(18px+(100%-18rem)/224*90)] top-4",
        !isTiming && "opacity-0",
        "transition-opacity duration-200",
        "min-[512px]:right-[calc(10px+(100%-18rem)/224*90)]",
        "sm:right-[5.5rem]",
      )}
    >
      <ForwardIcon className="aspect-square w-7 sm:w-8" />
    </button>
  );
}
