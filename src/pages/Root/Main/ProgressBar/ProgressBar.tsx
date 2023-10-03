import type { ProgressBarProps } from "./ProgressBar.types";

export default function ProgressBar({
  initTimeLeft,
  timeLeft,
}: ProgressBarProps) {
  const progress =
    timeLeft >= 0
      ? Math.round(((initTimeLeft - timeLeft) / initTimeLeft) * 1000000) / 10000
      : 0;

  return (
    <div
      role="progressbar"
      aria-label="Current Timer Progress"
      aria-valuenow={progress}
      className="h-px w-full bg-black/10"
    >
      <div
        className="h-[3px] -translate-y-px rounded bg-white"
        style={{ width: progress + "%" }}
      ></div>
    </div>
  );
}
