import React from "react";

export default function CountResetButton({ count, resetCount, slot }) {
  const handleClick = () => {
    if (confirm("Do you want to refresh the pomodoro count?")) {
      resetCount();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mb-1 opacity-60 duration-100 ease-in-out hover:opacity-80"
    >
      {`${slot === "Pomodoro" ? "" : "Before"} #${count + 1}`}
    </button>
  );
}
