import React from "react";

export default function SlotButton({ selected, selectSlot, text }) {
  const handleClick = () => {
    selectSlot(text);
  };

  return (
    <button
      onClick={handleClick}
      className={`select-none rounded py-0.5 px-3 transition-colors duration-100 active:translate-y-0.5${
        selected ? " bg-black/10 font-bold" : ""
      }`}
    >
      {text}
    </button>
  );
}
