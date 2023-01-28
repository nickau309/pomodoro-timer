import React from "react";

export default function ColorBox({ color, handleClick, isCurrentColor }) {
  return (
    <button
      onClick={handleClick}
      className={`flex aspect-square items-center justify-center rounded-xl bg-${color} text-white hover:opacity-80 active:opacity-60`}
    >
      {isCurrentColor && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <title>Current color</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      )}
    </button>
  );
}
