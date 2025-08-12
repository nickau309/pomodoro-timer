import { SLOT } from "../../../../constants/pomoTimer";
import type { Duration } from "../../../../types/pomoTimer";
import SlotDuration from "./SlotDuration";

type CounterDurationProps = {
  duration: Duration;
};

export default function CounterDuration({ duration }: CounterDurationProps) {
  return (
    <div className="flex flex-col gap-2.5 py-5">
      <div className="font-bold text-neutral-600">Time (minutes)</div>
      <div className="grid grid-cols-[repeat(3,minmax(0,7rem))] justify-between gap-2">
        {Object.values(SLOT).map((slot) => (
          <SlotDuration key={slot} slot={slot} time={duration[slot]} />
        ))}
      </div>
    </div>
  );
}
