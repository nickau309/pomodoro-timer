import { useCallback, useEffect, useState } from "react";
import { MAIN_MESSAGE } from "../constants/mainMessage";
import { WORKER_MESSAGE } from "../constants/workerMessage";
import { MAIN_MESSAGE_SCHEMA } from "../schema/mainMessage";
import type { PomoTimer } from "../types/pomoTimer";
import type { WorkerMessage } from "../types/workerMessage";
import { playAlarmSound, playButtonSound } from "../utils/audio";

const worker = new SharedWorker(new URL("../worker.ts", import.meta.url), {
  type: "module",
});

export default function usePomoTimer(): readonly [
  PomoTimer | null,
  React.Dispatch<WorkerMessage>,
] {
  const [pomoTimer, setPomoTimer] = useState<PomoTimer | null>(null);

  useEffect(() => {
    worker.port.onmessage = (e) => {
      const data: unknown = e.data;
      const parsed = MAIN_MESSAGE_SCHEMA.parse(data);
      switch (parsed.type) {
        case MAIN_MESSAGE.PLAY_ALARM_SOUND:
          playAlarmSound(parsed.alarm);
          break;
        case MAIN_MESSAGE.PLAY_BUTTON_SOUND:
          playButtonSound();
          break;
        case MAIN_MESSAGE.SET_POMO_TIMER:
          setPomoTimer(parsed.pomoTimer);
          break;
      }
    };
  }, []);

  useEffect(() => {
    worker.port.postMessage({
      type: WORKER_MESSAGE.GET_POMO_TIMER,
    } satisfies WorkerMessage);
  }, []);

  const dispatch = useCallback((message: WorkerMessage) => {
    worker.port.postMessage(message);
  }, []);

  return [pomoTimer, dispatch] as const;
}
