import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import useBeforeUnload from "../../hooks/useBeforeUnload";
import useFavicon from "../../hooks/useFavicon";
import useTitle from "../../hooks/useTitle";
import type { PomoTimer } from "../../types/pomoTimer";
import CountResetButton from "./CountResetButton";
import ForwardButton from "./ForwardButton";
import MainButton from "./MainButton";
import ProgressBar from "./ProgressBar";
import Setting from "./Setting";
import SlotSelection from "./SlotSelection";

type RootProps = {
  pomoTimer: PomoTimer;
};

export default function Root({ pomoTimer }: RootProps) {
  const { setting, data, state } = pomoTimer;

  // color
  const color = setting.theme[state.slot];

  useFavicon(`favicons/favicon-${color}.ico`);

  // time left
  const durationInSec = setting.duration[state.slot] * 60;
  const timePassInSec = Math.floor(state.timePass / 1000);
  const timeLeftInSec = durationInSec - timePassInSec;

  const mm = Math.floor(timeLeftInSec / 60)
    .toString()
    .padStart(2, "0");
  const ss = (timeLeftInSec % 60).toString().padStart(2, "0");
  const timeLeftStr = mm + ":" + ss;

  const cheerStr =
    state.slot === "Pomodoro" ? "Time to focus!" : "Time for a break!";

  useTitle(timeLeftStr + " - " + cheerStr);

  // isTiming
  const isTiming = state.timestamp !== null;

  useBeforeUnload(isTiming);

  return (
    <div
      data-testid="layout"
      className={clsx(
        "min-h-screen w-full",
        `bg-${color}`,
        "text-white transition-colors duration-500",
      )}
    >
      <div className="mx-auto max-w-2xl px-4">
        <header className="flex h-20 items-center justify-between">
          <h1 className="flex items-center gap-1.5">
            <CheckCircleIcon className="h-6 w-6" />
            <span className="select-none text-xl font-bold">
              Pomodoro Timer
            </span>
          </h1>
          <Setting setting={setting} />
        </header>
        <main className="flex flex-col items-center gap-12">
          <ProgressBar duration={durationInSec} timePass={timePassInSec} />
          <div className="flex w-full max-w-lg flex-col items-center gap-6 text-center">
            <div className="flex w-full flex-col gap-6 rounded-lg bg-white/10 py-10">
              <SlotSelection currentSlot={state.slot} isTiming={isTiming} />
              <p className="text-7xl font-bold min-[512px]:text-8xl sm:text-9xl">
                {timeLeftStr}
              </p>
              <div className="relative flex justify-center">
                <MainButton color={color} isTiming={isTiming} />
                <ForwardButton isTiming={isTiming} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CountResetButton count={data.count} currentSlot={state.slot} />
              <div className="text-lg">{cheerStr}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
