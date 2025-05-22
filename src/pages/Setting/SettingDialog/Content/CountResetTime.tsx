import { TimeInput } from "../../../../components";
import useResetTime from "../../../../hooks/setting/useResetTime";
import {
  computeResetTime,
  setResetTime,
} from "../../../../utils/setting/resetTime";

export default function CountResetTime() {
  const resetTime = useResetTime();

  const handleChange = (resetTime: string) => {
    const [hh, mm] = resetTime.split(":");

    const date = computeResetTime(parseInt(hh), parseInt(mm));

    setResetTime(date);
  };

  const hour = resetTime.getHours().toString().padStart(2, "0");
  const minute = resetTime.getMinutes().toString().padStart(2, "0");

  const value = `${hour}:${minute}`;

  return (
    <div className="flex items-center justify-between py-5">
      <TimeInput
        label="Count Reset Time"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
