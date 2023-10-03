import { useTitle } from "../../../hooks";
import CountResetButton from "./CountResetButton";
import ForwardButton from "./ForwardButton";
import MainButton from "./MainButton";
import ProgressBar from "./ProgressBar";
import SlotSelection from "./SlotSelection";
import type { MainProps } from "./Main.types";

export default function Main({
  color,
  data,
  initTimeLeftInSec,
  status,
}: MainProps) {
  const isTiming = status === "Timing";

  const timeLeftInSec = Math.ceil(data.timeLeft / 1000);
  const minute = Math.floor(timeLeftInSec / 60)
    .toString()
    .padStart(2, "0");
  const second = (timeLeftInSec % 60).toString().padStart(2, "0");
  const timeLeftStr = minute + ":" + second;
  const cheerStr =
    data.slot === "Pomodoro" ? "Time to focus!" : "Time for a break!";

  useTitle(timeLeftStr + " - " + cheerStr);

  return (
    <main className="flex flex-col items-center gap-12">
      <ProgressBar initTimeLeft={initTimeLeftInSec} timeLeft={timeLeftInSec} />
      <div className="flex w-full max-w-lg flex-col items-center gap-6 text-center">
        <div className="flex w-full flex-col gap-6 rounded-lg bg-white/10 py-10">
          <SlotSelection currentSlot={data.slot} isTiming={isTiming} />
          <p className="text-7xl font-bold min-[512px]:text-8xl sm:text-9xl">
            {timeLeftStr}
          </p>
          <div className="relative flex justify-center">
            <MainButton color={color} isTiming={isTiming} />
            <ForwardButton isTiming={isTiming} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <CountResetButton count={data.count} currentSlot={data.slot} />
          <div className="text-lg">{cheerStr}</div>
        </div>
      </div>
    </main>
  );
}
