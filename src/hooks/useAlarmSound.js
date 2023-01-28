import { useCallback } from "react";
import useAudio from "./useAudio";
import bell from "../audios/bell.mp3";
import bird from "../audios/bird.mp3";
import digital from "../audios/digital.mp3";
import kitchen from "../audios/kitchen.mp3";
import wood from "../audios/wood.mp3";

export default function useAlarmSound(alarm) {
  let file;
  switch (alarm.name) {
    case "bell":
      file = bell;
      break;
    case "bird":
      file = bird;
      break;
    case "digital":
      file = digital;
      break;
    case "kitchen":
      file = kitchen;
      break;
    case "wood":
      file = wood;
      break;
    default:
      throw new Error("Unexpected alarm name.");
  }

  const { audio: alarmAudio } = useAudio(file, alarm.volume);

  const alarmPlay = useCallback(() => {
    let played = 0;

    const repeatAlarm = () => {
      ++played;
      if (played < alarm.repeat) {
        alarmAudio.play();
      } else {
        alarmAudio.removeEventListener("ended", repeatAlarm);
      }
    };

    alarmAudio.addEventListener("ended", repeatAlarm);
    alarmAudio.play();
  }, [alarm.repeat, alarmAudio]);

  return { alarmPlay };
}
