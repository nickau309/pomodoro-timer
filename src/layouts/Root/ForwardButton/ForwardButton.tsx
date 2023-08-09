import { ForwardIcon } from "@heroicons/react/20/solid";
import { usePomoTimerDispatch } from "../../../contexts";
import { classNames } from "../../../utils";
import { ForwardButtonProps } from "./ForwardButton.types";

export default function ForwardButton({ isTiming }: ForwardButtonProps) {
  const dispatch = usePomoTimerDispatch();

  return (
    <button
      disabled={!isTiming}
      onClick={() => {
        dispatch({ type: "FINISH_SLOT" });
      }}
      className={classNames(
        "absolute top-1/2 right-16 translate-x-1/2 -translate-y-3",
        !isTiming && "opacity-0",
        "transition duration-200"
      )}
    >
      <ForwardIcon className="h-8 w-8" />
    </button>
  );
}
