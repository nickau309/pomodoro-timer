type ProgressBarProps = {
  duration: number;
  timePass: number;
};

export default function ProgressBar({ duration, timePass }: ProgressBarProps) {
  const progress =
    timePass <= duration
      ? Math.round((timePass / duration) * 1000000) / 10000
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
