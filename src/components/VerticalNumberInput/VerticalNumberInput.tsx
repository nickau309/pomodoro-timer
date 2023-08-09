import { useEffect, useId, useState } from "react";
import { VerticalNumberInputProps } from "./VerticalNumberInput.types";

export default function VerticalNumberInput({
  label,
  value,
  onBlur,
}: VerticalNumberInputProps) {
  const id = useId();
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.validity.valid &&
      e.target.value !== "" &&
      e.target.value !== "-"
    ) {
      setLocalValue(parseInt(e.target.value));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(parseInt(e.target.value));
  };

  return (
    <div className="flex basis-28 flex-col gap-1">
      <label
        htmlFor={id}
        className="cursor-text text-sm font-bold text-neutral-400/80"
      >
        {label}
      </label>
      <input
        type="number"
        id={id}
        min="1"
        step="1"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full rounded bg-neutral-200/60 px-2.5 py-2 text-neutral-600"
      />
    </div>
  );
}
