import { HorizontalNumberInput, Select, Slider } from "../../../../components";
import { usePomoTimerDispatch } from "../../../../contexts";
import { AlarmProps } from "./Alarm.types";

export default function Alarm({ alarm }: AlarmProps) {
  const dispatch = usePomoTimerDispatch();

  return (
    <div className="flex flex-col gap-6 py-5">
      <div className="relative flex items-center justify-between">
        <Select
          label="Alarm Sound"
          list={["bell", "bird", "digital", "kitchen", "wood"]}
          value={alarm.name}
          onChange={(name) => {
            dispatch({
              type: "SET_ALARM",
              alarm: { name },
            });
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Slider
          value={alarm.volume}
          onChange={(volume) => {
            dispatch({
              type: "SET_ALARM",
              alarm: { volume },
            });
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        <HorizontalNumberInput
          label="repeat"
          value={alarm.repeat}
          onChange={(repeat) => {
            dispatch({
              type: "SET_ALARM",
              alarm: { repeat },
            });
          }}
        />
      </div>
    </div>
  );
}
