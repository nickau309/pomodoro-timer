import { useEffect, useRef } from "react";

export default function useAudio(file, volume = 50) {
  const audio = useRef(null);
  if (audio.current === null) {
    audio.current = new Audio(file);
  }

  useEffect(() => {
    const newAudio = new Audio(file);

    // prevent triggering logic after first render
    // (audio.current.play()) to prevent the following error:
    // DOMException: play() failed because the user didn't interact with the document first.
    //
    // This error will trigger the following error:
    // Uncaught (in promise) DOMException: The element has no supported sources.
    // if start button is press immediately after the page load
    // and mute the button press sound
    if (audio.current.src !== newAudio.src) {
      if (!audio.current.paused) {
        audio.current.pause();
      }
      audio.current.src = "";
      audio.current.srcObject = null;
      audio.current.remove();
      audio.current = newAudio;
      audio.current.play();
    }
  }, [file]);

  useEffect(() => {
    audio.current.volume = volume / 100;
    if (audio.current.paused) {
      audio.current.play();
    }
  }, [volume]);

  return { audio: audio.current };
}
