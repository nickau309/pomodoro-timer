import { useEffect, useReducer } from "react";

const defaultSetting = {
  duration: {
    Pomodoro: 25,
    "Short Break": 5,
    "Long Break": 15,
  },
  isAutoBreak: false,
  isAutoPomodoro: false,
  longBreakInterval: 4,
  alarm: {
    name: "kitchen",
    volume: 50,
    repeat: 1,
  },
  color: {
    Pomodoro: "pomo1",
    "Short Break": "pomo2",
    "Long Break": "pomo3",
  },
  resetTime: "06:00",
};

function reducer(state, action) {
  switch (action.type) {
    case "duration": {
      return {
        ...state,
        duration: {
          ...state.duration,
          ...action.duration,
        },
      };
    }
    case "isAutoBreak": {
      return {
        ...state,
        isAutoBreak: action.isAutoBreak,
      };
    }
    case "isAutoPomodoro": {
      return {
        ...state,
        isAutoPomodoro: action.isAutoPomodoro,
      };
    }
    case "longBreakInterval": {
      return {
        ...state,
        longBreakInterval: action.longBreakInterval,
      };
    }
    case "alarm": {
      return {
        ...state,
        alarm: {
          ...state.alarm,
          ...action.alarm,
        },
      };
    }
    case "color": {
      return {
        ...state,
        color: {
          ...state.color,
          ...action.color,
        },
      };
    }
    case "resetTime": {
      return {
        ...state,
        resetTime: action.resetTime,
      };
    }
    case "reset": {
      return defaultSetting;
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}

export default function useSetting() {
  const [setting, setSetting] = useReducer(reducer, null, () => {
    const savedSetting = JSON.parse(localStorage.getItem("setting"));
    return savedSetting || defaultSetting;
  });

  useEffect(() => {
    localStorage.setItem("setting", JSON.stringify(setting));
  }, [setting]);

  return { setting, setSetting };
}
