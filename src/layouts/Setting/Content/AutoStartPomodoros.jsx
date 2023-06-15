import React from "react";
import { Toggle } from "../../../components";
import { useSettingDispatch } from "../../../contexts";

export default function AutoStartPomodoros({ checked }) {
  const dispatch = useSettingDispatch();

  return (
    <div className="flex items-center justify-between py-5">
      <Toggle
        label="Auto Start Pomodoros"
        checked={checked}
        onChange={(isAutoPomodoro) => {
          dispatch({
            type: "isAutoPomodoro",
            isAutoPomodoro,
          });
        }}
      />
    </div>
  );
}
