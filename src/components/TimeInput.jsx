import React, { useId } from "react";

export default function TimeInput({ label, value, onChange }) {
  const id = useId();

  const handleChange = (e) => {
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
        className="rounded bg-neutral-200/60 px-2.5 py-2 text-neutral-600"
      />
    </>
  );
}
