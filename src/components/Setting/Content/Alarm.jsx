import React from "react";
import HorizontalNumberInput from "./HorizontalNumberInput";
import Row from "./Row";
import Select from "./Select";
import Slider from "./Slider";

export default function Alarm({ alarm, setAlarm }) {
  return (
    <>
      <Row>
        <Select
          label="Alarm Sound"
          list={["bell", "bird", "digital", "kitchen", "wood"]}
          value={alarm.name}
          setValue={(value) => {
            setAlarm({
              name: value,
            });
          }}
        />
      </Row>
      <div className="flex items-center justify-end gap-4">
        <Slider
          value={alarm.volume}
          setValue={(value) => {
            setAlarm({
              volume: value,
            });
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        <HorizontalNumberInput
          label="repeat"
          value={alarm.repeat}
          setValue={(value) => {
            setAlarm({
              repeat: value,
            });
          }}
        />
      </div>
    </>
  );
}
