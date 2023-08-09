import { usePomoTimerDispatch } from "../../../contexts";
import SlotButton from "./SlotButton";
import { Slot } from "../../../types";
import { SlotSelectionProps } from "./SlotSelection.types";

export default function SlotSelection({
  isTiming,
  slot,
  slotList,
}: SlotSelectionProps) {
  const dispatch = usePomoTimerDispatch();

  const selectSlot = (slot: Slot) => {
    const isSwitchable =
      !isTiming ||
      confirm("The timer is still running, are you sure you want to switch?");

    if (isSwitchable) {
      dispatch({ type: "SWITCH_SLOT", slot });
    }
  };

  return (
    <div>
      {slotList.map((text) => (
        <SlotButton
          key={text}
          selected={slot === text}
          selectSlot={selectSlot}
          text={text}
        />
      ))}
    </div>
  );
}
