import { PomoTimerProvider } from "./contexts";
import { Root } from "./pages";

export default function App() {
  return (
    <PomoTimerProvider>
      <Root />
    </PomoTimerProvider>
  );
}
