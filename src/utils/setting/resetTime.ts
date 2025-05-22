import { z } from "zod/v4-mini";
import { DEFAULT_RESET_HOURS, KEY } from "../../constants/setting/resetTime";
import { getItem, setItem } from "../../services/localStorage";

export function deserializer(item: string | null) {
  if (item === null) {
    return null;
  }
  try {
    const data: unknown = JSON.parse(item);
    const str = z.iso.datetime().parse(data);
    return new Date(str);
  } catch (error) {
    return null;
  }
}

function serializer(resetTime: Date) {
  return JSON.stringify(resetTime);
}

export function computeResetTime(hours: number, min = 0) {
  const date = new Date();
  date.setHours(hours, min, 0, 0);
  if (date <= new Date()) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

export function getDefaultResetTime() {
  return computeResetTime(DEFAULT_RESET_HOURS);
}

export function getResetTime() {
  const item = getItem(KEY);
  return deserializer(item);
}

export function resetResetTime() {
  const defaultResetTime = getDefaultResetTime();
  setResetTime(defaultResetTime);
}

export function setResetTime(resetTime: Date) {
  const value = serializer(resetTime);
  setItem(KEY, value);
}
