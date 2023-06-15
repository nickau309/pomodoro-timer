import React from "react";

export default function ProgressBar({ initTimeLeft, timeLeft }) {
  const progress =
    timeLeft >= 0
      ? Math.round(((initTimeLeft - timeLeft) / initTimeLeft) * 1000000) / 10000
      : 0;

  return (
    <div
      role="progressbar"
      aria-label="Current Timer Progress"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      className="mb-12 h-px bg-black/10"
    >
      <div
        className="h-[3px] -translate-y-px rounded bg-white"
        style={{ width: progress + "%" }}
      ></div>
    </div>
  );
}
