import React from "react";
import { SettingProvider } from "./SettingContext";
import PomodoroTimer from "./components/PomodoroTimer";

export default function App() {
  return (
    <SettingProvider>
      <PomodoroTimer />
    </SettingProvider>
  );
}
