import React from "react";
import { VerticalNumberInput } from "../../../components";
import { useSettingDispatch } from "../../../contexts";

export default function CounterDuration({ duration }) {
  const dispatch = useSettingDispatch();

  return (
    <div className="flex flex-col gap-2.5 py-5">
      <div className="font-bold text-neutral-600">Time (minutes)</div>
      <div className="flex items-center justify-between gap-1">
        {Object.entries(duration).map((entry) => (
          <VerticalNumberInput
            key={entry[0]}
            label={entry[0]}
            value={entry[1]}
            onBlur={(value) => {
              dispatch({
                type: "duration",
                duration: {
                  [entry[0]]: value,
                },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
