import React from "react";
import { ForwardIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils";

export default function ForwardButton({ handleClick, isTiming }) {
  return (
    <button
      disabled={!isTiming}
      onClick={handleClick}
      className={classNames(
        "absolute top-1/2 right-16 translate-x-1/2 -translate-y-3",
        !isTiming && "opacity-0",
        "transition duration-200"
      )}
    >
      <ForwardIcon className="h-8 w-8" />
    </button>
  );
}
