import { z } from "zod/v4-mini";
import { ALARM_NAME, COLOR, SLOT } from "../constants";
import {
  DEFAULT_ALARM_NAME,
  DEFAULT_ALARM_REPEAT,
  DEFAULT_ALARM_VOLUME,
  DEFAULT_COUNT,
  DEFAULT_DURATION_LONG_BREAK,
  DEFAULT_DURATION_POMODORO,
  DEFAULT_DURATION_SHORT_BREAK,
  DEFAULT_LONG_BREAK_INTERVAL,
  DEFAULT_SHOULD_AUTO_START_BREAK,
  DEFAULT_SHOULD_AUTO_START_POMODORO,
  DEFAULT_SLOT_INDEX,
  DEFAULT_THEME_LONG_BREAK,
  DEFAULT_THEME_POMODORO,
  DEFAULT_THEME_SHORT_BREAK,
  DEFAULT_TIME_PASS,
  KEY,
} from "../constants/data";
import { getItem, setItem } from "../services/localStorage";
import type { Alarm, Color, Slot } from "../types";
import type { Pomo, Setting } from "../types/data";

const schema = z.object({
  setting: z.object({
    duration: z.record(z.enum(SLOT), z.number()),
    shouldAutoStartBreak: z.boolean(),
    shouldAutoStartPomodoro: z.boolean(),
    longBreakInterval: z.int().check(z.gte(1), z.lte(16)),
    alarm: z.object({
      name: z.enum(ALARM_NAME),
      volume: z.int().check(z.gte(0), z.lte(100)),
      repeat: z.int().check(z.gte(1), z.lte(5)),
    }),
    theme: z.record(z.enum(SLOT), z.enum(COLOR)),
  }),
  data: z.object({
    count: z.int().check(z.gte(0)),
    slot: z.enum(SLOT),
    timePass: z.int().check(z.gte(0)),
  }),
});

export function deserializer(item: string | null): Pomo | null {
  if (item === null) {
    return null;
  }
  try {
    const data: unknown = JSON.parse(item);
    const parsed = schema.parse(data);
    return parsed;
  } catch (error) {
    return null;
  }
}

function serializer(pomoTimer: Pomo) {
  return JSON.stringify(pomoTimer);
}

function getDefaultSetting(): Setting {
  return {
    duration: {
      Pomodoro: DEFAULT_DURATION_POMODORO,
      "Short Break": DEFAULT_DURATION_SHORT_BREAK,
      "Long Break": DEFAULT_DURATION_LONG_BREAK,
    },
    shouldAutoStartBreak: DEFAULT_SHOULD_AUTO_START_BREAK,
    shouldAutoStartPomodoro: DEFAULT_SHOULD_AUTO_START_POMODORO,
    longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
    alarm: {
      name: DEFAULT_ALARM_NAME,
      volume: DEFAULT_ALARM_VOLUME,
      repeat: DEFAULT_ALARM_REPEAT,
    },
    theme: {
      Pomodoro: DEFAULT_THEME_POMODORO,
      "Short Break": DEFAULT_THEME_SHORT_BREAK,
      "Long Break": DEFAULT_THEME_LONG_BREAK,
    },
  };
}

export function getDefaultPomoTimer(): Pomo {
  return {
    setting: getDefaultSetting(),
    data: {
      count: DEFAULT_COUNT,
      slot: SLOT[DEFAULT_SLOT_INDEX],
      timePass: DEFAULT_TIME_PASS,
    },
  };
}

export function getPomoTimer(): Pomo | null {
  const item = getItem(KEY);
  return deserializer(item);
}

export function resetPomoTimer(): void {
  const defaultPomoTimer = getDefaultPomoTimer();
  setPomoTimer(defaultPomoTimer);
}

export function setPomoTimer(pomoTimer: Pomo): void {
  const value = serializer(pomoTimer);
  setItem(KEY, value);
}

export function updateDuration(
  pomoTimer: Pomo,
  key: Slot,
  value: number,
): Pomo {
  return {
    ...pomoTimer,
    setting: {
      ...pomoTimer.setting,
      duration: {
        ...pomoTimer.setting.duration,
        [key]: value,
      },
    },
  };
}

export function updateShouldAutoStartBreak(
  pomoTimer: Pomo,
  shouldAutoStartBreak: boolean,
): Pomo {
  return {
    ...pomoTimer,
    setting: {
      ...pomoTimer.setting,
      shouldAutoStartBreak,
    },
  };
}

export function updateShouldAutoStartPomodoro(
  pomoTimer: Pomo,
  shouldAutoStartPomodoro: boolean,
): Pomo {
  return {
    ...pomoTimer,
    setting: {
      ...pomoTimer.setting,
      shouldAutoStartPomodoro,
    },
  };
}

export function updateLongBreakInterval(
  pomoTimer: Pomo,
  longBreakInterval: number,
): Pomo {
  return {
    ...pomoTimer,
    setting: {
      ...pomoTimer.setting,
      longBreakInterval,
    },
  };
}

export function updateAlarm<K extends keyof Alarm>(
  pomoTimer: Pomo,
  key: K,
  value: Alarm[K],
): Pomo {
  return {
    ...pomoTimer,
    setting: {
      ...pomoTimer.setting,
      alarm: {
        ...pomoTimer.setting.alarm,
        [key]: value,
      },
    },
  };
}

export function updateTheme(pomoTimer: Pomo, key: Slot, value: Color): Pomo {
  return {
    ...pomoTimer,
    setting: {
      ...pomoTimer.setting,
      theme: {
        ...pomoTimer.setting.theme,
        [key]: value,
      },
    },
  };
}

export function resetSetting(pomoTimer: Pomo): Pomo {
  return {
    ...pomoTimer,
    setting: getDefaultSetting(),
  };
}

export function resetCount(pomoTimer: Pomo): Pomo {
  return {
    ...pomoTimer,
    data: {
      ...pomoTimer.data,
      count: 0,
    },
  };
}

export function finishSlot(pomoTimer: Pomo): Pomo {
  if (pomoTimer.data.slot !== "Pomodoro") {
    return {
      ...pomoTimer,
      data: {
        ...pomoTimer.data,
        slot: "Pomodoro",
        timePass: 0,
      },
    };
  }

  const count = pomoTimer.data.count + 1;

  if (count % pomoTimer.setting.longBreakInterval) {
    return {
      ...pomoTimer,
      data: {
        count,
        slot: "Short Break",
        timePass: 0,
      },
    };
  }

  return {
    ...pomoTimer,
    data: {
      count,
      slot: "Long Break",
      timePass: 0,
    },
  };
}

export function switchSlot(pomoTimer: Pomo, slot: Slot): Pomo {
  return {
    ...pomoTimer,
    data: {
      ...pomoTimer.data,
      slot,
      timePass: 0,
    },
  };
}

export function addTimePass(pomoTimer: Pomo, timeDiff: number): Pomo {
  return {
    ...pomoTimer,
    data: {
      ...pomoTimer.data,
      timePass: pomoTimer.data.timePass + timeDiff,
    },
  };
}

export function resetTimePass(pomoTimer: Pomo): Pomo {
  return {
    ...pomoTimer,
    data: {
      ...pomoTimer.data,
      timePass: 0,
    },
  };
}

export function shouldFinishSlot(pomoTimer: Pomo): boolean {
  return (
    pomoTimer.data.timePass >=
    pomoTimer.setting.duration[pomoTimer.data.slot] * 60 * 1000
  );
}
