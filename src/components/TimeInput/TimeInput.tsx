import { useId } from "react";
import { classNames } from "../../utils";
import type { TimeInputProps } from "./TimeInput.types";

export default function TimeInput({ label, onChange, value }: TimeInputProps) {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.validity.valid) {
      onChange(e.target.value);
    }
  };

  return (
    <>
      <label htmlFor={id} className="cursor-text font-bold text-neutral-600">
        {label}
      </label>
      <input
        type="time"
        id={id}
        value={value}
        onChange={handleChange}
        className={classNames(
          "rounded bg-neutral-200/60 px-2.5 py-2 text-neutral-600",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400",
          "[&::-webkit-calendar-picker-indicator]:rounded-full",
          "focus-visible:[&::-webkit-calendar-picker-indicator]:outline-none focus-visible:[&::-webkit-calendar-picker-indicator]:ring-2 focus-visible:[&::-webkit-calendar-picker-indicator]:ring-blue-400",
        )}
      />
    </>
  );
}
