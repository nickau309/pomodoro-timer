import { z } from "zod/v4-mini";
import {
  ALARM_NAME,
  COLOR,
  DEFAULT_ALARM,
  DEFAULT_ALARM_NAME,
  DEFAULT_ALARM_REPEAT,
  DEFAULT_ALARM_VOLUME,
  DEFAULT_AUTO_START_BREAK,
  DEFAULT_AUTO_START_POMODORO,
  DEFAULT_COUNT,
  DEFAULT_DATA,
  DEFAULT_DURATION,
  DEFAULT_LONG_BREAK_INTERVAL,
  DEFAULT_SLOT,
  DEFAULT_STATE,
  DEFAULT_THEME,
  DEFAULT_TIME_PASS,
  DEFAULT_TIMESTAMP,
  MAX_ALARM_REPEAT,
  MAX_LONG_BREAK_INTERVAL,
  MAX_TIME,
  MIN_ALARM_REPEAT,
  MIN_LONG_BREAK_INTERVAL,
  MIN_TIME,
  SLOT,
} from "../constants/pomoTimer";
import { getDefaultResetTime, getDefaultSetting } from "../utils/pomoTimer";

export const COLOR_SCHEMA = z.enum(COLOR);

export const SLOT_SCHEMA = z.enum(SLOT);

export const TIME_SCHEMA = z.int().check(z.gte(MIN_TIME), z.lte(MAX_TIME));

export const DURATION_SCHEMA = z.object({
  [SLOT.POMODORO]: z.catch(TIME_SCHEMA, DEFAULT_DURATION[SLOT.POMODORO]),
  [SLOT.SHORT_BREAK]: z.catch(TIME_SCHEMA, DEFAULT_DURATION[SLOT.SHORT_BREAK]),
  [SLOT.LONG_BREAK]: z.catch(TIME_SCHEMA, DEFAULT_DURATION[SLOT.LONG_BREAK]),
});

export const AUTO_START_BREAK_SCHEMA = z.boolean();

export const AUTO_START_POMODORO_SCHEMA = z.boolean();

export const LONG_BREAK_INTERVAL_SCHEMA = z
  .int()
  .check(z.gte(MIN_LONG_BREAK_INTERVAL), z.lte(MAX_LONG_BREAK_INTERVAL));

export const ALARM_NAME_SCHEMA = z.enum(ALARM_NAME);

export const ALARM_VOLUME_SCHEMA = z.int().check(z.gte(0), z.lte(100));

export const ALARM_REPEAT_SCHEMA = z
  .int()
  .check(z.gte(MIN_ALARM_REPEAT), z.lte(MAX_ALARM_REPEAT));

export const ALARM_SCHEMA = z.object({
  name: z.catch(ALARM_NAME_SCHEMA, DEFAULT_ALARM_NAME),
  volume: z.catch(ALARM_VOLUME_SCHEMA, DEFAULT_ALARM_VOLUME),
  repeat: z.catch(ALARM_REPEAT_SCHEMA, DEFAULT_ALARM_REPEAT),
});

export const THEME_SCHEMA = z.object({
  [SLOT.POMODORO]: z.catch(COLOR_SCHEMA, DEFAULT_THEME[SLOT.POMODORO]),
  [SLOT.SHORT_BREAK]: z.catch(COLOR_SCHEMA, DEFAULT_THEME[SLOT.SHORT_BREAK]),
  [SLOT.LONG_BREAK]: z.catch(COLOR_SCHEMA, DEFAULT_THEME[SLOT.LONG_BREAK]),
});

export const RESET_TIME_SCHEMA = z.date();

export const SETTING_SCHEMA = z.object({
  duration: z.catch(DURATION_SCHEMA, DEFAULT_DURATION),
  autoStartBreak: z.catch(AUTO_START_BREAK_SCHEMA, DEFAULT_AUTO_START_BREAK),
  autoStartPomodoro: z.catch(
    AUTO_START_POMODORO_SCHEMA,
    DEFAULT_AUTO_START_POMODORO,
  ),
  longBreakInterval: z.catch(
    LONG_BREAK_INTERVAL_SCHEMA,
    DEFAULT_LONG_BREAK_INTERVAL,
  ),
  alarm: z.catch(ALARM_SCHEMA, DEFAULT_ALARM),
  theme: z.catch(THEME_SCHEMA, DEFAULT_THEME),
  resetTime: z.catch(RESET_TIME_SCHEMA, getDefaultResetTime()),
});

const COUNT_SCHEMA = z.int().check(z.gte(0));

export const DATA_SCHEMA = z.object({
  count: z.catch(COUNT_SCHEMA, DEFAULT_COUNT),
});

const TIME_PASS_SCHEMA = z.int().check(z.gte(0));

const TIMESTAMP_SCHEMA = z.nullable(z.int());

export const STATE_SCHEMA = z.object({
  slot: z.catch(SLOT_SCHEMA, DEFAULT_SLOT),
  timePass: z.catch(TIME_PASS_SCHEMA, DEFAULT_TIME_PASS),
  timestamp: z.catch(TIMESTAMP_SCHEMA, DEFAULT_TIMESTAMP),
});

export const POMO_SCHEMA = z.object({
  setting: z.catch(SETTING_SCHEMA, getDefaultSetting()),
  data: z.catch(DATA_SCHEMA, DEFAULT_DATA),
});

export const POMO_TIMER_SCHEMA = z.object({
  setting: z.catch(SETTING_SCHEMA, getDefaultSetting()),
  data: z.catch(DATA_SCHEMA, DEFAULT_DATA),
  state: z.catch(STATE_SCHEMA, DEFAULT_STATE),
});
