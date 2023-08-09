import { useCallback, useImperativeHandle, useRef } from "react";

type Handle = {
  play: (repeat?: number) => void;
  src: string;
  volume: number;
};

export default function useAudio() {
  const handle = useRef<Handle>({} as Handle);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lockPlayRef = useRef(false);

  const getAudio = () => {
    if (audioRef.current === null) {
      audioRef.current = new Audio();
    }
    return audioRef.current;
  };

  const playAudio = useCallback((audio: HTMLAudioElement) => {
    if (!lockPlayRef.current && audio.paused) {
      const promise = audio.play();
      lockPlayRef.current = true;
      promise.then(resetLock, resetLock);
    }
  }, []);

  const resetLock = () => {
    lockPlayRef.current = false;
  };

  useImperativeHandle(
    handle,
    () => ({
      play(repeat = 1) {
        const audio = getAudio();
        if (repeat > 1) {
          let played = 0;
          const repeatAlarm = () => {
            ++played;
            console.log(played);
            if (played < repeat) {
              playAudio(audio);
            } else {
              audio.removeEventListener("ended", repeatAlarm);
            }
          };
          audio.addEventListener("ended", repeatAlarm);
        }
        playAudio(audio);
      },
      get src() {
        const audio = getAudio();
        return audio.src;
      },
      set src(file: string) {
        const audio = getAudio();
        audio.src = file;
      },
      get volume() {
        const audio = getAudio();
        return audio.volume;
      },
      set volume(volume: number) {
        const audio = getAudio();
        audio.volume = volume / 100;
      },
    }),
    [playAudio]
  );

  return handle;
}
