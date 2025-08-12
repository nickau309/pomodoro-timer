import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { usePomoTimerDispatch } from "../../../App";
import { WORKER_MESSAGE } from "../../../constants/workerMessage";
import type { Slot } from "../../../types/pomoTimer";

type SlotButtonProps = {
  isCurrentSlot: boolean;
  isTiming: boolean;
  slot: Slot;
};

export default function SlotButton({
  isCurrentSlot,
  isTiming,
  slot,
}: SlotButtonProps) {
  const dispatch = usePomoTimerDispatch();

  const handleClick = () => {
    if (isCurrentSlot) {
      const shouldResetTimer =
        !isTiming ||
        confirm(
          "The timer is still running, are you sure you want to reset the timer?",
        );

      if (shouldResetTimer) {
        dispatch({
          type: WORKER_MESSAGE.RESET_TIMER,
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " ") {
      handleClick();
    }
  };

  return (
    <RadioGroup.Option
      value={slot}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        "cursor-pointer select-none rounded px-3 py-0.5 transition-colors duration-100",
        "active:translate-y-0.5",
        "ui-checked:bg-black/10 ui-checked:font-bold",
      )}
    >
      {slot}
    </RadioGroup.Option>
  );
}
