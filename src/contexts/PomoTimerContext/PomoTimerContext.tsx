/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  PomoTimerAction,
  PomoTimerProviderProps,
  PomoTimerState,
} from "./PomoTimerContext.types";
import { Slot } from "../../types";
import {
  useAlarmSound,
  useBeforeUnload,
  useFavicon,
  useInterval,
  useSetStorageResetTime,
} from "../../hooks";

const PomoTimerContext = createContext<PomoTimerState>({} as PomoTimerState);
const PomoTimerDispatchContext = createContext<React.Dispatch<PomoTimerAction>>(
  (() => undefined) as React.Dispatch<PomoTimerAction>
);

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
      pomo.data.shouldAutoStart = false;
      // Prevent auto start after refresh
      pomo.data.timestamp = null;

      return pomo;
    }
    return defaultPomoTimer;
  });

  useEffect(() => {
    localStorage.setItem("pomodoro", JSON.stringify(pomo));
  }, [pomo]);

  const isTiming = pomo.data.timestamp !== null;
  const countdown = useCallback(() => {
    dispatch({ type: "UPDATE_TIMER" });
  }, []);

  useInterval(countdown, isTiming ? 100 : null);

  // Finish a slot after countdown finish
  const { play } = useAlarmSound(pomo.setting.alarm);
  useEffect(() => {
    if (pomo.data.timeLeft <= 0) {
      play();
      dispatch({ type: "FINISH_SLOT" });
    }
  }, [play, pomo.data.timeLeft]);

  // Auto start after finish a slot
  useEffect(() => {
    if (pomo.data.shouldAutoStart) {
      setTimeout(dispatch, 500, { type: "START_TIMER" });
    }
  }, [pomo.data.slot, pomo.data.shouldAutoStart]);

  useBeforeUnload(isTiming);

  useFavicon(`favicons/favicon-${pomo.setting.theme[pomo.data.slot]}.ico`);

  useSetStorageResetTime(pomo.setting.resetTime);

  return (
    <PomoTimerContext.Provider value={pomo}>
      <PomoTimerDispatchContext.Provider value={dispatch}>
        {children}
      </PomoTimerDispatchContext.Provider>
    </PomoTimerContext.Provider>
  );
}

export function usePomoTimer() {
  return useContext(PomoTimerContext);
}

export function usePomoTimerDispatch() {
  return useContext(PomoTimerDispatchContext);
}

function reducer(
  state: PomoTimerState,
  action: PomoTimerAction
): PomoTimerState {
  switch (action.type) {
    case "SET_DURATION": {
      const timeLeft =
        state.data.slot === action.slot
          ? state.data.timeLeft +
            action.duration * 60 * 1000 -
            state.setting.duration[action.slot] * 60 * 1000
          : state.data.timeLeft;

      return {
        ...state,
        setting: {
          ...state.setting,
          duration: {
            ...state.setting.duration,
            [action.slot]: action.duration,
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
            ...action.alarm,
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
            ...action.theme,
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
      return defaultPomoTimer;
    }
    case "SWITCH_SLOT": {
      return {
        ...state,
        data: {
          ...state.data,
          shouldAutoStart: false,
          slot: action.slot,
          timeLeft: state.setting.duration[action.slot] * 60 * 1000,
          timestamp: null,
        },
      };
    }
    case "FINISH_SLOT": {
      let slot: Slot;
      let count: number;
      let shouldAutoStart = false;
      if (state.data.slot === "Pomodoro") {
        slot =
          (state.data.count + 1) % state.setting.longBreakInterval
            ? "Short Break"
            : "Long Break";
        count = state.data.count + 1;
        shouldAutoStart = state.setting.shouldAutoStartBreak;
      } else {
        slot = "Pomodoro";
        count = state.data.count;
        shouldAutoStart = state.setting.shouldAutoStartPomodoro;
      }

      return {
        ...state,
        data: {
          count,
          shouldAutoStart,
          slot,
          timeLeft: state.setting.duration[slot] * 60 * 1000,
          timestamp: null,
        },
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
    case "START_TIMER": {
      return {
        ...state,
        data: {
          ...state.data,
          timestamp: Date.now(),
        },
      };
    }
    case "STOP_TIMER": {
      return {
        ...state,
        data: {
          ...state.data,
          timestamp: null,
        },
      };
    }
    case "UPDATE_TIMER": {
      if (state.data.timestamp) {
        const currentTime = Date.now();
        return {
          ...state,
          data: {
            ...state.data,
            timeLeft:
              state.data.timeLeft - (currentTime - state.data.timestamp),
            timestamp: currentTime,
          },
        };
      }
      return state;
    }
  }
}

const defaultPomoTimer: PomoTimerState = {
  setting: {
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
  },
  data: {
    count: 0,
    shouldAutoStart: false,
    slot: "Pomodoro",
    timeLeft: 25 * 60 * 1000,
    timestamp: null,
  },
};
