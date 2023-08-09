import { useCallback, useEffect } from "react";
import { bell, bird, digital, kitchen, wood } from "../audios";
import { useAudio } from "../hooks";
import { Alarm } from "../types";

const file = { bell, bird, digital, kitchen, wood };

export default function useAlarmSound({ name, volume, repeat }: Alarm) {
  const audio = useAudio();

  useEffect(() => {
    audio.current.src = file[name];
    audio.current.play();
  }, [audio, name]);

  useEffect(() => {
    audio.current.volume = volume;
    audio.current.play();
  }, [audio, volume]);

  const play = useCallback(() => {
    audio.current.play(repeat);
  }, [audio, repeat]);

  return { play };
}
