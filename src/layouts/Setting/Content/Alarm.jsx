import React from "react";
import { HorizontalNumberInput, Select, Slider } from "../../../components";
import { useSettingDispatch } from "../../../contexts";

export default function Alarm({ alarm }) {
  const dispatch = useSettingDispatch();

  return (
    <div className="flex flex-col gap-6 py-5">
      <div className="relative flex items-center justify-between">
        <Select
          label="Alarm Sound"
          list={["bell", "bird", "digital", "kitchen", "wood"]}
          value={alarm.name}
          onChange={(name) => {
            dispatch({
              type: "alarm",
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
              type: "alarm",
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
              type: "alarm",
              alarm: { repeat },
            });
          }}
        />
      </div>
    </div>
  );
}