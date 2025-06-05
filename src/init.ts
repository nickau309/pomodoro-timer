import { getPomoTimer, resetPomoTimer } from "./utils/data";
import { getResetTime, resetResetTime } from "./utils/setting/resetTime";

if (typeof window !== undefined) {
  const resetTime = getResetTime();
  if (resetTime === null) {
    resetResetTime();
  }
  const pomo = getPomoTimer();
  if (pomo === null) {
    resetPomoTimer();
  }
}
