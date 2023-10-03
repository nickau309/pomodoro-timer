import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Setting } from "../../../pages";
import type { HeaderProps } from "./Header.types";

export default function Header({ setting }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between">
      <h1 className="flex items-center gap-1.5">
        <CheckCircleIcon className="h-6 w-6" />
        <span className="select-none text-xl font-bold">Pomodoro Timer</span>
      </h1>
      <Setting setting={setting} />
    </header>
  );
}
