import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useSettingDispatch } from "../../../contexts";
import { classNames } from "../../../utils";

export default function ResetToDefault() {
  const dispatch = useSettingDispatch();

  return (
    <div className="flex items-center justify-between py-5">
      <div className="font-bold text-neutral-600">Reset to Default</div>
      <button
        type="button"
        onClick={() => dispatch({ type: "reset" })}
        className={classNames(
          "flex items-center gap-2 rounded bg-neutral-300/75 px-2.5 py-2 opacity-90 transition duration-100",
          "hover:opacity-100 active:translate-y-0.5"
        )}
      >
        <span className="select-none">Reset</span>
        <ArrowPathIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
