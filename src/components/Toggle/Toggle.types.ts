import type { SwitchProps } from "@headlessui/react";

export type ToggleProps = { label: string } & Required<
  Pick<SwitchProps<"button">, "checked" | "onChange">
>;
