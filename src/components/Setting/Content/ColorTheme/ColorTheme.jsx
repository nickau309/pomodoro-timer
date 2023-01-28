import React, { forwardRef } from "react";
import ColorBoxMini from "./ColorBoxMini";
import Row from "../Row";

const ColorTheme = forwardRef(function ColorTheme(
  { color, openColorPicker },
  ref
) {
  return (
    <Row>
      <span className="font-bold text-neutral-600">Color Themes</span>
      <div className="flex gap-3">
        {Object.entries(color).map((entry) => (
          <ColorBoxMini
            key={entry[0]}
            ref={ref}
            color={entry[1]}
            handleClick={() => {
              openColorPicker(entry[0]);
            }}
            text={entry[0]}
          />
        ))}
      </div>
    </Row>
  );
});

export default ColorTheme;
