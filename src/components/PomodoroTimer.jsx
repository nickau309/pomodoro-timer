import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { useSetting } from "../contexts/SettingContext";
import useTimer from "../hooks/useTimer";

import CountResetButton from "./CountResetButton";
import ForwardButton from "./ForwardButton";
import MainButton from "./MainButton";
import ProgressBar from "./ProgressBar";
import Setting from "./Setting";
import SlotSelection from "./SlotSelection";

export default function PomodoroTimer() {
  const setting = useSetting();
  const {
    timer,
    isTiming,
    switchSlot,
    selectSlotToSwitch,
    resetCount,
    startTiming,
    stopTiming,
    disableAutoStart,
  } = useTimer(setting);

  const initTimeLeftInSec = Math.ceil(timer.initTimeLeft / 1000);
  const timeLeftInSec = Math.ceil(timer.timeLeft / 1000);

  const minute = Math.floor(timeLeftInSec / 60)
    .toString()
    .padStart(2, "0");
  const second = (timeLeftInSec % 60).toString().padStart(2, "0");
  const timeLeftStr = minute + ":" + second;
  const cheerStr =
    timer.slot === "Pomodoro" ? "Time to focus!" : "Time for a break!";
  document.title = timeLeftStr + " - " + cheerStr;

  return (
    <div
      className={`min-h-screen w-full bg-${
        setting.color[timer.slot]
      } text-white transition-colors duration-500`}
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
                disableAutoStart={disableAutoStart}
                isTiming={isTiming}
                slot={timer.slot}
                slotList={Object.keys(setting.duration)}
                switchSlot={switchSlot}
              />
              <p className="my-6 text-8xl font-bold sm:text-9xl">
                {timeLeftStr}
              </p>
              <div className="relative">
                <MainButton
                  color={setting.color}
                  isTiming={isTiming}
                  startTiming={startTiming}
                  stopTiming={stopTiming}
                  slot={timer.slot}
                />
                <ForwardButton
                  handleClick={selectSlotToSwitch}
                  isTiming={isTiming}
                />
              </div>
            </div>
            <CountResetButton
              count={timer.count}
              resetCount={resetCount}
              slot={timer.slot}
            />
            <div className="text-lg">{cheerStr}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
