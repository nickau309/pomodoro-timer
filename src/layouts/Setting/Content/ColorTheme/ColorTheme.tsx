import { forwardRef, useImperativeHandle, useRef } from "react";
import { ColorBoxMiniHandle, ColorThemeHandle, Slot } from "../../../../types";
import ColorBoxMini from "./ColorBoxMini";
import { ColorThemeProps } from "./ColorTheme.types";

const ColorTheme = forwardRef<ColorThemeHandle, ColorThemeProps>(
  function ColorTheme({ theme, openColorPicker }, ref) {
    const themeHandleRef = useRef<Map<Slot, ColorBoxMiniHandle> | null>(null);

    useImperativeHandle(ref, () => ({
      focus(slot: Slot) {
        const handle = themeHandleRef.current?.get(slot);
        handle?.focus();
      },
    }));

    return (
      <div className="flex items-center justify-between py-5">
        <span className="font-bold text-neutral-600">Color Themes</span>
        <div className="flex gap-3">
          {Object.entries(theme).map((entry) => (
            <ColorBoxMini
              key={entry[0]}
              ref={(handle) => {
                if (themeHandleRef.current === null) {
                  themeHandleRef.current = new Map();
                }
                if (handle) {
                  themeHandleRef.current.set(entry[0] as Slot, handle);
                } else {
                  themeHandleRef.current.delete(entry[0] as Slot);
                }
              }}
              color={entry[1]}
              handleClick={() => {
                openColorPicker(entry[0] as Slot);
              }}
              slot={entry[0] as Slot}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default ColorTheme;
