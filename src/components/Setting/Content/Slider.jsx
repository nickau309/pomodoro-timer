import React from "react";

export default function Slider({ value, setValue }) {
  const handleChange = (e) => {
    if (e.target.validity.valid) {
      setValue(parseInt(e.target.value));
    }
  };

  return (
    <>
      <span className="font-bold text-neutral-400/80">{value}</span>
      <input
        type="range"
        value={value}
        onChange={handleChange}
        onInput={handleChange}
        className="h-2 w-36 appearance-none rounded bg-neutral-400/50 slider-thumb:h-6 slider-thumb:w-6 slider-thumb:cursor-pointer slider-thumb:appearance-none slider-thumb:rounded-full slider-thumb:bg-white slider-thumb:shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_4px_rgba(0,0,0,0.12)]"
      />
    </>
  );
}
