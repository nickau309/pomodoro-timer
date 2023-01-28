import React from "react";

export default function Row({ children }) {
  return (
    <div className="relative flex items-center justify-between">{children}</div>
  );
}
