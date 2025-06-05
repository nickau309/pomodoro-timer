/* eslint-disable react-refresh/only-export-components */
import type { Dispatch } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useAudio,
  useBeforeUnload,
  useFavicon,
  type AudioControl,
} from "../../hooks";
import useData from "../../hooks/useData";
import {
  addTimePass,
  finishSlot,
  getDefaultPomoTimer,
  getPomoTimer,
  resetCount,
  resetSetting,
  resetTimePass,
  setPomoTimer,
  shouldFinishSlot,
  switchSlot,
  updateAlarm,
  updateDuration,
  updateLongBreakInterval,
  updateShouldAutoStartBreak,
  updateShouldAutoStartPomodoro,
  updateTheme,
} from "../../utils/data";
import type { Slot } from "../../types";
import type { Pomo } from "../../types/data";
import type {
  PomoTimerAction,
  PomoTimerProviderProps,
  PomoTimerState,
} from "./PomoTimerContext.types";

const AudioControlContext = createContext<AudioControl | null>(null);
const PomoTimerContext = createContext<PomoTimerState | null>(null);
const PomoTimerDispatchContext =
  createContext<Dispatch<PomoTimerAction> | null>(null);

export function PomoTimerProvider({ children }: PomoTimerProviderProps) {
  const { setting, data } = useData();

  useFavicon(`favicons/favicon-${setting.theme[data.slot]}.ico`);

  const [isTiming, setIsTiming] = useState(false);

  useBeforeUnload(isTiming);

  const state = useMemo(
    () => ({
      setting,
      data,
      isTiming,
    }),
    [data, isTiming, setting],
  );

  const intervalRef = useRef<number | null>(null);
  const timestampRef = useRef<number | null>(null);

  // useEffect(() => {
  //   localStorage.setItem("pomodoro", JSON.stringify(pomo));
  // }, [pomo]);

  const play = useAudio();

  const dispatch = useCallback<Dispatch<PomoTimerAction>>(
    (action) => {
      const onTick = () => {
        if (timestampRef.current === null) {
          return;
        }

        const currentTime = Date.now();
        const timeDiff = currentTime - timestampRef.current;
        timestampRef.current = currentTime;

        let pomoTimer = getPomoTimer() ?? getDefaultPomoTimer();
        pomoTimer = addTimePass(pomoTimer, timeDiff);

        if (shouldFinishSlot(pomoTimer)) {
          pomoTimer = finishSlot(pomoTimer);

          stopTimer();
          setAutoStartTimer(pomoTimer);
          play(pomoTimer.setting.alarm);
        }

        setPomoTimer(pomoTimer);
      };

      const setAutoStartTimer = (pomoTimer: Pomo) => {
        if (pomoTimer.data.slot === "Pomodoro") {
          if (pomoTimer.setting.shouldAutoStartPomodoro) {
            window.setTimeout(startTimer, 500);
          }
        } else {
          if (pomoTimer.setting.shouldAutoStartBreak) {
            window.setTimeout(startTimer, 500);
          }
        }
      };

      const startTimer = () => {
        setIsTiming(true);
        intervalRef.current = window.setInterval(onTick, 100);
        timestampRef.current = Date.now();
      };

      const stopTimer = () => {
        setIsTiming(false);
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        timestampRef.current = null;
      };

      let pomoTimer = getPomoTimer() ?? getDefaultPomoTimer();

      switch (action.type) {
        case "SET_DURATION":
          pomoTimer = updateDuration(pomoTimer, action.key, action.value);
          break;
        case "SET_SHOULD_AUTO_START_BREAK":
          pomoTimer = updateShouldAutoStartBreak(
            pomoTimer,
            action.shouldAutoStartBreak,
          );
          break;
        case "SET_SHOULD_AUTO_START_POMODORO":
          pomoTimer = updateShouldAutoStartPomodoro(
            pomoTimer,
            action.shouldAutoStartPomodoro,
          );
          break;
        case "SET_LONG_BREAK_INTERVAL":
          pomoTimer = updateLongBreakInterval(
            pomoTimer,
            action.longBreakInterval,
          );
          break;
        case "SET_ALARM":
          pomoTimer = updateAlarm(pomoTimer, action.key, action.value);
          if (action.key !== "repeat") {
            play({
              name: pomoTimer.setting.alarm.name,
              volume: pomoTimer.setting.alarm.volume,
            });
          }
          break;
        case "SET_THEME":
          pomoTimer = updateTheme(pomoTimer, action.key, action.value);
          break;
        case "RESET_SETTING":
          pomoTimer = resetSetting(pomoTimer);
          break;
        case "RESET_COUNT":
          pomoTimer = resetCount(pomoTimer);
          break;
        case "FINISH_SLOT":
          pomoTimer = finishSlot(pomoTimer);
          stopTimer();
          setAutoStartTimer(pomoTimer);
          break;
        case "SWITCH_SLOT":
          pomoTimer = switchSlot(pomoTimer, action.slot);
          stopTimer();
          break;
        case "RESET_TIMER":
          pomoTimer = resetTimePass(pomoTimer);
          stopTimer();
          break;
        case "START_TIMER":
          startTimer();
          play({ name: "button" });
          break;
        case "STOP_TIMER":
          stopTimer();
          play({ name: "button" });
          break;
      }

      setPomoTimer(pomoTimer);
    },
    [play],
  );

  console.log({
    isTiming,
    timestamp: timestampRef.current,
    interval: intervalRef.current,
  });

  return (
    <AudioControlContext.Provider value={play}>
      <PomoTimerContext.Provider value={state}>
        <PomoTimerDispatchContext.Provider value={dispatch}>
          {children}
        </PomoTimerDispatchContext.Provider>
      </PomoTimerContext.Provider>
    </AudioControlContext.Provider>
  );
}

export function useAudioControl() {
  const audioControlContext = useContext(AudioControlContext);

  if (audioControlContext === null) {
    throw new Error(
      "useAudioControl has to be used within <PomoTimerProvider />",
    );
  }

  return audioControlContext;
}

export function usePomoTimer() {
  const pomoTimerContext = useContext(PomoTimerContext);

  if (pomoTimerContext === null) {
    throw new Error("usePomoTimer has to be used within <PomoTimerProvider />");
  }

  return pomoTimerContext;
}

export function usePomoTimerDispatch() {
  const pomoTimerDispatchContext = useContext(PomoTimerDispatchContext);

  if (pomoTimerDispatchContext === null) {
    throw new Error(
      "usePomoTimerDispatch has to be used within <PomoTimerProvider />",
    );
  }

  return pomoTimerDispatchContext;
}
