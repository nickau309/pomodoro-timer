import React from "react";
import { Switch } from "@headlessui/react";

export default function Toggle({ label, checked, setChecked }) {
  return (
    <Switch.Group>
      <Switch.Label className="cursor-text font-bold text-neutral-600" passive>
        {label}
      </Switch.Label>
      <Switch
        checked={checked}
        onChange={setChecked}
        className={`relative inline-flex h-8 w-14 items-center rounded-full ${
          checked ? "bg-lime-500/80" : "bg-neutral-400/60"
        }`}
      >
        <span
          className={`inline-block aspect-square w-6 ${
            checked ? "translate-x-7" : "translate-x-1"
          } transform rounded-full bg-white transition`}
        />
      </Switch>
    </Switch.Group>
  );
}
