/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Slot } from "../../types";
import type {
  SettingDialogControl,
  SettingDialogProviderProps,
  SettingDialogState,
} from "./SettingDialogContext.types";

const SettingDialogContext = createContext<SettingDialogState | null>(null);
const SettingDialogControlContext = createContext<SettingDialogControl | null>(
  null,
);

export function SettingDialogProvider({
  children,
}: SettingDialogProviderProps) {
  const [state, setState] = useState(initialState);

  const closeColorPicker = useCallback(() => {
    setState((s) => ({ ...s, isColorPickerOpen: false }));
  }, []);

  const closeDialog = useCallback(() => {
    setState(initialState);
  }, []);

  const openColorPicker = useCallback((slot: Slot) => {
    setState({ isColorPickerOpen: true, isOpen: true, slot });
  }, []);

  const openDialog = useCallback(() => {
    setState((s) => ({ ...s, isOpen: true }));
  }, []);

  const control = useMemo(
    () => ({ closeColorPicker, closeDialog, openColorPicker, openDialog }),
    [closeColorPicker, closeDialog, openColorPicker, openDialog],
  );

  return (
    <SettingDialogContext.Provider value={state}>
      <SettingDialogControlContext.Provider value={control}>
        {children}
      </SettingDialogControlContext.Provider>
    </SettingDialogContext.Provider>
  );
}

export function useSettingDialog() {
  const settingDialogContext = useContext(SettingDialogContext);

  if (settingDialogContext === null) {
    throw new Error(
      "useSettingDialog has to be used within <SettingDialogProvider />",
    );
  }

  return settingDialogContext;
}

export function useSettingDialogControl() {
  const settingDialogControlContext = useContext(SettingDialogControlContext);

  if (settingDialogControlContext === null) {
    throw new Error(
      "useSettingDialogControl has to be used within <SettingDialogProvider />",
    );
  }

  return settingDialogControlContext;
}

const initialState: SettingDialogState = {
  isColorPickerOpen: false,
  isOpen: false,
  slot: null,
};
