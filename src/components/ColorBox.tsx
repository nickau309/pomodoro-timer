import clsx from "clsx";
import { forwardRef } from "react";
import type { Color } from "../types/pomoTimer";

export type ColorBoxRef = HTMLButtonElement;

type ColorBoxProps = {
  color: Color;
  rounded: "lg" | "xl";
} & Omit<React.ComponentPropsWithoutRef<"button">, "color">;

const ColorBox = forwardRef<ColorBoxRef, ColorBoxProps>(function ColorBox(
  { children, color, rounded, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
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
