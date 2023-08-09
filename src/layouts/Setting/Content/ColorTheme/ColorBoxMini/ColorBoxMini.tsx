import { forwardRef, useImperativeHandle, useRef } from "react";
import { classNames } from "../../../../../utils";
import { ColorBoxMiniHandle } from "../../../../../types";
import { ColorBoxMiniProps } from "./ColorBoxMiniProps.types";

const ColorBoxMini = forwardRef<ColorBoxMiniHandle, ColorBoxMiniProps>(
  function ColorBoxMini({ color, handleClick, slot }, ref) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      focus() {
        buttonRef.current?.focus();
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
          {slot}: {color}
        </span>
      </button>
    );
  }
);

export default ColorBoxMini;
