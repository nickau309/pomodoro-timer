import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/20/solid";
import ColorPicker from "./ColorPicker";
import Content from "./Content";

export default function Setting() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const [slot, setSlot] = useState();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const slotButtonRef = useRef({});

  // focus back to the button of choosing color theme
  // after the panel is switched back to content
  useEffect(() => {
    if (!isColorPickerOpen) {
      slotButtonRef.current[slot]?.focus();
    }
  }, [slot, isColorPickerOpen]);

  const openColorPicker = (value) => {
    setSlot(value);
    setIsColorPickerOpen(true);
  };

  const closeColorPicker = () => {
    setIsColorPickerOpen(false);
  };

  // ColorPicker must place before Content
  // to prevent auto exit of Dialog (due to a single instance that
  // both of two Dialog.Panel has display: none)
  return (
    <>
      <button
        onClick={openDialog}
        className="flex gap-1 rounded bg-white/20 py-2 px-3 opacity-90 duration-100 ease-in-out hover:opacity-100 active:translate-y-0.5"
      >
        <Cog8ToothIcon className="h-5 w-5" />
        <span className="hidden select-none text-sm sm:block">Setting</span>
      </button>
      <Transition
        show={isOpen}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={Fragment}
      >
        <Dialog
          onClose={isColorPickerOpen ? closeColorPicker : closeDialog}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <div
            className={`fixed inset-0 overflow-y-auto p-4${
              isColorPickerOpen ? "" : " pt-24"
            }`}
          >
            <div className="flex min-h-full items-center justify-center">
              <ColorPicker
                closeColorPicker={closeColorPicker}
                isColorPickerOpen={isColorPickerOpen}
                slot={slot}
              />
              <Content
                ref={slotButtonRef}
                closeDialog={closeDialog}
                isColorPickerOpen={isColorPickerOpen}
                openColorPicker={openColorPicker}
              />
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
