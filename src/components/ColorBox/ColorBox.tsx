import { forwardRef, useImperativeHandle, useRef } from "react";
import { classNames } from "../../utils";
import type { ColorBoxProps, ColorBoxHandle } from "./ColorBox.types";

const ColorBox = forwardRef<ColorBoxHandle, ColorBoxProps>(function ColorBox(
  { children, color, rounded, ...props },
  ref,
) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        buttonRef.current?.focus();
      },
    }),
    [],
  );

  return (
    <button
      ref={buttonRef}
      type="button"
      className={classNames(
        "grid aspect-square place-items-center",
        rounded === "lg" && "rounded-lg",
        rounded === "xl" && "rounded-xl",
        `bg-${color}`,
        "hover:opacity-80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
        "active:opacity-60",
      )}
      {...props}
    >
      <span className="sr-only">{color}</span>
      {children}
    </button>
  );
});

export default ColorBox;
