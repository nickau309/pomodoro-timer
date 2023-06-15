import React, { forwardRef } from "react";
import ColorBoxMini from "./ColorBoxMini";

const ColorTheme = forwardRef(function ColorTheme(
  { color, openColorPicker },
  ref
) {
  return (
    <div className="flex items-center justify-between py-5">
      <span className="font-bold text-neutral-600">Color Themes</span>
      <div className="flex gap-3">
        {Object.entries(color).map((entry) => (
          <ColorBoxMini
            key={entry[0]}
            ref={(obj) => {
              if (obj) {
                ref.current.set(entry[0], obj);
              } else {
                ref.current.delete(entry[0]);
              }
            }}
            color={entry[1]}
            handleClick={() => openColorPicker(entry[0])}
            text={entry[0]}
          />
        ))}
      </div>
    </div>
  );
});

export default ColorTheme;
