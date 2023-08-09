import { CheckIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../../utils";
import { ColorBoxProps } from "./ColorBox.types";

export default function ColorBox({
  color,
  handleClick,
  isCurrentColor,
}: ColorBoxProps) {
  return (
    <button
      onClick={handleClick}
      className={classNames(
        "grid aspect-square place-items-center rounded-xl",
        `bg-${color}`,
        "text-white hover:opacity-80 active:opacity-60"
      )}
    >
      {isCurrentColor && <CheckIcon className="h-6 w-6 stroke-[2.5]" />}
    </button>
  );
}
