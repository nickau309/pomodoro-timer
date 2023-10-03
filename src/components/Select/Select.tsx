import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { classNames } from "../../utils";
import type { SelectProps } from "./Select.types";

export default function Select<T extends string>({
  label,
  list,
  onChange,
  value,
}: SelectProps<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      <Listbox.Label className="cursor-text font-bold text-neutral-600">
        {label}
      </Listbox.Label>
      <Listbox.Button
        className={classNames(
          "flex w-36 justify-between rounded bg-neutral-200/75 py-2 pl-3 pr-1 text-neutral-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
        )}
      >
        <span className="capitalize">{value}</span>
        <ChevronUpDownIcon className="h-6 w-6" />
      </Listbox.Button>
      <Listbox.Options
        className={classNames(
          "absolute right-0 top-10 z-10 mt-1 w-36 select-none rounded bg-white py-2 shadow-[0_3px_6px_rgba(0,0,0,.15),0_2px_4px_rgba(0,0,0,.12)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
        )}
      >
        {list.map((item) => (
          <Listbox.Option
            key={item}
            value={item}
            className={classNames(
              "cursor-pointer p-3 capitalize text-neutral-500",
              "ui-active:bg-neutral-300 ui-active:text-neutral-700",
            )}
          >
            {item}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
