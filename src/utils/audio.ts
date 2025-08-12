import * as file from "../audios";
import type { Alarm } from "../types/pomoTimer";

let audio: HTMLAudioElement | null = null;

export function playAlarmSound({ name, repeat, volume }: Alarm): void {
  const path = file[name];

  if (audio !== null && audio.src.endsWith(path)) {
    audio.volume = volume / 100;
    return;
  }

  audio?.pause();

  audio = new Audio(path);
  audio.volume = volume / 100;

  let played = 0;

  audio.onended = () => {
    ++played;
    if (played < repeat) {
      void audio?.play();
    } else {
      audio = null;
    }
  };

  void audio.play();
}

export function playButtonSound(): void {
  const path = file.button;

  if (audio !== null && audio.src.endsWith(path)) {
    return;
  }

  audio?.pause();

  audio = new Audio(path);

  audio.onended = () => {
    audio = null;
  };

  void audio.play();
}
