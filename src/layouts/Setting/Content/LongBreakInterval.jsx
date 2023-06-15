import React from "react";
import { HorizontalNumberInput } from "../../../components";
import { useSettingDispatch } from "../../../contexts";

export default function LongBreakInterval({ value }) {
  const dispatch = useSettingDispatch();

  return (
    <div className="flex items-center justify-between py-5">
      <HorizontalNumberInput
        label="Long Break Interval"
        value={value}
        onChange={(longBreakInterval) => {
          dispatch({
            type: "longBreakInterval",
            longBreakInterval,
          });
        }}
      />
    </div>
  );
}
