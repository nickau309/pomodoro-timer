import { SLOT } from "../../../../../constants";
import ColorTheme from "./ColorTheme";
import type { ColorThemesProps } from "./ColorThemes.types";

export default function ColorThemes({ theme }: ColorThemesProps) {
  return (
    <div className="flex items-center justify-between py-5">
      <span className="font-bold text-neutral-600">Color Themes</span>
      <div className="grid grid-cols-[repeat(3,1.75rem)] gap-3">
        {SLOT.map((slot) => (
          <ColorTheme key={slot} color={theme[slot]} slot={slot} />
        ))}
      </div>
    </div>
  );
}
