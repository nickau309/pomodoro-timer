import { Slot } from "../../../../types";

export type SlotButtonProps = {
  selected: boolean;
  selectSlot: (slot: Slot) => void;
  text: Slot;
};
