import React, { useId } from "react";

export default function VerticalNumberInput({ label, value, setValue }) {
  const id = useId();

  const handleChange = (e) => {
    if (
      e.target.validity.valid &&
      e.target.value !== "" &&
      e.target.value !== "-"
    ) {
      setValue(parseInt(e.target.value));
    }
  };

  return (
    <div className="flex w-28 flex-col gap-1">
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
        value={value}
        onChange={handleChange}
        className="w-full rounded bg-neutral-200/60 px-2.5 py-2 text-neutral-600"
      />
    </div>
  );
}
