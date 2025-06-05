import type { Alarm, Duration, Slot, Theme } from "./index.types";

export type Setting = {
  duration: Duration;
  shouldAutoStartBreak: boolean;
  shouldAutoStartPomodoro: boolean;
  longBreakInterval: number;
  alarm: Alarm;
  theme: Theme;
};

export type Data = {
  count: number;
  slot: Slot;
  timePass: number;
};

export type Pomo = {
  setting: Setting;
  data: Data;
};
