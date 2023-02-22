import React from "react";
import {
  useSetting,
  useSettingDispatch,
} from "../../../contexts/SettingContext";
import HorizontalNumberInput from "./HorizontalNumberInput";
import Row from "./Row";
import Select from "./Select";
import Slider from "./Slider";

export default function Alarm() {
  const { alarm } = useSetting();
  const dispatch = useSettingDispatch();

  return (
    <>
      <Row>
        <Select
          label="Alarm Sound"
          list={["bell", "bird", "digital", "kitchen", "wood"]}
          value={alarm.name}
          setValue={(name) => {
            dispatch({
              type: "alarm",
              alarm: { name },
            });
          }}
        />
      </Row>
      <div className="flex items-center justify-end gap-4">
        <Slider
          value={alarm.volume}
          setValue={(volume) => {
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
          setValue={(repeat) => {
            dispatch({
              type: "alarm",
              alarm: { repeat },
            });
          }}
        />
      </div>
    </>
  );
}
