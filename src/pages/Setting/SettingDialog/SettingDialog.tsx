import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSettingDialog, useSettingDialogControl } from "../../../contexts";
import { classNames } from "../../../utils";
import ColorPicker from "./ColorPicker";
import Content from "./Content";
import type { SettingDialogProps } from "./SettingDialog.types";

export default function SettingDialog({ setting }: SettingDialogProps) {
  const { isColorPickerOpen, isOpen } = useSettingDialog();
  const { closeColorPicker, closeDialog } = useSettingDialogControl();

  return (
    <Transition as={Fragment} show={isOpen}>
      <Dialog
        onClose={isColorPickerOpen ? closeColorPicker : closeDialog}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classNames(
              "fixed inset-0 overflow-y-auto p-4",
              !isColorPickerOpen && "pt-24",
            )}
          >
            <div className="flex min-h-full items-center justify-center">
              <Dialog.Panel className="w-full max-w-md rounded-lg bg-white">
                {isColorPickerOpen ? (
                  <ColorPicker theme={setting.theme} />
                ) : (
                  <Content setting={setting} />
                )}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
