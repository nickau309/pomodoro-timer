/// <reference lib="WebWorker" />

import { MAIN_MESSAGE } from "./constants/mainMessage";
import { DEFAULT_STATE } from "./constants/pomoTimer";
import { WORKER_MESSAGE } from "./constants/workerMessage";
import { WORKER_MESSAGE_SCHEMA } from "./schema/workerMessage";
import { getIDBPomo, init, setIDBPomo } from "./stores/idb";
import type { MainMessage } from "./types/mainMessage";
import type { PomoTimer } from "./types/pomoTimer";
import {
  addTimePass,
  finishSlot,
  getDefaultPomoTimer,
  isOverdue,
  refreshResetTime,
  resetData,
  resetSetting,
  resetTimer,
  shouldAddTimePass,
  shouldFinishSlot,
  startTimer,
  stopTimer,
  switchSlot,
  updateAlarmName,
  updateAlarmRepeat,
  updateAlarmVolume,
  updateAutoStartBreak,
  updateAutoStartPomodoro,
  updateDuration,
  updateLongBreakInterval,
  updateResetTime,
  updateTheme,
} from "./utils/pomoTimer";

export type {};

declare let self: SharedWorkerGlobalScope;

let pomoTimer: PomoTimer | null = null;

function getPomoTimer(): PomoTimer {
  return pomoTimer ?? getDefaultPomoTimer();
}

function setPomoTimer(newPomoTimer: PomoTimer): void {
  const { data, setting } = getPomoTimer();

  if (newPomoTimer.data !== data || newPomoTimer.setting !== setting) {
    void setIDBPomo(newPomoTimer);
  }

  pomoTimer = newPomoTimer;
}

let intervalId: number | null = null;

function start(): void {
  if (intervalId === null) {
    intervalId = self.setInterval(onTick, 100);
  }
}

function stop(): void {
  if (intervalId !== null) {
    self.clearInterval(intervalId);
    intervalId = null;
  }
}

function autoStart(): void {
  let pomoTimer = getPomoTimer();
  pomoTimer = startTimer(pomoTimer);
  start();

  if (isOverdue(pomoTimer)) {
    pomoTimer = refreshResetTime(pomoTimer);
  }

  setPomoTimer(pomoTimer);
  postPomoTimerMessageToAllPorts();
}

function onTick(): void {
  let pomoTimer = getPomoTimer();

  const currentTime = Date.now();

  if (!shouldAddTimePass(pomoTimer, currentTime)) {
    return;
  }

  pomoTimer = addTimePass(pomoTimer, currentTime);

  if (shouldFinishSlot(pomoTimer)) {
    stop();
    pomoTimer = finishSlot(pomoTimer);
    setAutoStart(pomoTimer);
    postAlarmWithRepeatMessageToCurrentPort(pomoTimer);
  }

  if (isOverdue(pomoTimer)) {
    pomoTimer = refreshResetTime(pomoTimer);
  }

  setPomoTimer(pomoTimer);
  postPomoTimerMessageToAllPorts();
}

function setAutoStart(pomoTimer: PomoTimer): void {
  if (pomoTimer.state.slot === "Pomodoro") {
    if (pomoTimer.setting.autoStartPomodoro) {
      self.setTimeout(autoStart, 500);
    }
  } else {
    if (pomoTimer.setting.autoStartBreak) {
      self.setTimeout(autoStart, 500);
    }
  }
}

const ports: MessagePort[] = [];

let currentPort: MessagePort | null = null;

function getCurrentPort(): MessagePort | null {
  return currentPort;
}

function setCurrentPort(newCurrentPort: MessagePort | null): void {
  currentPort = newCurrentPort;
}

