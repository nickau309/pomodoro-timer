import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/20/solid";
import ColorPicker from "./ColorPicker";
import Content from "./Content";
import { classNames } from "../../utils";

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
  const slotButtonRef = useRef(new Map());

  // focus back to the button of choosing color theme
  // after the panel is switched back to content
  useEffect(() => {
    if (!isColorPickerOpen) {
      const node = slotButtonRef.current.get(slot);
      node?.focus();
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
        className="flex gap-1 rounded bg-white/20 px-3 py-2 opacity-90 duration-100 ease-in-out hover:opacity-100 active:translate-y-0.5"
      >
        <Cog8ToothIcon className="h-5 w-5" />
        <span className="hidden select-none text-sm sm:block">Setting</span>
      </button>
      <Transition show={isOpen} as={Fragment}>
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
                !isColorPickerOpen && "pt-24"
              )}
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
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}