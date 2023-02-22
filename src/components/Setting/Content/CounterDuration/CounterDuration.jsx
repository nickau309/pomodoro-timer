import React from "react";
import {
  useSetting,
  useSettingDispatch,
} from "../../../../contexts/SettingContext";
import Row from "../Row";
import VerticalNumberInput from "./VerticalNumberInput";

export default function CounterDuration() {
  const { duration } = useSetting();
  const dispatch = useSettingDispatch();

  return (
    <>
      <div>
        <span className="font-bold text-neutral-600">Time (minutes)</span>
      </div>
      <Row>
        {Object.entries(duration).map((entry) => (
          <VerticalNumberInput
            key={entry[0]}
            label={entry[0]}
            value={entry[1]}
            setValue={(value) => {
              dispatch({
                type: "duration",
                duration: {
                  [entry[0]]: value,
                },
              });
            }}
          />
        ))}
      </Row>
    </>
  );
}
