import { Alarm, Duration, Slot, Theme } from "../../types";

export type PomoTimerProviderProps = {
  children: React.ReactNode;
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
  shouldAutoStart: boolean;
  slot: Slot;
  timeLeft: number;
  timestamp: number | null;
};

export type PomoTimerState = {
  setting: SettingState;
  data: DataState;
};

type SetDurationAction = {
  type: "SET_DURATION";
  slot: Slot;
  duration: number;
};

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
  alarm: Partial<Alarm>;
};

type SetThemeAction = {
  type: "SET_THEME";
  theme: Partial<Theme>;
};

type ResetTimeAction = {
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
  | ResetTimeAction
  | ResetAction
  | SwitchSlotAction
  | FinishSlotAction
  | ResetCountAction
  | StartTimerAction
  | StopTimerAction
  | UpdateTimerAction;