self.onconnect = (e) => {
  const port = e.ports[0];
  ports.push(port);

  port.onmessageerror = (e) => {
    console.error(e);
  };

  port.onmessage = (e) => {
    setCurrentPort(port);

    const data: unknown = e.data;
    const parsed = WORKER_MESSAGE_SCHEMA.parse(data);

    let pomoTimer = getPomoTimer();

    if (parsed.type === WORKER_MESSAGE.GET_POMO_TIMER) {
      if (didInit) {
        const message: MainMessage = {
          type: MAIN_MESSAGE.SET_POMO_TIMER,
          pomoTimer,
        };
        port.postMessage(message);
      }
      return;
    }

    switch (parsed.type) {
      case WORKER_MESSAGE.FINISH_SLOT:
        stop();
        pomoTimer = finishSlot(pomoTimer);
        setAutoStart(pomoTimer);
        break;
      case WORKER_MESSAGE.RESET_COUNT:
        pomoTimer = resetData(pomoTimer);
        break;
      case WORKER_MESSAGE.RESET_SETTING:
        pomoTimer = resetSetting(pomoTimer);
        break;
      case WORKER_MESSAGE.RESET_TIMER:
        stop();
        pomoTimer = resetTimer(pomoTimer);
        break;
      case WORKER_MESSAGE.START_TIMER:
        pomoTimer = startTimer(pomoTimer);
        start();
        postClickMessageToCurrentPort();
        break;
      case WORKER_MESSAGE.STOP_TIMER:
        stop();
        pomoTimer = stopTimer(pomoTimer);
        postClickMessageToCurrentPort();
        break;
      case WORKER_MESSAGE.SWITCH_SLOT:
        stop();
        pomoTimer = switchSlot(pomoTimer, parsed.slot);
        break;
      case WORKER_MESSAGE.UPDATE_ALARM_NAME:
        pomoTimer = updateAlarmName(pomoTimer, parsed.name);
        postAlarmMessageToCurrentPort(pomoTimer);
        break;
      case WORKER_MESSAGE.UPDATE_ALARM_REPEAT:
        pomoTimer = updateAlarmRepeat(pomoTimer, parsed.repeat);
        break;
      case WORKER_MESSAGE.UPDATE_ALARM_VOLUME:
        pomoTimer = updateAlarmVolume(pomoTimer, parsed.volume);
        postAlarmMessageToCurrentPort(pomoTimer);
        break;
      case WORKER_MESSAGE.UPDATE_AUTO_START_BREAK:
        pomoTimer = updateAutoStartBreak(pomoTimer, parsed.autoStartBreak);
        break;
      case WORKER_MESSAGE.UPDATE_AUTO_START_POMODORO:
        pomoTimer = updateAutoStartPomodoro(
          pomoTimer,
          parsed.autoStartPomodoro,
        );
        break;
      case WORKER_MESSAGE.UPDATE_DURATION:
        pomoTimer = updateDuration(pomoTimer, parsed.key, parsed.value);
        break;
      case WORKER_MESSAGE.UPDATE_LONG_BREAK_INTERVAL:
        pomoTimer = updateLongBreakInterval(
          pomoTimer,
          parsed.longBreakInterval,
        );
        break;
      case WORKER_MESSAGE.UPDATE_RESET_TIME:
        pomoTimer = updateResetTime(pomoTimer, parsed.resetTime);
        break;
      case WORKER_MESSAGE.UPDATE_THEME:
        pomoTimer = updateTheme(pomoTimer, parsed.key, parsed.value);
        break;
    }

    if (isOverdue(pomoTimer)) {
      pomoTimer = refreshResetTime(pomoTimer);
    }

    setPomoTimer(pomoTimer);
    postPomoTimerMessageToAllPorts();
  };
};

function postAlarmMessageToCurrentPort(pomoTimer: PomoTimer): void {
  const currentPort = getCurrentPort();
  const message: MainMessage = {
    type: MAIN_MESSAGE.PLAY_ALARM_SOUND,
    alarm: {
      name: pomoTimer.setting.alarm.name,
      volume: pomoTimer.setting.alarm.volume,
      repeat: 1,
    },
  };
  currentPort?.postMessage(message);
}

function postAlarmWithRepeatMessageToCurrentPort(pomoTimer: PomoTimer): void {
  const currentPort = getCurrentPort();
  const message: MainMessage = {
    type: MAIN_MESSAGE.PLAY_ALARM_SOUND,
    alarm: pomoTimer.setting.alarm,
  };
  currentPort?.postMessage(message);
}

function postClickMessageToCurrentPort(): void {
  const currentPort = getCurrentPort();
  const message: MainMessage = {
    type: MAIN_MESSAGE.PLAY_BUTTON_SOUND,
  };
  currentPort?.postMessage(message);
}

function postMessageToAllPorts(message: unknown): void {
  for (const port of ports) {
    port.postMessage(message);
  }
}

function postPomoTimerMessageToAllPorts(): void {
  const pomoTimer = getPomoTimer();
  const message: MainMessage = {
    type: MAIN_MESSAGE.SET_POMO_TIMER,
    pomoTimer,
  };
  postMessageToAllPorts(message);
}

let didInit = false;

try {
  await init();
  const pomo = await getIDBPomo();
  if (pomo === null) {
    pomoTimer = getDefaultPomoTimer();
  } else {
    pomoTimer = {
      ...pomo,
      state: DEFAULT_STATE,
    };
  }
} catch (error) {
  console.error(error);
} finally {
  didInit = true;
  const currentPort = getCurrentPort();
  if (currentPort !== null) {
    postPomoTimerMessageToAllPorts();
  }
}
