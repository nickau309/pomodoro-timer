import { z } from "zod/v4-mini";
import {
  ALARM_NAME_SCHEMA,
  ALARM_SCHEMA,
  COLOR_SCHEMA,
  DATA_SCHEMA,
  DURATION_SCHEMA,
  POMO_SCHEMA,
  POMO_TIMER_SCHEMA,
  SETTING_SCHEMA,
  SLOT_SCHEMA,
  STATE_SCHEMA,
  THEME_SCHEMA,
} from "../schema/pomoTimer";

export type Color = z.infer<typeof COLOR_SCHEMA>;

export type Slot = z.infer<typeof SLOT_SCHEMA>;

export type Duration = z.infer<typeof DURATION_SCHEMA>;

export type AlarmName = z.infer<typeof ALARM_NAME_SCHEMA>;

export type Alarm = z.infer<typeof ALARM_SCHEMA>;

export type Theme = z.infer<typeof THEME_SCHEMA>;

export type Setting = z.infer<typeof SETTING_SCHEMA>;

export type Data = z.infer<typeof DATA_SCHEMA>;

export type State = z.infer<typeof STATE_SCHEMA>;

export type Pomo = z.infer<typeof POMO_SCHEMA>;

export type PomoTimer = z.infer<typeof POMO_TIMER_SCHEMA>;
