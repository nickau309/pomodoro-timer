import React from "react";
import buttonPress from "../audios/button-press.wav";
import useAudio from "../hooks/useAudio";

export default function MainButton({
  color,
  isTiming,
  slot,
  startTiming,
  stopTiming,
}) {
  const { audio: buttonPressAudio } = useAudio(buttonPress);

  const handleClick = () => {
    buttonPressAudio.play();
    if (isTiming) {
      stopTiming();
    } else {
      startTiming();
    }
  };

  return (
    <button
      className={`h-14 w-48 select-none rounded bg-white text-xl font-bold uppercase text-${
        color[slot]
      } transition-colors duration-500 ${
        isTiming ? "translate-y-1.5" : "shadow-[0px_6px_0px_rgb(235,235,235)]"
      }`}
      onClick={handleClick}
    >
      {isTiming ? "Stop" : "Start"}
    </button>
  );
}
