import React from "react";

export default function Item({ children, gap }) {
  return (
    <div
      className={`flex flex-col ${
        gap ? `${gap} ` : ""
      }border-t border-stone-400/20 py-5`}
    >
      {children}
    </div>
  );
}
