import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { classNames } from "../../../../utils";

const ColorBoxMini = forwardRef(function ColorBoxMini(
  { color, handleClick, text },
  ref
) {
  const buttonRef = useRef();

  useImperativeHandle(ref, () => ({
    focus() {
      buttonRef.current.focus();
    },
  }));

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={classNames(
        "aspect-square w-7 rounded-lg",
        `bg-${color}`,
        "hover:opacity-80 active:opacity-60"
      )}
    >
      <span className="sr-only">
        {text}: {color}
      </span>
    </button>
  );
});

export default ColorBoxMini;
