import { useCallback, useEffect, useState } from "react";
import { useAlarmSound, useInterval } from "../hooks";

export default function useTimer({ alarm, duration }) {
  const [timer, setTimer] = useState(() => {
    const savedTimer = JSON.parse(localStorage.getItem("timer"));
    const resetTime = localStorage.getItem("resetTime");

    if (savedTimer && resetTime && new Date(resetTime) > new Date()) {
      return savedTimer;
    }
    return {
      initTimeLeft: duration * 60 * 1000,
      timeLeft: duration * 60 * 1000,
      timestamp: null,
    };
  });
  const [isTiming, setIsTiming] = useState(false);

  const startTimer = useCallback(() => {
    setTimer((t) => ({ ...t, timestamp: Date.now() }));
    setIsTiming(true);
  }, []);

  const stopTimer = useCallback(() => {
    setTimer((t) => ({ ...t, timestamp: null }));
    setIsTiming(false);
  }, []);

  const adjustTimer = useCallback((duration) => {
    setTimer((t) => ({
      ...t,
      initTimeLeft: duration * 60 * 1000,
      timeLeft: t.timeLeft + duration * 60 * 1000 - t.initTimeLeft,
    }));
  }, []);

  const resetTimer = useCallback((duration) => {
    setTimer({
      initTimeLeft: duration * 60 * 1000,
      timeLeft: duration * 60 * 1000,
      timestamp: null,
    });
    setIsTiming(false);
  }, []);

  const countdown = useCallback(() => {
    setTimer((t) => {
      const currentTime = Date.now();
      return {
        ...t,
        timeLeft: t.timeLeft - (currentTime - t.timestamp),
        timestamp: currentTime,
      };
    });
  }, []);

  useInterval(countdown, isTiming ? 100 : null);

  // Store timer to localstorage
  useEffect(() => {
    localStorage.setItem("timer", JSON.stringify(timer));
  }, [timer]);

  // Add event listener on before unload if it is timing
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

  const { alarmPlay } = useAlarmSound(alarm);

  // Play alarm and stop timer when it finish timing
  useEffect(() => {
    if (isTiming && timer.timeLeft <= 0) {
      alarmPlay();
      stopTimer();
    }
  }, [timer.timeLeft, isTiming, alarmPlay, stopTimer]);

  return {
    timer,
    isTiming,
    startTimer,
    stopTimer,
    adjustTimer,
    resetTimer,
  };
}
