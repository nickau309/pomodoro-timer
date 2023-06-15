import React from "react";
import { SettingProvider } from "./contexts";
import { Root } from "./layouts";

export default function App() {
  return (
    <SettingProvider>
      <Root />
    </SettingProvider>
  );
}
