import type { ReactNode } from "react";
import type { Alarm, Duration, Slot, Theme } from "../../types";
import type { Data, Setting } from "../../types/data";

export type PomoTimerProviderProps = {
  children: ReactNode;
};

export type PomoTimerState = {
  setting: Setting;
  data: Data;
  isTiming: boolean;
};

type KeyValue<T, K = keyof T> = K extends keyof T
  ? { key: K; value: T[K] }
  : never;

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

type ResetSettingAction = {
  type: "RESET_SETTING";
};

type ResetCountAction = {
  type: "RESET_COUNT";
};

type FinishSlotAction = {
  type: "FINISH_SLOT";
};

type SwitchSlotAction = {
  type: "SWITCH_SLOT";
  slot: Slot;
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

export type PomoTimerAction =
  | SetDurationAction
  | SetShouldAutoStartBreakAction
  | SetShouldAutoStartPomodoroAction
  | SetLongBreakIntervalAction
  | SetAlarmAction
  | SetThemeAction
  | ResetSettingAction
  | ResetCountAction
  | FinishSlotAction
  | SwitchSlotAction
  | ResetTimerAction
  | StartTimerAction
  | StopTimerAction;
