import { Switch } from "@headlessui/react";
import type { SwitchProps } from "@headlessui/react";
import clsx from "clsx";

type ToggleProps = { label: string } & Required<
  Pick<SwitchProps<"button">, "checked" | "onChange">
>;

export default function Toggle({ checked, label, onChange }: ToggleProps) {
  return (
    <Switch.Group>
      <Switch.Label className="cursor-text font-bold text-neutral-600" passive>
        {label}
      </Switch.Label>
      <Switch
        checked={checked}
        onChange={onChange}
        className={clsx(
          "flex h-8 w-14 items-center rounded-full bg-neutral-400/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
          "ui-checked:bg-lime-500/80",
        )}
      >
        <span
          className={clsx(
            "aspect-square w-6 translate-x-1 rounded-full bg-white transition-transform",
            "ui-checked:translate-x-7",
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
