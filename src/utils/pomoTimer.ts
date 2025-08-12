import {
  DEFAULT_ALARM,
  DEFAULT_AUTO_START_BREAK,
  DEFAULT_AUTO_START_POMODORO,
  DEFAULT_DATA,
  DEFAULT_DURATION,
  DEFAULT_LONG_BREAK_INTERVAL,
  DEFAULT_RESET_HOURS,
  DEFAULT_STATE,
  DEFAULT_THEME,
} from "../constants/pomoTimer";
import type {
  AlarmName,
  Color,
  Pomo,
  PomoTimer,
  Setting,
  Slot,
} from "../types/pomoTimer";

export function computeResetTime(hours: number, min = 0): Date {
  const date = new Date();
  date.setHours(hours, min, 0, 0);
  if (date <= new Date()) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

export function getDefaultResetTime(): Date {
  return computeResetTime(DEFAULT_RESET_HOURS);
}

export function getDefaultSetting(): Setting {
  return {
    duration: DEFAULT_DURATION,
    autoStartBreak: DEFAULT_AUTO_START_BREAK,
    autoStartPomodoro: DEFAULT_AUTO_START_POMODORO,
    longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
    alarm: DEFAULT_ALARM,
    theme: DEFAULT_THEME,
    resetTime: getDefaultResetTime(),
  };
}

export function getDefaultPomo(): Pomo {
  return {
    setting: getDefaultSetting(),
    data: DEFAULT_DATA,
  };
}

export function getDefaultPomoTimer(): PomoTimer {
  return {
    setting: getDefaultSetting(),
    data: DEFAULT_DATA,
    state: DEFAULT_STATE,
  };
}

export function resetSetting<T extends Pomo>(pomo: T): T {
  return {
    ...pomo,
    setting: getDefaultSetting(),
  };
}

export function updateDuration<T extends Pomo>(
  pomo: T,
  key: Slot,
  value: number,
): T {
  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      duration: {
        ...pomo.setting.duration,
        [key]: value,
      },
    },
  };
}

export function updateAutoStartBreak<T extends Pomo>(
  pomo: T,
  autoStartBreak: boolean,
): T {
  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      autoStartBreak,
    },
  };
}

export function updateAutoStartPomodoro<T extends Pomo>(
  pomo: T,
  autoStartPomodoro: boolean,
): T {
  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      autoStartPomodoro,
    },
  };
}

export function updateLongBreakInterval<T extends Pomo>(
  pomo: T,
  longBreakInterval: number,
): T {
  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      longBreakInterval,
    },
  };
}

export function updateAlarmName<T extends Pomo>(pomo: T, name: AlarmName): T {
  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      alarm: {
        ...pomo.setting.alarm,
        name,
      },
    },
  };
}

export function updateAlarmVolume<T extends Pomo>(pomo: T, volume: number): T {
  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      alarm: {
        ...pomo.setting.alarm,
        volume,
      },
    },
  };
}

export function updateAlarmRepeat<T extends Pomo>(pomo: T, repeat: number): T {
  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      alarm: {
        ...pomo.setting.alarm,
        repeat,
      },
    },
  };
}

export function isOverdue(pomo: Pomo): boolean {
  return pomo.setting.resetTime < new Date();
}

export function refreshResetTime<T extends Pomo>(pomo: T): T {
  const hour = pomo.setting.resetTime.getHours();
  const minute = pomo.setting.resetTime.getMinutes();

  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      resetTime: computeResetTime(hour, minute),
    },
  };
}

export function updateResetTime<T extends Pomo>(pomo: T, resetTime: Date): T {
  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      resetTime,
    },
  };
}

export function updateTheme<T extends Pomo>(
  pomo: T,
  key: Slot,
  value: Color,
): T {
  return {
    ...pomo,
    setting: {
      ...pomo.setting,
      theme: {
        ...pomo.setting.theme,
        [key]: value,
      },
    },
  };
}

export function resetData<T extends Pomo>(pomo: T): T {
  return {
    ...pomo,
    data: DEFAULT_DATA,
  };
}

export function finishSlot<T extends PomoTimer>(pomoTimer: T): T {
  if (pomoTimer.state.slot !== "Pomodoro") {
    return {
      ...pomoTimer,
      state: {
        slot: "Pomodoro",
        timePass: 0,
        timestamp: null,
      },
    };
  }

  const count = pomoTimer.data.count + 1;

  if (count % pomoTimer.setting.longBreakInterval) {
    return {
      ...pomoTimer,
      data: {
        count,
      },
      state: {
        slot: "Short Break",
        timePass: 0,
        timestamp: null,
      },
    };
  }

  return {
    ...pomoTimer,
    data: {
      count,
    },
    state: {
      slot: "Long Break",
      timePass: 0,
      timestamp: null,
    },
  };
}

export function shouldFinishSlot(pomoTimer: PomoTimer): boolean {
  return (
    pomoTimer.state.timePass >=
    pomoTimer.setting.duration[pomoTimer.state.slot] * 60 * 1000
  );
}

export function switchSlot<T extends PomoTimer>(pomoTimer: T, slot: Slot): T {
  return {
    ...pomoTimer,
    state: {
      slot,
      timePass: 0,
      timestamp: null,
    },
  };
}

export function addTimePass<T extends PomoTimer>(
  pomoTimer: T,
  currentTime: number,
): T {
  if (pomoTimer.state.timestamp === null) {
    return pomoTimer;
  }

  const timeDiff = currentTime - pomoTimer.state.timestamp;

  return {
    ...pomoTimer,
    state: {
      ...pomoTimer.state,
      timePass: pomoTimer.state.timePass + timeDiff,
      timestamp: currentTime,
    },
  };
}

export function shouldAddTimePass(
  pomoTimer: PomoTimer,
  currentTime: number,
): boolean {
  if (pomoTimer.state.timestamp === null) {
    return false;
  }

  const timeDiff = currentTime - pomoTimer.state.timestamp;
  const timePass = pomoTimer.state.timePass;
  const newTimePass = timePass + timeDiff;

  return Math.floor(newTimePass / 1000) - Math.floor(timePass / 1000) >= 1;
}

export function resetTimer<T extends PomoTimer>(pomoTimer: T): T {
  return {
    ...pomoTimer,
    state: {
      ...pomoTimer.state,
      timePass: 0,
      timestamp: null,
    },
  };
}

export function stopTimer<T extends PomoTimer>(pomoTimer: T): T {
  return {
    ...pomoTimer,
    state: {
      ...pomoTimer.state,
      timePass: Math.floor(pomoTimer.state.timePass / 1000) * 1000,
      timestamp: null,
    },
  };
}

export function startTimer<T extends PomoTimer>(pomoTimer: T): T {
  return {
    ...pomoTimer,
    state: {
      ...pomoTimer.state,
      timestamp: Date.now(),
    },
  };
}
