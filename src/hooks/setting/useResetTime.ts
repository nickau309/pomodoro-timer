import { useMemo } from "react";
import { KEY } from "../../constants/setting/resetTime";
import {
  deserializer,
  getDefaultResetTime,
} from "../../utils/setting/resetTime";
import useLocalStorage from "../useLocalStorage";

export default function useResetTime() {
  const item = useLocalStorage(KEY);

  const resetTime = useMemo(() => {
    return deserializer(item) ?? getDefaultResetTime();
  }, [item]);

  return resetTime;
}
