import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Color } from "../../types";

export type ColorBoxProps = {
  children?: ReactNode;
  color: Color;
  rounded: "lg" | "xl";
} & Pick<ComponentPropsWithoutRef<"button">, "aria-label" | "onClick">;

export type ColorBoxHandle = {
  focus: () => void;
};
