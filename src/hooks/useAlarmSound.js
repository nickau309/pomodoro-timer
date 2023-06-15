import { useCallback } from "react";
import { bell, bird, digital, kitchen, wood } from "../audios";
import { useAudio } from "../hooks";

const file = { bell, bird, digital, kitchen, wood };

export default function useAlarmSound(alarm) {
  const { audio: alarmAudio } = useAudio(file[alarm.name], alarm.volume);

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
