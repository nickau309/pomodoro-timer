import React from "react";
import { TimeInput } from "../../../components";
import { useSettingDispatch } from "../../../contexts";

export default function CountResetTime({ value }) {
  const dispatch = useSettingDispatch();

  return (
    <div className="flex items-center justify-between py-5">
      <TimeInput
        label="Count Reset Time"
        value={value}
        onChange={(resetTime) => {
          dispatch({
            type: "resetTime",
            resetTime,
          });
        }}
      />
    </div>
  );
}
