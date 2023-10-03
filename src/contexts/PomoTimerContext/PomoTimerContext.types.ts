import type { ReactNode } from "react";
import type { Alarm, Duration, Slot, Theme } from "../../types";

export type PomoTimerProviderProps = {
  children: ReactNode;
};

export type SettingState = {
  duration: Duration;
  shouldAutoStartBreak: boolean;
  shouldAutoStartPomodoro: boolean;
  longBreakInterval: number;
  alarm: Alarm;
  theme: Theme;
  resetTime: string;
};

export type DataState = {
  count: number;
  slot: Slot;
  timeLeft: number;
  timestamp: number | null;
};

export type Status = "Idle" | "Pending" | "Timing";

export type PomoTimerState = {
  setting: SettingState;
  data: DataState;
  status: Status;
};

type SetDurationAction = {
  type: "SET_DURATION";
} & KeyValue<Duration>;

type SetShouldAutoStartBreakAction = {
  type: "SET_SHOULD_AUTO_START_BREAK";
  shouldAutoStartBreak: boolean;
};

type SetShouldAutoStartPomodoroAction = {
  type: "SET_SHOULD_AUTO_START_POMODORO";
  shouldAutoStartPomodoro: boolean;
};

type SetLongBreakIntervalAction = {
  type: "SET_LONG_BREAK_INTERVAL";
  longBreakInterval: number;
};

type SetAlarmAction = {
  type: "SET_ALARM";
} & KeyValue<Alarm>;

type SetThemeAction = {
  type: "SET_THEME";
} & KeyValue<Theme>;

type KeyValue<T, K = keyof T> = K extends keyof T
  ? { key: K; value: T[K] }
  : never;

type SetResetTimeAction = {
  type: "SET_RESET_TIME";
  resetTime: string;
};

type ResetAction = {
  type: "RESET";
};

type SwitchSlotAction = {
  type: "SWITCH_SLOT";
  slot: Slot;
};

type FinishSlotAction = {
  type: "FINISH_SLOT";
};

type ResetCountAction = {
  type: "RESET_COUNT";
};

type ResetTimerAction = {
  type: "RESET_TIMER";
};

type StartTimerAction = {
  type: "START_TIMER";
};

type StopTimerAction = {
  type: "STOP_TIMER";
};

type UpdateTimerAction = {
  type: "UPDATE_TIMER";
};

export type PomoTimerAction =
  | SetDurationAction
  | SetShouldAutoStartBreakAction
  | SetShouldAutoStartPomodoroAction
  | SetLongBreakIntervalAction
  | SetAlarmAction
  | SetThemeAction
  | SetResetTimeAction
  | ResetAction
  | SwitchSlotAction
  | FinishSlotAction
  | ResetCountAction
  | ResetTimerAction
  | StartTimerAction
  | StopTimerAction
  | UpdateTimerAction;
