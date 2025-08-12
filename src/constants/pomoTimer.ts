export const COLOR = {
  POMO1: "pomo1",
  POMO2: "pomo2",
  POMO3: "pomo3",
  POMO4: "pomo4",
  POMO5: "pomo5",
  POMO6: "pomo6",
  POMO7: "pomo7",
  POMO8: "pomo8",
} as const;

export const SLOT = {
  POMODORO: "Pomodoro",
  SHORT_BREAK: "Short Break",
  LONG_BREAK: "Long Break",
} as const;

export const MIN_TIME = 1;

export const MAX_TIME = 120;

export const DEFAULT_DURATION = {
  [SLOT.POMODORO]: 25,
  [SLOT.SHORT_BREAK]: 5,
  [SLOT.LONG_BREAK]: 15,
} as const;

export const DEFAULT_AUTO_START_BREAK = false;

export const DEFAULT_AUTO_START_POMODORO = false;

export const DEFAULT_LONG_BREAK_INTERVAL = 4;

export const MIN_LONG_BREAK_INTERVAL = 1;

export const MAX_LONG_BREAK_INTERVAL = 16;

export const ALARM_NAME = {
  BELL: "bell",
  BIRD: "bird",
  DIGITAL: "digital",
  KITCHEN: "kitchen",
  WOOD: "wood",
} as const;

export const DEFAULT_ALARM_NAME = ALARM_NAME.KITCHEN;

export const DEFAULT_ALARM_VOLUME = 50;

export const DEFAULT_ALARM_REPEAT = 1;

export const MIN_ALARM_REPEAT = 1;

export const MAX_ALARM_REPEAT = 5;

export const DEFAULT_ALARM = {
  name: DEFAULT_ALARM_NAME,
  volume: DEFAULT_ALARM_VOLUME,
  repeat: DEFAULT_ALARM_REPEAT,
} as const;

export const DEFAULT_THEME = {
  [SLOT.POMODORO]: COLOR.POMO1,
  [SLOT.SHORT_BREAK]: COLOR.POMO2,
  [SLOT.LONG_BREAK]: COLOR.POMO3,
} as const;

export const DEFAULT_RESET_HOURS = 6;

export const DEFAULT_COUNT = 0;

export const DEFAULT_DATA = {
  count: DEFAULT_COUNT,
} as const;

export const DEFAULT_SLOT = SLOT.POMODORO;

export const DEFAULT_TIME_PASS = 0;

export const DEFAULT_TIMESTAMP = null;

export const DEFAULT_STATE = {
  slot: DEFAULT_SLOT,
  timePass: DEFAULT_TIME_PASS,
  timestamp: DEFAULT_TIMESTAMP,
} as const;
