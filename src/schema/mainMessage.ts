import { z } from "zod/v4-mini";
import { MAIN_MESSAGE } from "../constants/mainMessage";
import { ALARM_SCHEMA, POMO_TIMER_SCHEMA } from "./pomoTimer";

const PLAY_ALARM_SOUND_MESSAGE_SCHEMA = z.object({
  type: z.literal(MAIN_MESSAGE.PLAY_ALARM_SOUND),
  alarm: ALARM_SCHEMA,
});

const PLAY_BUTTON_SOUND_MESSAGE_SCHEMA = z.object({
  type: z.literal(MAIN_MESSAGE.PLAY_BUTTON_SOUND),
});

const SET_POMO_TIMER_MESSAGE_SCHEMA = z.object({
  type: z.literal(MAIN_MESSAGE.SET_POMO_TIMER),
  pomoTimer: POMO_TIMER_SCHEMA,
});

export const MAIN_MESSAGE_SCHEMA = z.discriminatedUnion("type", [
  PLAY_ALARM_SOUND_MESSAGE_SCHEMA,
  PLAY_BUTTON_SOUND_MESSAGE_SCHEMA,
  SET_POMO_TIMER_MESSAGE_SCHEMA,
]);
