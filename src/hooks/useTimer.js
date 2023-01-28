import { useCallback, useEffect, useReducer, useState } from "react";
import useAlarmSound from "./useAlarmSound";
import useInterval from "./useInterval";

function reducer(state, action) {
  switch (action.type) {
    case "switchSlot": {
      return {
        ...state,
        slot: action.slot,
        initTimeLeft: action.duration[action.slot] * 60 * 1000,
        timeLeft: action.duration[action.slot] * 60 * 1000,
        timestamp: null,
      };
    }
    case "adjustTimeLeft": {
      // TimeLeft: Calc the diff between action.duration and initTimeLeft,
      // and add the diff to the original timeLeft
      // to preserve the time that is already timed.
      // InitTimeLeft: Just sync to new action.duration
      // for the next adjustTimeLeft case
      return {
        ...state,
        initTimeLeft: action.duration[state.slot] * 60 * 1000,
        timeLeft:
          state.timeLeft +
          action.duration[state.slot] * 60 * 1000 -
          state.initTimeLeft,
      };
    }
    case "countdown": {
      const currentTime = Date.now();
      return {
        ...state,
        timeLeft: state.timeLeft - (currentTime - state.timestamp),
        timestamp: currentTime,
      };
    }
    case "increaseCount": {
      return {
        ...state,
        count: state.count + 1,
      };
    }
    case "resetCount": {
      return {
        ...state,
        count: 0,
      };
    }
    case "startTiming": {
      return {
        ...state,
        timestamp: Date.now(),
      };
    }
    case "stopTiming": {
      return {
        ...state,
        timestamp: null,
      };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}

export default function useTimer(setting) {
  const [timer, setTimer] = useReducer(
    reducer,
    setting.duration,
    (duration) => {
      const savedTimer = JSON.parse(localStorage.getItem("timer"));

      if (savedTimer === null || new Date(savedTimer.resetDate) <= new Date()) {
        const slot = "Pomodoro";
        return {
          slot,
          initTimeLeft: duration[slot] * 60 * 1000,
          timeLeft: duration[slot] * 60 * 1000,
          count: 0,
        };
      } else {
        // eslint-disable-next-line no-unused-vars
        const { resetDate, ...rest } = savedTimer;
        return rest;
      }
    }
  );
  const [isTiming, setIsTiming] = useState(false);
  const [isAutoEnabled, setIsAutoEnabled] = useState(false);

  // switch favicon
  useEffect(() => {
    document.querySelector("link[rel~='icon']").href = `favicons/favicon-${
      setting.color[timer.slot]
    }.ico`;
  }, [setting.color, timer.slot]);

  // When setting.duration changes, adjust (init)timeLeft.
  // When slot changes, (init)timeLeft is already set (in the function below)
  // at the same time, this useEffect wont re-render the timer
  useEffect(() => {
    if (timer.initTimeLeft !== setting.duration[timer.slot] * 60 * 1000) {
      setTimer({
        type: "adjustTimeLeft",
        duration: setting.duration,
      });
    }
  }, [setting.duration, timer.slot, timer.initTimeLeft]);

  // This function sets slot and (init)timeLeft at the same time,
  // which prevents the useEffect above to re-render the timer
  const switchSlot = useCallback(
    (slot) => {
      setTimer({
        type: "switchSlot",
        slot,
        duration: setting.duration,
      });
      setIsTiming(false);
      if (
        (slot === "Pomodoro" && !setting.isAutoPomodoro) ||
        (slot === "Short Break" && !setting.isAutoBreak) ||
        (slot === "Long Break" && !setting.isAutoBreak)
      ) {
        setIsAutoEnabled(false);
      }
    },
    [setting.duration, setting.isAutoPomodoro, setting.isAutoBreak]
  );

  // When slot is switched,
  // check if any auto start is available
  useEffect(() => {
    if (isAutoEnabled) {
      if (
        (timer.slot === "Pomodoro" && setting.isAutoPomodoro) ||
        (timer.slot === "Short Break" && setting.isAutoBreak) ||
        (timer.slot === "Long Break" && setting.isAutoBreak)
      ) {
        setTimeout(() => {
          setTimer({ type: "startTiming" });
          setIsTiming(true);
        }, 500);
      }
    }
  }, [setting.isAutoPomodoro, setting.isAutoBreak, timer.slot, isAutoEnabled]);

  const selectSlotToSwitch = useCallback(() => {
    if (timer.slot === "Pomodoro") {
      switchSlot(
        (timer.count + 1) % setting.longBreakInterval
          ? "Short Break"
          : "Long Break"
      );
      setTimer({ type: "increaseCount" });
    } else {
      switchSlot("Pomodoro");
    }
  }, [setting.longBreakInterval, timer.slot, timer.count, switchSlot]);

  const resetCount = useCallback(() => {
    setTimer({ type: "resetCount" });
  }, []);

  const countdown = useCallback(() => {
    setTimer({ type: "countdown" });
  }, []);

  useInterval(countdown, isTiming ? 100 : null);

  const { alarmPlay } = useAlarmSound(setting.alarm);

  useEffect(() => {
    if (timer.timeLeft <= 0) {
      selectSlotToSwitch();
      alarmPlay();
    }
  }, [timer.timeLeft, selectSlotToSwitch, alarmPlay]);

  useEffect(() => {
    const resetDate = new Date();
    const [hh, mm] = setting.resetTime.split(":");
    resetDate.setHours(hh);
    resetDate.setMinutes(mm);
    resetDate.setSeconds(0);

    if (resetDate <= new Date()) {
      resetDate.setDate(resetDate.getDate() + 1);
    }

    const obj = { ...timer, resetDate };
    localStorage.setItem("timer", JSON.stringify(obj));
  }, [setting.resetTime, timer]);

  useEffect(() => {
    if (isTiming) {
      const handleUnload = (e) => {
        e.preventDefault();
        e.returnValue = "";
        return "";
      };

      window.addEventListener("beforeunload", handleUnload);
      return () => {
        window.removeEventListener("beforeunload", handleUnload);
      };
    }
  }, [isTiming]);

  const startTiming = useCallback(() => {
    setTimer({ type: "startTiming" });
    setIsTiming(true);
    setIsAutoEnabled(true);
  }, []);

  const stopTiming = useCallback(() => {
    // setTimer({ type: "stopTiming" });
    setIsTiming(false);
    setIsAutoEnabled(false);
  }, []);

  const disableAutoStart = useCallback(() => {
    setIsAutoEnabled(false);
  }, []);

  return {
    timer,
    isTiming,
    switchSlot,
    selectSlotToSwitch,
    resetCount,
    startTiming,
    stopTiming,
    disableAutoStart,
  };
}
