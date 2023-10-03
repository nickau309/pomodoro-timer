import { SLOT } from "../../../../../constants";
import SlotDuration from "./SlotDuration";
import type { CounterDurationProps } from "./CounterDuration.types";

export default function CounterDuration({ duration }: CounterDurationProps) {
  return (
    <div className="flex flex-col gap-2.5 py-5">
      <div className="font-bold text-neutral-600">Time (minutes)</div>
      <div className="grid grid-cols-[repeat(3,minmax(0,7rem))] justify-between gap-2">
        {SLOT.map((slot) => (
          <SlotDuration key={slot} slot={slot} value={duration[slot]} />
        ))}
      </div>
    </div>
  );
}
