import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { usePomoTimer } from "../../contexts";
import { useTitle } from "../../hooks";
import { Setting } from "../../layouts";
import { classNames } from "../../utils";

import CountResetButton from "./CountResetButton";
import ForwardButton from "./ForwardButton";
import MainButton from "./MainButton";
import ProgressBar from "./ProgressBar";
import SlotSelection from "./SlotSelection";
import { Slot } from "../../types";

export default function PomodoroTimer() {
  const { setting, data } = usePomoTimer();
  const isTiming = data.timestamp !== null;

  const initTimeLeftInSec = setting.duration[data.slot] * 60;
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
    <div
      className={classNames(
        "min-h-screen w-full",
        `bg-${setting.theme[data.slot]}`,
        "text-white transition-colors duration-500"
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
          <Setting />
        </header>
        <main>
          <ProgressBar
            initTimeLeft={initTimeLeftInSec}
            timeLeft={timeLeftInSec}
          />
          <div className="m-auto max-w-lg text-center">
            <div className="mb-6 rounded-lg bg-white/10 p-10">
              <SlotSelection
                isTiming={isTiming}
                slot={data.slot}
                slotList={Object.keys(setting.duration) as Slot[]}
              />
              <p className="my-6 text-8xl font-bold sm:text-9xl">
                {timeLeftStr}
              </p>
              <div className="relative">
                <MainButton
                  color={setting.theme[data.slot]}
                  isTiming={isTiming}
                />
                <ForwardButton isTiming={isTiming} />
              </div>
            </div>
            <CountResetButton count={data.count} slot={data.slot} />
            <div className="text-lg">{cheerStr}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
