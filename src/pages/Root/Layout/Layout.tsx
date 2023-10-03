import { classNames } from "../../../utils";
import type { LayoutProps } from "./Layout.types";

export default function Layout({ children, color }: LayoutProps) {
  return (
    <div
      data-testid="layout"
      className={classNames(
        "min-h-screen w-full",
        `bg-${color}`,
        "text-white transition-colors duration-500",
      )}
    >
      <div className="mx-auto max-w-2xl px-4">{children}</div>
    </div>
  );
}
