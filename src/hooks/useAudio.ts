import { useCallback, useRef } from "react";
import * as file from "../audios";
import type { AlarmName } from "../types";

export type AudioControl = ({
  name,
  volume,
  repeat,
}: AudioControlProps) => void;

type AudioControlProps = {
  name: AlarmName | "button";
  volume?: number;
  repeat?: number;
};

export default function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lockPlayRef = useRef(false);

  const createNewAudio = (path: string, volume: number) => {
    audioRef.current?.pause();
    audioRef.current = new Audio(path);
    audioRef.current.volume = volume / 100;
    return audioRef.current;
  };

  const playAudio = useCallback((audio: HTMLAudioElement) => {
    if (!lockPlayRef.current && audio.paused) {
      const resetLock = () => {
        lockPlayRef.current = false;
      };
      const promise = audio.play();
      lockPlayRef.current = true;
      promise.then(resetLock, resetLock);
    }
  }, []);

  const play = useCallback<AudioControl>(
    ({ name, volume = 100, repeat = 1 }) => {
      const path = file[name];
      if (audioRef.current !== null && audioRef.current.src.endsWith(path)) {
        audioRef.current.volume = volume / 100;
        return;
      }
      const audio = createNewAudio(path, volume);
      let played = 0;
      const repeatAlarm = () => {
        ++played;
        if (played < repeat) {
          playAudio(audio);
        } else {
          audio.removeEventListener("ended", repeatAlarm);
          audioRef.current = null;
        }
      };
      if (audio.paused) {
        audio.addEventListener("ended", repeatAlarm);
      }
      playAudio(audio);
    },
    [playAudio],
  );

  return play;
}
