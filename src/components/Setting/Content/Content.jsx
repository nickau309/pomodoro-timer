import React, { forwardRef } from "react";
import { Dialog } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Alarm from "./Alarm";
import ColorTheme from "./ColorTheme";
import CounterDuration from "./CounterDuration";
import HorizontalNumberInput from "./HorizontalNumberInput";
import Item from "./Item";
import Row from "./Row";
import TimeInput from "./TimeInput";
import Toggle from "./Toggle";

const Content = forwardRef(function Content(
  { closeDialog, isColorPickerOpen, openColorPicker, setting, setSetting },
  ref
) {
  return (
    <Dialog.Panel
      className={
        isColorPickerOpen ? "hidden" : "w-full max-w-md rounded-lg bg-white"
      }
    >
      <div className="p-5 pb-0">
        <Dialog.Title className="mb-3 flex justify-between">
          <span className="font-bold uppercase text-neutral-400/80">
            Timer Setting
          </span>
          <button onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="#000"
              className="h-6 w-6 opacity-30 duration-100 ease-in-out hover:opacity-50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Dialog.Title>
        <Item gap="gap-2.5">
          <CounterDuration
            duration={setting.duration}
            setDuration={(duration) => {
              setSetting({
                type: "duration",
                duration,
              });
            }}
          />
        </Item>
        <Item>
          <Row>
            <Toggle
              label="Auto Start Breaks"
              checked={setting.isAutoBreak}
              setChecked={(isAutoBreak) => {
                setSetting({
                  type: "isAutoBreak",
                  isAutoBreak,
                });
              }}
            />
          </Row>
        </Item>
        <Item>
          <Row>
            <Toggle
              label="Auto Start Pomodoros"
              checked={setting.isAutoPomodoro}
              setChecked={(isAutoPomodoro) => {
                setSetting({
                  type: "isAutoPomodoro",
                  isAutoPomodoro,
                });
              }}
            />
          </Row>
        </Item>
        <Item>
          <Row>
            <HorizontalNumberInput
              label="Long Break Interval"
              value={setting.longBreakInterval}
              setValue={(longBreakInterval) => {
                setSetting({
                  type: "longBreakInterval",
                  longBreakInterval,
                });
              }}
            />
          </Row>
        </Item>
        <Item gap="gap-6">
          <Alarm
            alarm={setting.alarm}
            setAlarm={(alarm) => {
              setSetting({
                type: "alarm",
                alarm,
              });
            }}
          />
        </Item>
        <Item>
          <ColorTheme
            ref={ref}
            color={setting.color}
            openColorPicker={openColorPicker}
          />
        </Item>
        <Item>
          <Row>
            <TimeInput
              label="Pomodoro Count Reset Time"
              resetTime={setting.resetTime}
              setResetTime={(resetTime) => {
                setSetting({
                  type: "resetTime",
                  resetTime,
                });
              }}
            />
          </Row>
        </Item>
        <Item>
          <Row>
            <div className="font-bold text-neutral-600">Reset to Default</div>
            <button
              type="button"
              onClick={() => {
                setSetting({ type: "reset" });
              }}
              className="flex items-center gap-2 rounded bg-neutral-300/75 px-2.5 py-2 opacity-90 duration-100 ease-in-out hover:opacity-100 active:translate-y-0.5"
            >
              <span className="select-none">Reset</span>
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          </Row>
        </Item>
      </div>
      <div className="rounded-b-lg bg-neutral-200/60 px-5 py-3.5 text-right">
        <button
          type="button"
          onClick={closeDialog}
          className="select-none rounded bg-neutral-800 px-6 py-2 text-sm text-white opacity-90 shadow-[0_2px_2px_rgb(0,0,0,0.2)] duration-100 ease-in-out hover:opacity-100 active:translate-y-0.5 active:shadow-none"
        >
          OK
        </button>
      </div>
    </Dialog.Panel>
  );
});

export default Content;
