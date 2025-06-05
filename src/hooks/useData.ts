import { useMemo } from "react";
import { KEY } from "../constants/data";
import { deserializer, getDefaultPomoTimer } from "../utils/data";
import useLocalStorage from "./useLocalStorage";

export default function useData() {
  const item = useLocalStorage(KEY);

  const pomo = useMemo(() => {
    return deserializer(item) ?? getDefaultPomoTimer();
  }, [item]);

  return pomo;
}
