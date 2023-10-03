/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  useAudio,
  useBeforeUnload,
  useFavicon,
  useInterval,
  useSetStorageResetTime,
  type AudioControl,
} from "../../hooks";
import type { Slot } from "../../types";
import type {
  PomoTimerAction,
  PomoTimerProviderProps,
  PomoTimerState,
  SettingState,
  Status,
} from "./PomoTimerContext.types";

const AudioControlContext = createContext<AudioControl | null>(null);
const PomoTimerContext = createContext<PomoTimerState | null>(null);
const PomoTimerDispatchContext =
  createContext<React.Dispatch<PomoTimerAction> | null>(null);

export function PomoTimerProvider({ children }: PomoTimerProviderProps) {
  const [pomo, dispatch] = useReducer(reducer, null, () => {
    const savedPomo = localStorage.getItem("pomodoro");
    if (savedPomo) {
      const pomo = JSON.parse(savedPomo) as PomoTimerState;

      const resetTime = localStorage.getItem("resetTime");
      const shouldReset =
        resetTime && new Date() > new Date(JSON.parse(resetTime) as string);
      if (shouldReset) {
        pomo.data.count = 0;
        pomo.data.slot = "Pomodoro";
        pomo.data.timeLeft = pomo.setting.duration.Pomodoro * 60 * 1000;
      }

      // Prevent auto start on first render
      pomo.data.timestamp = null;
      pomo.status = "Idle";

      return pomo;
    }
    return defaultPomoTimer;
  });

  useEffect(() => {
    localStorage.setItem("pomodoro", JSON.stringify(pomo));
  }, [pomo]);

  const countdown = useCallback(() => {
    dispatch({ type: "UPDATE_TIMER" });
  }, []);

  useInterval(countdown, pomo.status !== "Idle" ? 100 : null);

  // Finish a slot after countdown finish
  const play = useAudio();
  useEffect(() => {
    if (pomo.data.timeLeft <= 0) {
      play(pomo.setting.alarm);
      dispatch({ type: "FINISH_SLOT" });
    }
  }, [play, pomo.data.timeLeft, pomo.setting.alarm]);

  useBeforeUnload(pomo.status === "Timing");

  useFavicon(`favicons/favicon-${pomo.setting.theme[pomo.data.slot]}.ico`);

  useSetStorageResetTime(pomo.setting.resetTime);

  return (
    <AudioControlContext.Provider value={play}>
      <PomoTimerContext.Provider value={pomo}>
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

function reducer(
  state: PomoTimerState,
  action: PomoTimerAction,
): PomoTimerState {
  switch (action.type) {
    case "SET_DURATION": {
      const { key: slot, value: duration } = action;
      const timeLeft =
        state.data.slot === slot
          ? state.data.timeLeft +
            duration * 60 * 1000 -
            state.setting.duration[slot] * 60 * 1000
          : state.data.timeLeft;

      return {
        ...state,
        setting: {
          ...state.setting,
          duration: {
            ...state.setting.duration,
            [slot]: duration,
          },
        },
        data: {
          ...state.data,
          timeLeft,
        },
      };
    }
    case "SET_SHOULD_AUTO_START_BREAK": {
      return {
        ...state,
        setting: {
          ...state.setting,
          shouldAutoStartBreak: action.shouldAutoStartBreak,
        },
      };
    }
    case "SET_SHOULD_AUTO_START_POMODORO": {
      return {
        ...state,
        setting: {
          ...state.setting,
          shouldAutoStartPomodoro: action.shouldAutoStartPomodoro,
        },
      };
    }
    case "SET_LONG_BREAK_INTERVAL": {
      return {
        ...state,
        setting: {
          ...state.setting,
          longBreakInterval: action.longBreakInterval,
        },
      };
    }
    case "SET_ALARM": {
      return {
        ...state,
        setting: {
          ...state.setting,
          alarm: {
            ...state.setting.alarm,
            [action.key]: action.value,
          },
        },
      };
    }
    case "SET_THEME": {
      return {
        ...state,
        setting: {
          ...state.setting,
          theme: {
            ...state.setting.theme,
            [action.key]: action.value,
          },
        },
      };
    }
    case "SET_RESET_TIME": {
      return {
        ...state,
        setting: {
          ...state.setting,
          resetTime: action.resetTime,
        },
      };
    }
    case "RESET": {
      return {
        ...state,
        setting: defaultSetting,
      };
    }
    case "SWITCH_SLOT": {
      return {
        ...state,
        data: {
          ...state.data,
          slot: action.slot,
          timeLeft: state.setting.duration[action.slot] * 60 * 1000,
          timestamp: null,
        },
        status: "Idle",
      };
    }
    case "FINISH_SLOT": {
      let slot: Slot;
      let count: number;
      let timestamp: number | null = null;
      let status: Status = "Idle";
      if (state.data.slot === "Pomodoro") {
        slot =
          (state.data.count + 1) % state.setting.longBreakInterval
            ? "Short Break"
            : "Long Break";
        count = state.data.count + 1;
        if (state.setting.shouldAutoStartBreak) {
          timestamp = Date.now() + 500;
          status = "Pending";
        }
      } else {
        slot = "Pomodoro";
        count = state.data.count;
        if (state.setting.shouldAutoStartPomodoro) {
          timestamp = Date.now() + 500;
          status = "Pending";
        }
      }

      return {
        ...state,
        data: {
          count,
          slot,
          timeLeft: state.setting.duration[slot] * 60 * 1000,
          timestamp,
        },
        status,
      };
    }
    case "RESET_COUNT": {
      return {
        ...state,
        data: {
          ...state.data,
          count: 0,
        },
      };
    }
    case "RESET_TIMER": {
      return {
        ...state,
        data: {
          ...state.data,
          timeLeft: state.setting.duration[state.data.slot] * 60 * 1000,
          timestamp: null,
        },
        status: "Idle",
      };
    }
    case "START_TIMER": {
      return {
        ...state,
        data: {
          ...state.data,
          timestamp: Date.now(),
        },
        status: "Timing",
      };
    }
    case "STOP_TIMER": {
      return {
        ...state,
        data: {
          ...state.data,
          timestamp: null,
        },
        status: "Idle",
      };
    }
    case "UPDATE_TIMER": {
      if (state.data.timestamp) {
        const currentTime = Date.now();
        if (currentTime > state.data.timestamp) {
          return {
            ...state,
            data: {
              ...state.data,
              timeLeft:
                state.data.timeLeft - (currentTime - state.data.timestamp),
              timestamp: currentTime,
            },
            status: "Timing",
          };
        }
      }
      return state;
    }
  }
}

const defaultSetting: SettingState = {
  duration: {
    Pomodoro: 25,
    "Short Break": 5,
    "Long Break": 15,
  },
  shouldAutoStartBreak: false,
  shouldAutoStartPomodoro: false,
  longBreakInterval: 4,
  alarm: {
    name: "kitchen",
    volume: 50,
    repeat: 1,
  },
  theme: {
    Pomodoro: "pomo1",
    "Short Break": "pomo2",
    "Long Break": "pomo3",
  },
  resetTime: "06:00",
};

const defaultPomoTimer: PomoTimerState = {
  setting: defaultSetting,
  data: {
    count: 0,
    slot: "Pomodoro",
    timeLeft: 25 * 60 * 1000,
    timestamp: null,
  },
  status: "Idle",
};
