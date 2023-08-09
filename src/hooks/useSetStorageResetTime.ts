import { useEffect } from "react";

export default function useSetStorageResetTime(resetTime: string) {
  useEffect(() => {
    const resetDate = new Date();
    const [hh, mm] = resetTime.split(":");
    resetDate.setHours(parseInt(hh), parseInt(mm), 0, 0);
    if (resetDate <= new Date()) {
      resetDate.setDate(resetDate.getDate() + 1);
    }

    localStorage.setItem("resetTime", JSON.stringify(resetDate));
  }, [resetTime]);
}
