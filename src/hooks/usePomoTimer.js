import { useCallback, useEffect, useState } from "react";
import { useTimer } from "../hooks";

export default function usePomoTimer(setting) {
  const [slot, setSlot] = useState(() => {
    const savedSlot = localStorage.getItem("slot");
    const resetTime = localStorage.getItem("resetTime");

    if (savedSlot && resetTime && new Date(resetTime) > new Date()) {
      return savedSlot;
    }
    return "Pomodoro";
  });
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    const resetTime = localStorage.getItem("resetTime");

    if (savedCount && resetTime && new Date(resetTime) > new Date()) {
      return parseInt(savedCount);
    }
    return 0;
  });
  const [isAutoEnabled, setIsAutoEnabled] = useState(false);

  const { timer, isTiming, startTimer, stopTimer, adjustTimer, resetTimer } =
    useTimer({ alarm: setting.alarm, duration: setting.duration[slot] });

  // Switch favicon
  useEffect(() => {
    document.querySelector(
      "link[rel~='icon']"
    ).href = `favicons/favicon-${setting.color[slot]}.ico`;
  }, [setting.color, slot]);

  // Adjust timer when setting.duration changes
  useEffect(() => {
    adjustTimer(setting.duration[slot]);
  }, [setting.duration, slot, adjustTimer]);

  // This function sets slot and (init)timeLeft at the same time,
  // which prevents the useEffect above to re-render the timer
  const switchSlot = useCallback(
    (slot) => {
      setSlot(slot);
      resetTimer(setting.duration[slot]);

      if (
        (slot === "Pomodoro" && !setting.isAutoPomodoro) ||
        (slot === "Short Break" && !setting.isAutoBreak) ||
        (slot === "Long Break" && !setting.isAutoBreak)
      ) {
        setIsAutoEnabled(false);
      }
    },
    [setting.duration, setting.isAutoPomodoro, setting.isAutoBreak, resetTimer]
  );

  // When slot is switched,
  // check if any auto start is available
  useEffect(() => {
    if (isAutoEnabled) {
      if (
        (slot === "Pomodoro" && setting.isAutoPomodoro) ||
        (slot === "Short Break" && setting.isAutoBreak) ||
        (slot === "Long Break" && setting.isAutoBreak)
      ) {
        setTimeout(startTimer, 500);
      }
    }
  }, [
    setting.isAutoPomodoro,
    setting.isAutoBreak,
    slot,
    isAutoEnabled,
    startTimer,
  ]);

  const selectSlotToSwitch = useCallback(() => {
    if (slot === "Pomodoro") {
      switchSlot(
        (count + 1) % setting.longBreakInterval ? "Short Break" : "Long Break"
      );
      setCount((c) => c + 1);
    } else {
      switchSlot("Pomodoro");
    }
  }, [setting.longBreakInterval, slot, count, switchSlot]);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  // Switch slot when timeLeft <= 0
  useEffect(() => {
    if (timer.timeLeft <= 0) {
      selectSlotToSwitch();
    }
  }, [timer.timeLeft, selectSlotToSwitch]);

  // Store slot to localstorage
  useEffect(() => {
    localStorage.setItem("slot", slot);
  }, [slot]);

  // Store count to localstorage
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  // Store setting.resetTime to localstorage
  useEffect(() => {
    const resetDate = new Date();
    const [hh, mm] = setting.resetTime.split(":");
    resetDate.setHours(hh);
    resetDate.setMinutes(mm);
    resetDate.setSeconds(0);

    if (resetDate <= new Date()) {
      resetDate.setDate(resetDate.getDate() + 1);
    }

    localStorage.setItem("resetTime", resetDate.toISOString());
  }, [setting.resetTime]);

  const startTiming = useCallback(() => {
    startTimer();
    setIsAutoEnabled(true);
  }, [startTimer]);

  const stopTiming = useCallback(() => {
    stopTimer();
    setIsAutoEnabled(false);
  }, [stopTimer]);

  const disableAutoStart = useCallback(() => {
    setIsAutoEnabled(false);
  }, []);

  return {
    timer: { slot, count, ...timer },
    isTiming,
    switchSlot,
    selectSlotToSwitch,
    resetCount,
    startTiming,
    stopTiming,
    disableAutoStart,
  };
}
