import { useEffect, useId, useRef, useState } from "react";
import {
  classNames,
  getMax,
  getMin,
  getValidNumber,
  isValidNumber,
} from "../../utils";
import type { PositiveNumberInputProps } from "./PositiveNumberInput.types";

export default function PositiveNumberInput({
  defaultValue = 1,
  label,
  min,
  max,
  onBlur,
  vertical = false,
}: PositiveNumberInputProps) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(() => {
    return isValidNumber(defaultValue, min, max);
  });

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.valueAsNumber = defaultValue;
    }
  }, [defaultValue]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { max, min } = e.target;
    if (Number.isNaN(e.target.valueAsNumber)) {
      e.target.valueAsNumber = defaultValue;
    } else {
      e.target.valueAsNumber = getValidNumber(e.target.valueAsNumber, min, max);
    }
    setIsValid(isValidNumber(e.target.valueAsNumber, min, max));
    onBlur?.(e.target.valueAsNumber);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { max, min, valueAsNumber } = e.target as HTMLInputElement;
    setIsValid(isValidNumber(valueAsNumber, min, max));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.altKey && !e.ctrlKey && /^(?=\D)[ -~]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className={classNames(
          "cursor-text",
          vertical && "text-sm",
          "font-bold",
          vertical ? "text-neutral-400/80" : "text-neutral-600",
        )}
      >
        {label}
      </label>
      <input
        ref={ref}
        type="number"
        id={id}
        defaultValue={defaultValue}
        min={getMin(min)}
        max={getMax(max)}
        onBlur={handleBlur}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        required
        aria-invalid={!isValid}
        className={classNames(
          "w-full rounded bg-neutral-200/60 px-2.5 py-2 text-neutral-600",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-blue-400 focus-visible:[&[aria-invalid='true']]:ring-red-400",
        )}
      />
    </>
  );
}
