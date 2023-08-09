import { PomoTimerProvider } from "./contexts";
import { Root } from "./layouts";

export default function App() {
  return (
    <PomoTimerProvider>
      <Root />
    </PomoTimerProvider>
  );
}
