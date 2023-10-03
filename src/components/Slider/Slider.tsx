import { useId } from "react";
import { classNames } from "../../utils";
import type { SliderProps } from "./Slider.types";

export default function Slider({ label, onChange, value }: SliderProps) {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.validity.valid) {
      onChange(e.target.valueAsNumber);
    }
  };

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <span className="cursor-text font-bold text-neutral-400/80">{value}</span>
      <input
        type="range"
        id={id}
        value={value}
        onChange={handleChange}
        className={classNames(
          "h-6 w-36 appearance-none rounded-full",
          "focus:outline-none focus:ring-2 focus:ring-blue-400",
          "track:h-2 track:rounded track:bg-neutral-400/50",
          "thumb:h-6 thumb:w-6 thumb:cursor-pointer thumb:rounded-full thumb:bg-white thumb:shadow-[0_0_6px_rgba(0,0,0,.15),0_0_4px_rgba(0,0,0,.12)]",
          "[&::-moz-range-thumb]:border-none",
          "[&::-webkit-slider-thumb]:-translate-y-2 [&::-webkit-slider-thumb]:appearance-none",
        )}
      />
    </>
  );
}
