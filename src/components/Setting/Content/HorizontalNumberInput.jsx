import React, { useId } from "react";

export default function HorizontalNumberInput({ label, value, setValue }) {
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
    <>
      <label htmlFor={id} className="cursor-text font-bold text-neutral-600">
        {label}
      </label>
      <input
        type="number"
        min="1"
        step="1"
        value={value}
        id={id}
        onChange={handleChange}
        className="w-20 rounded bg-neutral-200/60 px-2.5 py-2 text-neutral-600"
      />
    </>
  );
}
