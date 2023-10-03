import { PositiveNumberInput, Select, Slider } from "../../../../../components";
import { ALARM_NAME } from "../../../../../constants";
import { useAudioControl, usePomoTimerDispatch } from "../../../../../contexts";
import type { AlarmProps } from "./Alarm.types";

export default function Alarm({ alarm }: AlarmProps) {
  const play = useAudioControl();

  const dispatch = usePomoTimerDispatch();

  return (
    <div className="flex flex-col gap-6 py-5">
      <div className="relative flex items-center justify-between">
        <Select
          label="Alarm Sound"
          list={ALARM_NAME}
          value={alarm.name}
          onChange={(value) => {
            play({ name: value, volume: alarm.volume });
            dispatch({
              type: "SET_ALARM",
              key: "name",
              value,
            });
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Slider
          label="volume"
          value={alarm.volume}
          onChange={(value) => {
            play({ name: alarm.name, volume: value });
            dispatch({
              type: "SET_ALARM",
              key: "volume",
              value,
            });
          }}
        />
      </div>
      <div className="grid grid-cols-[max-content_5rem] items-center justify-end gap-4">
        <PositiveNumberInput
          label="repeat"
          max="5"
          defaultValue={alarm.repeat}
          onBlur={(value) => {
            dispatch({
              type: "SET_ALARM",
              key: "repeat",
              value,
            });
          }}
        />
      </div>
    </div>
  );
}
