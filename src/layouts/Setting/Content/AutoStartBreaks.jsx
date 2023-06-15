import React from "react";
import { Toggle } from "../../../components";
import { useSettingDispatch } from "../../../contexts";

export default function AutoStartBreaks({ checked }) {
  const dispatch = useSettingDispatch();

  return (
    <div className="flex items-center justify-between py-5">
      <Toggle
        label="Auto Start Breaks"
        checked={checked}
        onChange={(isAutoBreak) => {
          dispatch({
            type: "isAutoBreak",
            isAutoBreak,
          });
        }}
      />
    </div>
  );
}
