import ColorBox from "../../../components/ColorBox";
import type { ColorBoxRef } from "../../../components/ColorBox";
import { SLOT } from "../../../constants/pomoTimer";
import type { Slot, Theme } from "../../../types/pomoTimer";

type ColorThemesProps = {
  colorBoxRef: React.RefObject<ColorBoxRef>;
  currentSlot: Slot | null;
  openColorPicker: (slot: Slot) => void;
  theme: Theme;
};

export default function ColorThemes({
  colorBoxRef,
  currentSlot,
  openColorPicker,
  theme,
}: ColorThemesProps) {
  return (
    <div className="flex items-center justify-between py-5">
      <span className="font-bold text-neutral-600">Color Themes</span>
      <div className="grid grid-cols-[repeat(3,1.75rem)] gap-3">
        {Object.values(SLOT).map((slot) => (
          <ColorBox
            key={slot}
            ref={slot === currentSlot ? colorBoxRef : null}
            aria-label={slot}
            color={theme[slot]}
            onClick={openColorPicker.bind(null, slot)}
            rounded="lg"
          />
        ))}
      </div>
    </div>
  );
}
