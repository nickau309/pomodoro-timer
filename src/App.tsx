import { createContext, useContext } from "react";
import usePomoTimer from "./hooks/usePomoTimer";
import Root from "./pages/Root";
import type { WorkerMessage } from "./types/workerMessage";

const PomoTimerDispatchContext =
  createContext<React.Dispatch<WorkerMessage> | null>(null);

export default function App() {
  const [pomoTimer, dispatch] = usePomoTimer();

  return (
    <PomoTimerDispatchContext.Provider value={dispatch}>
      {pomoTimer !== null && <Root pomoTimer={pomoTimer} />}
    </PomoTimerDispatchContext.Provider>
  );
}

export function usePomoTimerDispatch() {
  const pomoTimerDispatchContext = useContext(PomoTimerDispatchContext);

  if (pomoTimerDispatchContext === null) {
    throw new Error("usePomoTimerDispatch has to be used within <App />");
  }

  return pomoTimerDispatchContext;
}
