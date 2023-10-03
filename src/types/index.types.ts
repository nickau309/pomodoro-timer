import { ALARM_NAME, COLOR, SLOT } from "../constants";

export type Alarm = {
  name: AlarmName;
  volume: number;
  repeat: number;
};

export type AlarmName = (typeof ALARM_NAME)[number];

export type Color = (typeof COLOR)[number];

export type Duration = Record<Slot, number>;

export type Slot = (typeof SLOT)[number];

export type Theme = Record<Slot, Color>;
