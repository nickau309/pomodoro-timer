import { RadioGroup } from "@headlessui/react";
import { usePomoTimerDispatch } from "../../../App";
import { SLOT } from "../../../constants/pomoTimer";
import { WORKER_MESSAGE } from "../../../constants/workerMessage";
import type { Slot } from "../../../types/pomoTimer";
import SlotButton from "./SlotButton";

type SlotSelectionProps = {
  currentSlot: Slot;
  isTiming: boolean;
};

export default function SlotSelection({
  currentSlot,
  isTiming,
}: SlotSelectionProps) {
  const dispatch = usePomoTimerDispatch();

  const handleChange = (slot: Slot) => {
    const shouldSwitchSlot =
      !isTiming ||
      confirm(
        "The timer is still running, are you sure you want to switch the slot?",
      );

    if (shouldSwitchSlot) {
      dispatch({
        type: WORKER_MESSAGE.SWITCH_SLOT,
        slot,
      });
    }
  };

  return (
    <RadioGroup
      value={currentSlot}
      onChange={handleChange}
      className="flex justify-center px-10"
    >
      <RadioGroup.Label className="sr-only">Select Slot</RadioGroup.Label>
      <div className="flex flex-wrap justify-center">
        {Object.values(SLOT).map((slot) => (
          <SlotButton
            key={slot}
            isCurrentSlot={slot === currentSlot}
            isTiming={isTiming}
            slot={slot}
          />
        ))}
      </div>
    </RadioGroup>
  );
}
