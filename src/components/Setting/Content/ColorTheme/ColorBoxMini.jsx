import React, { forwardRef } from "react";

const ColorBoxMini = forwardRef(function ColorBoxMini(
  { color, handleClick, text },
  ref
) {
  return (
    <button
      ref={(ele) => {
        ref.current[text] = ele;
      }}
      onClick={handleClick}
      className={`aspect-square w-7 rounded-lg bg-${color} hover:opacity-80 active:opacity-60`}
    >
      <span className="sr-only">{`${text}: ${color}`}</span>
    </button>
  );
});

export default ColorBoxMini;
