import { RadioGroup } from "@headlessui/react";
import { SLOT } from "../../../../constants";
import { usePomoTimerDispatch } from "../../../../contexts";
import SlotButton from "./SlotButton";
import type { Slot } from "../../../../types";
import type { SlotSelectionProps } from "./SlotSelection.types";

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
      dispatch({ type: "SWITCH_SLOT", slot });
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
        {SLOT.map((slot) => (
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
