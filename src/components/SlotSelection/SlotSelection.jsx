import React from "react";
import SlotButton from "./SlotButton";

export default function SlotSelection({
  isTiming,
  disableAutoStart,
  slot,
  slotList,
  switchSlot,
}) {
  const selectSlot = (value) => {
    const isSwitchable =
      !isTiming ||
      confirm("The timer is still running, are you sure you want to switch?");

    if (isSwitchable) {
      switchSlot(value);
      disableAutoStart();
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
