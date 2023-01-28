import { ForwardIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function ForwardButton({ handleClick, isTiming }) {
  return (
    <button
      disabled={!isTiming}
      onClick={handleClick}
      className={`absolute top-1/2 right-16 translate-x-1/2 -translate-y-3 ${
        isTiming ? "" : "opacity-0"
      } duration-200 ease-in-out`}
    >
      <ForwardIcon className="h-8 w-8" />
    </button>
  );
}
