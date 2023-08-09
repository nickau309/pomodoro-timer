export type Alarm = {
  name: AlarmName;
  volume: number;
  repeat: number;
};

export type AlarmName = "bell" | "bird" | "digital" | "kitchen" | "wood";

export type Color = `pomo${From1To8}`;

export type ColorBoxMiniHandle = {
  focus: () => void;
};

export type ColorThemeHandle = {
  focus: (slot: Slot) => void;
};

export type Duration = {
  [key in Slot]: number;
};

type From1To8 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Slot = "Pomodoro" | "Short Break" | "Long Break";

export type Theme = {
  [key in Slot]: Color;
};
