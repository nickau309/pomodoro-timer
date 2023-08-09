import { useCallback, useEffect } from "react";
import { button } from "../audios";
import { useAudio } from "../hooks";

export default function useButtonSound() {
  const audio = useAudio();

  useEffect(() => {
    audio.current.src = button;
  }, [audio]);

  const play = useCallback(() => {
    audio.current.play();
  }, [audio]);

  return { play };
}
