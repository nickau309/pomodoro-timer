import React from "react";
import { classNames } from "../../../utils";

export default function SlotButton({ selected, selectSlot, text }) {
  const handleClick = () => {
    selectSlot(text);
  };

  return (
    <button
      onClick={handleClick}
      className={classNames(
        "select-none rounded py-0.5 px-3 transition-colors duration-100",
        selected && "bg-black/10 font-bold",
        "active:translate-y-0.5"
      )}
    >
      {text}
    </button>
  );
}
