import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ALARM_NAME, COLOR, SLOT } from "./constants";
import App from "./App";
import type { AlarmName, Color, Slot } from "./types";

type UserEvent = ReturnType<typeof userEvent.setup>;

const CHEER_PARAGRAPH_PATTERN = /^Time (to focus|for a break)!$/;

const COUNT_BUTTON_PATTERN = /^(Before )?#\d+$/;

const TIMER_PATTERN = /^((\d\d|1(0|1)\d):[0-5]\d|120:00)$/;

type ActionWithSlot = {
  type: "CLICK_COLOR_PICKER_DIALOG" | "CLICK_SLOT_RADIO" | "CLICK_THEME_BUTTON";
  slot: Slot;
};

type Action =
  | { type: "CLICK_ALARM_SOUND_BUTTON" }
  | { type: "CLICK_AUTO_START_BREAKS_TOGGLE" }
  | { type: "CLICK_AUTO_START_POMODOROS_TOGGLE" }
  | { type: "CLICK_CLOSE_BUTTON" }
  | { type: "CLICK_COLOR_BUTTON"; color: Color }
  | { type: "CLICK_COUNT_BUTTON" }
  | { type: "CLICK_FORWARD_BUTTON" }
  | { type: "CLICK_OK_BUTTON" }
  | { type: "CLICK_RESET_BUTTON" }
  | { type: "CLICK_SETTING_BUTTON" }
  | { type: "CLICK_START_BUTTON" }
  | { type: "CLICK_STOP_BUTTON" }
  | { type: "SELECT_ALARM_SOUND_OPTION"; name: AlarmName }
  | { type: "SET_ALARM_REPEAT"; repeat: number }
  | { type: "SET_ALARM_VOLUME"; volume: number }
  | { type: "SET_COUNT_RESET_TIME"; time: string }
  | { type: "SET_DURATION"; slot: Slot; value: number }
  | { type: "SET_LONG_BREAK_INTERVAL"; value: number }
  | ActionWithSlot;

async function perform(user: UserEvent, action: Action) {
  switch (action.type) {
    case "CLICK_ALARM_SOUND_BUTTON": {
      const button = screen.getByRole("button", { name: /Alarm Sound/ });
      await user.click(button);
      break;
    }
    case "CLICK_AUTO_START_BREAKS_TOGGLE": {
      const toggle = screen.getByRole("switch", { name: "Auto Start Breaks" });
      await user.click(toggle);
      break;
    }
    case "CLICK_AUTO_START_POMODOROS_TOGGLE": {
      const toggle = screen.getByRole("switch", {
        name: "Auto Start Pomodoros",
      });
      await user.click(toggle);
      break;
    }
    case "CLICK_CLOSE_BUTTON": {
      const button = screen.getByRole("button", { name: "Close" });
      await user.click(button);
      break;
    }
    case "CLICK_COLOR_BUTTON": {
      const button = screen.getByRole("button", { name: action.color });
      await user.click(button);
      break;
    }
    case "CLICK_COLOR_PICKER_DIALOG": {
      const dialog = screen.getByRole("dialog", {
        name: `Pick a color for ${action.slot}`,
      });
      await user.click(dialog);
      break;
    }
    case "CLICK_COUNT_BUTTON": {
      const button = screen.getByRole("button", { name: COUNT_BUTTON_PATTERN });
      await user.click(button);
      break;
    }
    case "CLICK_SLOT_RADIO": {
      const slotRadio = screen.getByRole("radio", { name: action.slot });
      await user.click(slotRadio);
      break;
    }
    case "CLICK_FORWARD_BUTTON": {
      const button = screen.getByRole("button", { name: "Finish a slot" });
      await user.click(button);
      break;
    }
    case "CLICK_OK_BUTTON": {
      const button = screen.getByRole("button", { name: "OK" });
      await user.click(button);
      break;
    }
    case "CLICK_RESET_BUTTON": {
      const button = screen.getByRole("button", { name: "Reset" });
      await user.click(button);
      break;
    }
    case "CLICK_SETTING_BUTTON": {
      const button = screen.getByRole("button", { name: "Setting" });
      await user.click(button);
      break;
    }
    case "CLICK_START_BUTTON": {
      const button = screen.getByRole("button", { name: "Start" });
      await user.click(button);
      break;
    }
    case "CLICK_STOP_BUTTON": {
      const button = screen.getByRole("button", { name: "Stop" });
      await user.click(button);
      break;
    }
    case "CLICK_THEME_BUTTON": {
      const button = screen.getByRole("button", { name: action.slot });
      await user.click(button);
      break;
    }
    case "SELECT_ALARM_SOUND_OPTION": {
      const listbox = screen.getByRole("listbox", { name: "Alarm Sound" });
      await user.selectOptions(listbox, action.name);
      break;
    }
    case "SET_ALARM_REPEAT": {
      const input = screen.getByRole("spinbutton", { name: "repeat" });
      await user.tripleClick(input);
      await user.keyboard(String(action.repeat));
      await user.tab();
      break;
    }
    case "SET_ALARM_VOLUME": {
      const slider = screen.getByRole("slider", { name: "volume" });
      fireEvent.change(slider, { target: { value: action.volume } });
      break;
    }
    case "SET_COUNT_RESET_TIME": {
      const input = screen.getByLabelText("Count Reset Time");
      fireEvent.change(input, { target: { value: action.time } });
      break;
    }
    case "SET_DURATION": {
      const input = screen.getByRole("spinbutton", { name: action.slot });
      await user.tripleClick(input);
      await user.keyboard(String(action.value));
      await user.tab();
      break;
    }
    case "SET_LONG_BREAK_INTERVAL": {
      const input = screen.getByRole("spinbutton", {
        name: "Long Break Interval",
      });
      await user.tripleClick(input);
      await user.keyboard(String(action.value));
      await user.tab();
      break;
    }
  }
}

function getCheerParagraphPattern(slot: Slot) {
  return slot === "Pomodoro" ? "Time to focus!" : "Time for a break!";
}

function getCountButtonPattern(slot: Slot, count: number) {
  return new RegExp(slot === "Pomodoro" ? `^#${count}$` : `^Before #${count}$`);
}

function getDuration(slot: Slot) {
  const input = screen.getByRole("spinbutton", { name: slot });
  return (input as HTMLInputElement).value;
}

function getLongBreakInterval() {
  const input = screen.getByRole("spinbutton", { name: "Long Break Interval" });
  return (input as HTMLInputElement).valueAsNumber;
}

function getThemeColor(slot: Slot) {
  const themeButton = screen.getByRole("button", { name: slot });
  return themeButton.textContent;
}

function getTimerPattern(minute: string) {
  return new RegExp(`^${minute.padStart(2, "0")}:00$`);
}

describe("App", () => {
  beforeAll(() => {
    const _jest = globalThis.jest;
    globalThis.jest = {
      ...globalThis.jest,
      advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
    };
    return () => void (globalThis.jest = _jest);
  });

  beforeEach(() => {
    const ResizeObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.runOnlyPendingTimers();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    window.localStorage.clear();
  });

  it("should render", () => {
    render(<App />);

    const slot = "Pomodoro";

    const layout = screen.getByTestId("layout");
    expect(layout).toBeInTheDocument();
    expect(layout).toHaveClass("bg-pomo1");

    const heading = screen.getByRole("heading", { name: "Pomodoro Timer" });
    expect(heading).toBeInTheDocument();

    const settingButton = screen.getByRole("button", { name: "Setting" });
    expect(settingButton).toBeInTheDocument();

    const progressBar = screen.getByRole("progressbar", {
      name: "Current Timer Progress",
    });
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");

    const slotSelection = screen.getByRole("radiogroup", {
      name: "Select Slot",
    });
    expect(slotSelection).toBeInTheDocument();

    const slotRadios = screen.getAllByRole("radio");
    expect(slotRadios).toHaveLength(3);

    for (const name of SLOT) {
      const slotRadio = screen.getByRole("radio", { name });
      expect(slotRadio).toBeInTheDocument();
    }

    const slotRadio = screen.getByRole("radio", { name: slot });
    expect(slotRadio).toBeChecked();

    for (const name of SLOT.slice(1)) {
      const slotRadio = screen.getByRole("radio", { name });
      expect(slotRadio).not.toBeChecked();
    }

    const timer = screen.getByText(TIMER_PATTERN);
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent(getTimerPattern("25"));

    const startButton = screen.getByRole("button", { name: "Start" });
    expect(startButton).toBeInTheDocument();

    const stopButton = screen.queryByRole("button", { name: "Stop" });
    expect(stopButton).not.toBeInTheDocument();

    const forwardButton = screen.getByRole("button", { name: "Finish a slot" });
    expect(forwardButton).toBeInTheDocument();
    expect(forwardButton).toBeDisabled();

    const countButton = screen.getByRole("button", {
      name: COUNT_BUTTON_PATTERN,
    });
    expect(countButton).toBeInTheDocument();
    expect(countButton).toHaveTextContent(getCountButtonPattern(slot, 1));

    const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(getCheerParagraphPattern(slot));
  });

  describe("When current slot radio is clicked", () => {
    beforeEach(() => {
      vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
    });

    describe("When timer is running", () => {
      it("should display a confirm dialog", async () => {
        const confirmSpy = vi.spyOn(window, "confirm");
        const user = userEvent.setup();
        render(<App />);

        const slot = "Pomodoro";
        await perform(user, { type: "CLICK_START_BUTTON" });
        await perform(user, { type: "CLICK_SLOT_RADIO", slot });

        expect(confirmSpy).toHaveBeenCalled();
      });

      it("should update the screen correctly if user confirms the dialog", async () => {
        vi.spyOn(window, "confirm").mockImplementation(() => true);
        const user = userEvent.setup();
        render(<App />);

        const slot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        const minute = getDuration(slot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(2000);
        await perform(user, { type: "CLICK_SLOT_RADIO", slot });

        const progressBar = screen.getByRole("progressbar", {
          name: "Current Timer Progress",
        });
        expect(progressBar).toHaveAttribute("aria-valuenow", "0");

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).toHaveTextContent(getTimerPattern(minute));

        const startButton = screen.getByRole("button", { name: "Start" });
        expect(startButton).toBeInTheDocument();

        const stopButton = screen.queryByRole("button", { name: "Stop" });
        expect(stopButton).not.toBeInTheDocument();

        const forwardButton = screen.getByRole("button", {
          name: "Finish a slot",
        });
        expect(forwardButton).toBeDisabled();
      });

      it("should do nothing if user cancels the dialog", async () => {
        vi.spyOn(window, "confirm").mockImplementation(() => false);
        const user = userEvent.setup();
        render(<App />);

        const slot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        const minute = getDuration(slot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(2000);
        await perform(user, { type: "CLICK_SLOT_RADIO", slot });

        const progressBar = screen.getByRole("progressbar", {
          name: "Current Timer Progress",
        });
        expect(progressBar).not.toHaveAttribute("aria-valuenow", "0");

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).not.toHaveTextContent(getTimerPattern(minute));

        const startButton = screen.queryByRole("button", { name: "Start" });
        expect(startButton).not.toBeInTheDocument();

        const stopButton = screen.getByRole("button", { name: "Stop" });
        expect(stopButton).toBeInTheDocument();

        const forwardButton = screen.getByRole("button", {
          name: "Finish a slot",
        });
        expect(forwardButton).toBeEnabled();
      });
    });

    describe("When timer is NOT running", () => {
      it("should update the screen correctly", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        const minute = getDuration(slot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(2000);
        await perform(user, { type: "CLICK_STOP_BUTTON" });
        await perform(user, { type: "CLICK_SLOT_RADIO", slot });

        const progressBar = screen.getByRole("progressbar", {
          name: "Current Timer Progress",
        });
        expect(progressBar).toHaveAttribute("aria-valuenow", "0");

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).toHaveTextContent(getTimerPattern(minute));
      });
    });
  });

  describe("When another slot radio is selected", () => {
    describe("When timer is running", () => {
      beforeEach(() => {
        vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
      });

      it("should display a confirm dialog", async () => {
        const confirmSpy = vi
          .spyOn(window, "confirm")
          .mockImplementation(() => true);
        const user = userEvent.setup();
        render(<App />);

        for (const slot of SLOT.slice().reverse()) {
          await perform(user, { type: "CLICK_START_BUTTON" });
          await perform(user, { type: "CLICK_SLOT_RADIO", slot });

          expect(confirmSpy).toHaveBeenCalled();
        }
      });

      it("should update the screen correctly if user confirms the dialog", async () => {
        vi.spyOn(window, "confirm").mockImplementation(() => true);
        const user = userEvent.setup();
        render(<App />);

        for (const slot of SLOT.slice().reverse()) {
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          const minute = getDuration(slot);
          const color = getThemeColor(slot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          await perform(user, { type: "CLICK_START_BUTTON" });
          await vi.advanceTimersByTimeAsync(2000);
          await perform(user, { type: "CLICK_SLOT_RADIO", slot });

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio = screen.getByRole("radio", { name: slot });
          expect(slotRadio).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.getByRole("button", { name: "Start" });
          expect(startButton).toBeInTheDocument();

          const stopButton = screen.queryByRole("button", { name: "Stop" });
          expect(stopButton).not.toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeDisabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(getCountButtonPattern(slot, 1));

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(getCheerParagraphPattern(slot));
        }
      });

      it("should do nothing if user cancels the dialog", async () => {
        vi.spyOn(window, "confirm").mockImplementation(() => false);
        const user = userEvent.setup();
        render(<App />);

        const prevSlot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        const minute = getDuration(prevSlot);
        const color = getThemeColor(prevSlot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(2000);

        for (const nextSlot of SLOT.slice(1)) {
          await perform(user, { type: "CLICK_SLOT_RADIO", slot: nextSlot });

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).not.toHaveAttribute("aria-valuenow", "0");

          const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
          expect(slotRadio1).toBeChecked();

          const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
          expect(slotRadio2).not.toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).not.toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.queryByRole("button", { name: "Start" });
          expect(startButton).not.toBeInTheDocument();

          const stopButton = screen.getByRole("button", { name: "Stop" });
          expect(stopButton).toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeEnabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(
            getCountButtonPattern(prevSlot, 1),
          );

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(
            getCheerParagraphPattern(prevSlot),
          );
        }
      });
    });

    describe("When timer is NOT running", () => {
      it("should update the screen correctly", async () => {
        const user = userEvent.setup();
        render(<App />);

        for (const slot of SLOT.slice().reverse()) {
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          const minute = getDuration(slot);
          const color = getThemeColor(slot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          await perform(user, { type: "CLICK_SLOT_RADIO", slot });

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio = screen.getByRole("radio", { name: slot });
          expect(slotRadio).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const button = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(button).toHaveTextContent(getCountButtonPattern(slot, 1));

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(getCheerParagraphPattern(slot));
        }
      });
    });
  });

  describe("When Start Button is clicked", () => {
    it("should play audio", async () => {
      const audioPlaySpy = vi
        .spyOn(window.HTMLAudioElement.prototype, "play")
        .mockResolvedValue();
      const user = userEvent.setup();
      render(<App />);

      await perform(user, { type: "CLICK_START_BUTTON" });

      expect(audioPlaySpy).toHaveBeenCalled();
    });

    it("should update the screen correctly", async () => {
      vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
      const user = userEvent.setup();
      render(<App />);

      await perform(user, { type: "CLICK_START_BUTTON" });
      await vi.advanceTimersByTimeAsync(20000);

      const progressBar = screen.getByRole("progressbar", {
        name: "Current Timer Progress",
      });
      expect(progressBar).not.toHaveAttribute("aria-valuenow", "0");

      const timer = screen.getByText(TIMER_PATTERN);
      expect(timer).not.toHaveTextContent(getTimerPattern("25"));

      const startButton = screen.queryByRole("button", { name: "Start" });
      expect(startButton).not.toBeInTheDocument();

      const stopButton = screen.getByRole("button", { name: "Stop" });
      expect(stopButton).toBeInTheDocument();

      const forwardButton = screen.getByRole("button", {
        name: "Finish a slot",
      });
      expect(forwardButton).toBeEnabled();
    });

    describe("When 'Pomodoro' slot is checked & time ran out", () => {
      it("should play audio", async () => {
        const audioPlaySpy = vi
          .spyOn(window.HTMLAudioElement.prototype, "play")
          .mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, {
          type: "SET_DURATION",
          slot: "Pomodoro",
          value: 1,
        });
        await perform(user, { type: "CLICK_AUTO_START_BREAKS_TOGGLE" });
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_START_BUTTON" });
        audioPlaySpy.mockClear();
        await vi.advanceTimersByTimeAsync(62000);

        expect(audioPlaySpy).toHaveBeenCalled();
      }, 20000);

      it("should update the screen correctly if Auto Start Breaks Toggle is checked", async () => {
        vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        const prevSlot = "Pomodoro";
        const nextSlot = "Short Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "SET_DURATION", slot: prevSlot, value: 1 });
        await perform(user, { type: "CLICK_AUTO_START_BREAKS_TOGGLE" });
        const minute = getDuration(nextSlot);
        const color = getThemeColor(nextSlot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(62000);

        const layout = screen.getByTestId("layout");
        expect(layout).toHaveClass(`bg-${color}`);

        const progressBar = screen.getByRole("progressbar", {
          name: "Current Timer Progress",
        });
        expect(progressBar).not.toHaveAttribute("aria-valuenow", "0");

        const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
        expect(slotRadio1).not.toBeChecked();

        const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
        expect(slotRadio2).toBeChecked();

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).not.toHaveTextContent(getTimerPattern(minute));

        const startButton = screen.queryByRole("button", { name: "Start" });
        expect(startButton).not.toBeInTheDocument();

        const stopButton = screen.getByRole("button", { name: "Stop" });
        expect(stopButton).toBeInTheDocument();

        const forwardButton = screen.getByRole("button", {
          name: "Finish a slot",
        });
        expect(forwardButton).toBeEnabled();

        const countButton = screen.getByRole("button", {
          name: COUNT_BUTTON_PATTERN,
        });
        expect(countButton).toHaveTextContent(
          getCountButtonPattern(nextSlot, 2),
        );

        const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
        expect(paragraph).toHaveTextContent(getCheerParagraphPattern(nextSlot));
      }, 10000);

      it("should update the screen correctly if Auto Start Breaks Toggle is NOT checked", async () => {
        vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        const prevSlot = "Pomodoro";
        const nextSlot = "Short Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "SET_DURATION", slot: prevSlot, value: 1 });
        const minute = getDuration(nextSlot);
        const color = getThemeColor(nextSlot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(62000);

        const layout = screen.getByTestId("layout");
        expect(layout).toHaveClass(`bg-${color}`);

        const progressBar = screen.getByRole("progressbar", {
          name: "Current Timer Progress",
        });
        expect(progressBar).toHaveAttribute("aria-valuenow", "0");

        const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
        expect(slotRadio1).not.toBeChecked();

        const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
        expect(slotRadio2).toBeChecked();

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).toHaveTextContent(getTimerPattern(minute));

        const startButton = screen.getByRole("button", { name: "Start" });
        expect(startButton).toBeInTheDocument();

        const stopButton = screen.queryByRole("button", { name: "Stop" });
        expect(stopButton).not.toBeInTheDocument();

        const forwardButton = screen.getByRole("button", {
          name: "Finish a slot",
        });
        expect(forwardButton).toBeDisabled();

        const countButton = screen.getByRole("button", {
          name: COUNT_BUTTON_PATTERN,
        });
        expect(countButton).toHaveTextContent(
          getCountButtonPattern(nextSlot, 2),
        );

        const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
        expect(paragraph).toHaveTextContent(getCheerParagraphPattern(nextSlot));
      }, 10000);
    });

    describe("When 'Short Break' slot is checked & time ran out", () => {
      it("should play audio", async () => {
        const audioPlaySpy = vi
          .spyOn(window.HTMLAudioElement.prototype, "play")
          .mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        const slot = "Short Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "SET_DURATION", slot, value: 1 });
        await perform(user, { type: "CLICK_AUTO_START_BREAKS_TOGGLE" });
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_SLOT_RADIO", slot });
        await perform(user, { type: "CLICK_START_BUTTON" });
        audioPlaySpy.mockClear();
        await vi.advanceTimersByTimeAsync(62000);

        expect(audioPlaySpy).toHaveBeenCalled();
      }, 10000);

      it("should update the screen correctly if Auto Start Pomodoros Toggle is checked", async () => {
        vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        const prevSlot = "Short Break";
        const nextSlot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "SET_DURATION", slot: prevSlot, value: 1 });
        await perform(user, { type: "CLICK_AUTO_START_POMODOROS_TOGGLE" });
        const minute = getDuration(nextSlot);
        const color = getThemeColor(nextSlot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_SLOT_RADIO", slot: prevSlot });
        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(62000);

        const layout = screen.getByTestId("layout");
        expect(layout).toHaveClass(`bg-${color}`);

        const progressBar = screen.getByRole("progressbar", {
          name: "Current Timer Progress",
        });
        expect(progressBar).not.toHaveAttribute("aria-valuenow", "0");

        const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
        expect(slotRadio1).not.toBeChecked();

        const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
        expect(slotRadio2).toBeChecked();

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).not.toHaveTextContent(getTimerPattern(minute));

        const startButton = screen.queryByRole("button", { name: "Start" });
        expect(startButton).not.toBeInTheDocument();

        const stopButton = screen.getByRole("button", { name: "Stop" });
        expect(stopButton).toBeInTheDocument();

        const forwardButton = screen.getByRole("button", {
          name: "Finish a slot",
        });
        expect(forwardButton).toBeEnabled();

        const countButton = screen.getByRole("button", {
          name: COUNT_BUTTON_PATTERN,
        });
        expect(countButton).toHaveTextContent(
          getCountButtonPattern(nextSlot, 1),
        );

        const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
        expect(paragraph).toHaveTextContent(getCheerParagraphPattern(nextSlot));
      }, 10000);

      it("should update the screen correctly if Auto Start Pomodoros Toggle is NOT checked", async () => {
        vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        const prevSlot = "Short Break";
        const nextSlot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "SET_DURATION", slot: prevSlot, value: 1 });
        const minute = getDuration(nextSlot);
        const color = getThemeColor(nextSlot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_SLOT_RADIO", slot: prevSlot });
        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(62000);

        const layout = screen.getByTestId("layout");
        expect(layout).toHaveClass(`bg-${color}`);

        const progressBar = screen.getByRole("progressbar", {
          name: "Current Timer Progress",
        });
        expect(progressBar).toHaveAttribute("aria-valuenow", "0");

        const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
        expect(slotRadio1).not.toBeChecked();

        const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
        expect(slotRadio2).toBeChecked();

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).toHaveTextContent(getTimerPattern(minute));

        const startButton = screen.getByRole("button", { name: "Start" });
        expect(startButton).toBeInTheDocument();

        const stopButton = screen.queryByRole("button", { name: "Stop" });
        expect(stopButton).not.toBeInTheDocument();

        const forwardButton = screen.getByRole("button", {
          name: "Finish a slot",
        });
        expect(forwardButton).toBeDisabled();

        const countButton = screen.getByRole("button", {
          name: COUNT_BUTTON_PATTERN,
        });
        expect(countButton).toHaveTextContent(
          getCountButtonPattern(nextSlot, 1),
        );

        const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
        expect(paragraph).toHaveTextContent(getCheerParagraphPattern(nextSlot));
      }, 10000);
    });

    describe("When 'Long Break' slot is checked & time ran out", () => {
      it("should play audio", async () => {
        const audioPlaySpy = vi
          .spyOn(window.HTMLAudioElement.prototype, "play")
          .mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        const slot = "Long Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "SET_DURATION", slot, value: 1 });
        await perform(user, { type: "CLICK_AUTO_START_BREAKS_TOGGLE" });
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_SLOT_RADIO", slot });
        await perform(user, { type: "CLICK_START_BUTTON" });
        audioPlaySpy.mockClear();
        await vi.advanceTimersByTimeAsync(62000);

        expect(audioPlaySpy).toHaveBeenCalled();
      }, 10000);

      it("should update the screen correctly if Auto Start Pomodoros Toggle is checked", async () => {
        vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        const prevSlot = "Long Break";
        const nextSlot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "SET_DURATION", slot: prevSlot, value: 1 });
        await perform(user, { type: "CLICK_AUTO_START_POMODOROS_TOGGLE" });
        const minute = getDuration(nextSlot);
        const color = getThemeColor(nextSlot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_SLOT_RADIO", slot: prevSlot });
        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(62000);

        const layout = screen.getByTestId("layout");
        expect(layout).toHaveClass(`bg-${color}`);

        const progressBar = screen.getByRole("progressbar", {
          name: "Current Timer Progress",
        });
        expect(progressBar).not.toHaveAttribute("aria-valuenow", "0");

        const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
        expect(slotRadio1).not.toBeChecked();

        const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
        expect(slotRadio2).toBeChecked();

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).not.toHaveTextContent(getTimerPattern(minute));

        const startButton = screen.queryByRole("button", { name: "Start" });
        expect(startButton).not.toBeInTheDocument();

        const stopButton = screen.getByRole("button", { name: "Stop" });
        expect(stopButton).toBeInTheDocument();

        const forwardButton = screen.getByRole("button", {
          name: "Finish a slot",
        });
        expect(forwardButton).toBeEnabled();

        const countButton = screen.getByRole("button", {
          name: COUNT_BUTTON_PATTERN,
        });
        expect(countButton).toHaveTextContent(
          getCountButtonPattern(nextSlot, 1),
        );

        const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
        expect(paragraph).toHaveTextContent(getCheerParagraphPattern(nextSlot));
      }, 10000);

      it("should update the screen correctly if Auto Start Pomodoros Toggle is NOT checked", async () => {
        vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        const prevSlot = "Long Break";
        const nextSlot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "SET_DURATION", slot: prevSlot, value: 1 });
        const minute = getDuration(nextSlot);
        const color = getThemeColor(nextSlot);
        await perform(user, { type: "CLICK_CLOSE_BUTTON" });

        await perform(user, { type: "CLICK_SLOT_RADIO", slot: prevSlot });
        await perform(user, { type: "CLICK_START_BUTTON" });
        await vi.advanceTimersByTimeAsync(62000);

        const layout = screen.getByTestId("layout");
        expect(layout).toHaveClass(`bg-${color}`);

        const progressBar = screen.getByRole("progressbar", {
          name: "Current Timer Progress",
        });
        expect(progressBar).toHaveAttribute("aria-valuenow", "0");

        const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
        expect(slotRadio1).not.toBeChecked();

        const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
        expect(slotRadio2).toBeChecked();

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).toHaveTextContent(getTimerPattern(minute));

        const startButton = screen.getByRole("button", { name: "Start" });
        expect(startButton).toBeInTheDocument();

        const stopButton = screen.queryByRole("button", { name: "Stop" });
        expect(stopButton).not.toBeInTheDocument();

        const forwardButton = screen.getByRole("button", {
          name: "Finish a slot",
        });
        expect(forwardButton).toBeDisabled();

        const countButton = screen.getByRole("button", {
          name: COUNT_BUTTON_PATTERN,
        });
        expect(countButton).toHaveTextContent(
          getCountButtonPattern(nextSlot, 1),
        );

        const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
        expect(paragraph).toHaveTextContent(getCheerParagraphPattern(nextSlot));
      }, 10000);
    });
  });

  it("should update the screen correctly after clicking Stop Button", async () => {
    vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
    const user = userEvent.setup();
    render(<App />);

    await perform(user, { type: "CLICK_START_BUTTON" });
    await perform(user, { type: "CLICK_STOP_BUTTON" });

    const startButton = screen.getByRole("button", { name: "Start" });
    expect(startButton).toBeInTheDocument();

    const stopButton = screen.queryByRole("button", { name: "Stop" });
    expect(stopButton).not.toBeInTheDocument();

    const forwardButton = screen.getByRole("button", { name: "Finish a slot" });
    expect(forwardButton).toBeDisabled();
  });

  describe("When Forward Button is clicked", () => {
    beforeEach(() => {
      vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
    });

    describe("When 'Pomodoro' slot is checked", () => {
      describe("When Auto Start Pomodoros Toggle is checked", () => {
        it("should update the screen correctly if nextCount % longBreakInterval === 0", async () => {
          const user = userEvent.setup();
          render(<App />);

          const prevSlot = "Pomodoro";
          const nextSlot = "Long Break";
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          await perform(user, { type: "CLICK_AUTO_START_BREAKS_TOGGLE" });
          await perform(user, { type: "SET_LONG_BREAK_INTERVAL", value: 1 });
          const minute = getDuration(nextSlot);
          const longBreakInterval = getLongBreakInterval();
          const color = getThemeColor(nextSlot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          const count = 1;
          expect(count % longBreakInterval).toBe(0);

          await perform(user, { type: "CLICK_START_BUTTON" });
          await vi.advanceTimersByTimeAsync(2000);
          await perform(user, { type: "CLICK_FORWARD_BUTTON" });
          await vi.advanceTimersByTimeAsync(1000);

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
          expect(slotRadio1).not.toBeChecked();

          const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
          expect(slotRadio2).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.queryByRole("button", { name: "Start" });
          expect(startButton).not.toBeInTheDocument();

          const stopButton = screen.getByRole("button", { name: "Stop" });
          expect(stopButton).toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeEnabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(
            getCountButtonPattern(nextSlot, 2),
          );

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(
            getCheerParagraphPattern(nextSlot),
          );
        });

        it("should update the screen correctly if nextCount % longBreakInterval !== 0", async () => {
          const user = userEvent.setup();
          render(<App />);

          const prevSlot = "Pomodoro";
          const nextSlot = "Short Break";
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          await perform(user, { type: "CLICK_AUTO_START_BREAKS_TOGGLE" });
          const minute = getDuration(nextSlot);
          const longBreakInterval = getLongBreakInterval();
          const color = getThemeColor(nextSlot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          const count = 1;
          expect(count % longBreakInterval).not.toBe(0);

          await perform(user, { type: "CLICK_START_BUTTON" });
          await vi.advanceTimersByTimeAsync(2000);
          await perform(user, { type: "CLICK_FORWARD_BUTTON" });
          await vi.advanceTimersByTimeAsync(1000);

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
          expect(slotRadio1).not.toBeChecked();

          const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
          expect(slotRadio2).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.queryByRole("button", { name: "Start" });
          expect(startButton).not.toBeInTheDocument();

          const stopButton = screen.getByRole("button", { name: "Stop" });
          expect(stopButton).toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeEnabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(
            getCountButtonPattern(nextSlot, 2),
          );

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(
            getCheerParagraphPattern(nextSlot),
          );
        });
      });

      describe("When Auto Start Pomodoros Toggle is NOT checked", () => {
        it("should update the screen correctly if nextCount % longBreakInterval === 0", async () => {
          const user = userEvent.setup();
          render(<App />);

          const prevSlot = "Pomodoro";
          const nextSlot = "Long Break";
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          await perform(user, { type: "SET_LONG_BREAK_INTERVAL", value: 1 });
          const minute = getDuration(nextSlot);
          const longBreakInterval = getLongBreakInterval();
          const color = getThemeColor(nextSlot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          const count = 1;
          expect(count % longBreakInterval).toBe(0);

          await perform(user, { type: "CLICK_START_BUTTON" });
          await vi.advanceTimersByTimeAsync(2000);
          await perform(user, { type: "CLICK_FORWARD_BUTTON" });
          await vi.advanceTimersByTimeAsync(1000);

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
          expect(slotRadio1).not.toBeChecked();

          const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
          expect(slotRadio2).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.getByRole("button", { name: "Start" });
          expect(startButton).toBeInTheDocument();

          const stopButton = screen.queryByRole("button", { name: "Stop" });
          expect(stopButton).not.toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeDisabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(
            getCountButtonPattern(nextSlot, 2),
          );

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(
            getCheerParagraphPattern(nextSlot),
          );
        });

        it("should update the screen correctly if nextCount % longBreakInterval !== 0", async () => {
          const user = userEvent.setup();
          render(<App />);

          const prevSlot = "Pomodoro";
          const nextSlot = "Short Break";
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          const minute = getDuration(nextSlot);
          const longBreakInterval = getLongBreakInterval();
          const color = getThemeColor(nextSlot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          const count = 1;
          expect(count % longBreakInterval).not.toBe(0);

          await perform(user, { type: "CLICK_START_BUTTON" });
          await vi.advanceTimersByTimeAsync(2000);
          await perform(user, { type: "CLICK_FORWARD_BUTTON" });
          await vi.advanceTimersByTimeAsync(1000);

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
          expect(slotRadio1).not.toBeChecked();

          const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
          expect(slotRadio2).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.getByRole("button", { name: "Start" });
          expect(startButton).toBeInTheDocument();

          const stopButton = screen.queryByRole("button", { name: "Stop" });
          expect(stopButton).not.toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeDisabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(
            getCountButtonPattern(nextSlot, 2),
          );

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(
            getCheerParagraphPattern(nextSlot),
          );
        });
      });
    });

    describe("When 'Short Break' slot is checked", () => {
      describe("When Auto Start Pomodoros Toggle is checked", () => {
        it("should update the screen correctly", async () => {
          const user = userEvent.setup();
          render(<App />);

          const prevSlot = "Short Break";
          const nextSlot = "Pomodoro";
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          await perform(user, { type: "CLICK_AUTO_START_POMODOROS_TOGGLE" });
          const minute = getDuration(nextSlot);
          const color = getThemeColor(nextSlot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          await perform(user, { type: "CLICK_SLOT_RADIO", slot: prevSlot });
          await perform(user, { type: "CLICK_START_BUTTON" });
          await vi.advanceTimersByTimeAsync(2000);
          await perform(user, { type: "CLICK_FORWARD_BUTTON" });
          await vi.advanceTimersByTimeAsync(1000);

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
          expect(slotRadio1).not.toBeChecked();

          const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
          expect(slotRadio2).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.queryByRole("button", { name: "Start" });
          expect(startButton).not.toBeInTheDocument();

          const stopButton = screen.getByRole("button", { name: "Stop" });
          expect(stopButton).toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeEnabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(
            getCountButtonPattern(nextSlot, 1),
          );

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(
            getCheerParagraphPattern(nextSlot),
          );
        });
      });

      describe("When Auto Start Pomodoros Toggle is NOT checked", () => {
        it("should update the screen correctly", async () => {
          const user = userEvent.setup();
          render(<App />);

          const prevSlot = "Short Break";
          const nextSlot = "Pomodoro";
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          const minute = getDuration(nextSlot);
          const color = getThemeColor(nextSlot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          await perform(user, { type: "CLICK_SLOT_RADIO", slot: prevSlot });
          await perform(user, { type: "CLICK_START_BUTTON" });
          await vi.advanceTimersByTimeAsync(2000);
          await perform(user, { type: "CLICK_FORWARD_BUTTON" });
          await vi.advanceTimersByTimeAsync(1000);

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
          expect(slotRadio1).not.toBeChecked();

          const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
          expect(slotRadio2).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.getByRole("button", { name: "Start" });
          expect(startButton).toBeInTheDocument();

          const stopButton = screen.queryByRole("button", { name: "Stop" });
          expect(stopButton).not.toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeDisabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(
            getCountButtonPattern(nextSlot, 1),
          );

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(
            getCheerParagraphPattern(nextSlot),
          );
        });
      });
    });

    describe("When 'Long Break' slot is checked", () => {
      describe("When Auto Start Pomodoros Toggle is checked", () => {
        it("should update the screen correctly", async () => {
          const user = userEvent.setup();
          render(<App />);

          const prevSlot = "Long Break";
          const nextSlot = "Pomodoro";
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          await perform(user, { type: "CLICK_AUTO_START_POMODOROS_TOGGLE" });
          const minute = getDuration(nextSlot);
          const color = getThemeColor(nextSlot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          await perform(user, { type: "CLICK_SLOT_RADIO", slot: prevSlot });
          await perform(user, { type: "CLICK_START_BUTTON" });
          await vi.advanceTimersByTimeAsync(2000);
          await perform(user, { type: "CLICK_FORWARD_BUTTON" });
          await vi.advanceTimersByTimeAsync(1000);

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
          expect(slotRadio1).not.toBeChecked();

          const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
          expect(slotRadio2).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.queryByRole("button", { name: "Start" });
          expect(startButton).not.toBeInTheDocument();

          const stopButton = screen.getByRole("button", { name: "Stop" });
          expect(stopButton).toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeEnabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(
            getCountButtonPattern(nextSlot, 1),
          );

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(
            getCheerParagraphPattern(nextSlot),
          );
        });
      });

      describe("When Auto Start Pomodoros Toggle is NOT checked", () => {
        it("should update the screen correctly", async () => {
          const user = userEvent.setup();
          render(<App />);

          const prevSlot = "Long Break";
          const nextSlot = "Pomodoro";
          await perform(user, { type: "CLICK_SETTING_BUTTON" });
          const minute = getDuration(nextSlot);
          const color = getThemeColor(nextSlot);
          await perform(user, { type: "CLICK_CLOSE_BUTTON" });

          await perform(user, { type: "CLICK_SLOT_RADIO", slot: prevSlot });
          await perform(user, { type: "CLICK_START_BUTTON" });
          await vi.advanceTimersByTimeAsync(2000);
          await perform(user, { type: "CLICK_FORWARD_BUTTON" });
          await vi.advanceTimersByTimeAsync(1000);

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);

          const progressBar = screen.getByRole("progressbar", {
            name: "Current Timer Progress",
          });
          expect(progressBar).toHaveAttribute("aria-valuenow", "0");

          const slotRadio1 = screen.getByRole("radio", { name: prevSlot });
          expect(slotRadio1).not.toBeChecked();

          const slotRadio2 = screen.getByRole("radio", { name: nextSlot });
          expect(slotRadio2).toBeChecked();

          const timer = screen.getByText(TIMER_PATTERN);
          expect(timer).toHaveTextContent(getTimerPattern(minute));

          const startButton = screen.getByRole("button", { name: "Start" });
          expect(startButton).toBeInTheDocument();

          const stopButton = screen.queryByRole("button", { name: "Stop" });
          expect(stopButton).not.toBeInTheDocument();

          const forwardButton = screen.getByRole("button", {
            name: "Finish a slot",
          });
          expect(forwardButton).toBeDisabled();

          const countButton = screen.getByRole("button", {
            name: COUNT_BUTTON_PATTERN,
          });
          expect(countButton).toHaveTextContent(
            getCountButtonPattern(nextSlot, 1),
          );

          const paragraph = screen.getByText(CHEER_PARAGRAPH_PATTERN);
          expect(paragraph).toHaveTextContent(
            getCheerParagraphPattern(nextSlot),
          );
        });
      });
    });
  });

  describe("When Count Button is clicked", () => {
    it("should display confirm dialog", async () => {
      const confirmSpy = vi.spyOn(window, "confirm");
      const user = userEvent.setup();
      render(<App />);

      await perform(user, { type: "CLICK_COUNT_BUTTON" });

      expect(confirmSpy).toHaveBeenCalled();
    });

    it("should reset count if user confirms the dialog", async () => {
      vi.spyOn(window, "confirm").mockImplementation(() => true);
      vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
      const user = userEvent.setup();
      render(<App />);

      for (const slot of SLOT) {
        await perform(user, { type: "CLICK_SLOT_RADIO", slot: "Pomodoro" });
        await perform(user, { type: "CLICK_START_BUTTON" });
        await perform(user, { type: "CLICK_FORWARD_BUTTON" });
        await perform(user, { type: "CLICK_SLOT_RADIO", slot });
        await perform(user, { type: "CLICK_COUNT_BUTTON" });

        const button = screen.getByRole("button", {
          name: COUNT_BUTTON_PATTERN,
        });
        expect(button).toHaveTextContent(getCountButtonPattern(slot, 1));
      }
    });

    it("should do nothing if user cancels the dialog", async () => {
      vi.spyOn(window, "confirm").mockImplementation(() => false);
      vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
      const user = userEvent.setup();
      render(<App />);

      await perform(user, { type: "CLICK_SLOT_RADIO", slot: "Pomodoro" });
      await perform(user, { type: "CLICK_START_BUTTON" });
      await perform(user, { type: "CLICK_FORWARD_BUTTON" });
      await vi.advanceTimersByTimeAsync(1000);

      for (const slot of SLOT) {
        await perform(user, { type: "CLICK_SLOT_RADIO", slot });
        await perform(user, { type: "CLICK_COUNT_BUTTON" });

        const button = screen.getByRole("button", {
          name: COUNT_BUTTON_PATTERN,
        });
        expect(button).toHaveTextContent(getCountButtonPattern(slot, 2));
      }
    });
  });

  it("should render Setting Dialog after clicking Setting Button", async () => {
    const user = userEvent.setup();
    render(<App />);

    await perform(user, { type: "CLICK_SETTING_BUTTON" });

    const settingDialog = screen.getByRole("dialog", { name: "Timer Setting" });
    expect(settingDialog).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toBeInTheDocument();

    const pomoDurationInput = screen.getByRole("spinbutton", {
      name: "Pomodoro",
    });
    expect(pomoDurationInput).toBeInTheDocument();
    expect(pomoDurationInput).toHaveValue(25);

    const shortDurationInput = screen.getByRole("spinbutton", {
      name: "Short Break",
    });
    expect(shortDurationInput).toBeInTheDocument();
    expect(shortDurationInput).toHaveValue(5);

    const longDurationInput = screen.getByRole("spinbutton", {
      name: "Long Break",
    });
    expect(longDurationInput).toBeInTheDocument();
    expect(longDurationInput).toHaveValue(15);

    const autoStartBreaksToggle = screen.getByRole("switch", {
      name: "Auto Start Breaks",
    });
    expect(autoStartBreaksToggle).toBeInTheDocument();
    expect(autoStartBreaksToggle).not.toBeChecked();

    const autoStartPomosToggle = screen.getByRole("switch", {
      name: "Auto Start Pomodoros",
    });
    expect(autoStartPomosToggle).toBeInTheDocument();
    expect(autoStartPomosToggle).not.toBeChecked();

    const longIntervalInput = screen.getByRole("spinbutton", {
      name: "Long Break Interval",
    });
    expect(longIntervalInput).toBeInTheDocument();
    expect(longIntervalInput).toHaveValue(4);

    const alarmSoundButton = screen.getByRole("button", {
      name: /Alarm Sound/,
    });
    expect(alarmSoundButton).toBeInTheDocument();
    expect(alarmSoundButton).toHaveTextContent("kitchen");

    const alarmVolumeSlider = screen.getByRole("slider", { name: "volume" });
    expect(alarmVolumeSlider).toBeInTheDocument();
    expect(alarmVolumeSlider).toHaveValue("50");

    const alarmRepeatInput = screen.getByRole("spinbutton", { name: "repeat" });
    expect(alarmRepeatInput).toBeInTheDocument();
    expect(alarmRepeatInput).toHaveValue(1);

    const pomoThemeButton = screen.getByRole("button", { name: "Pomodoro" });
    expect(pomoThemeButton).toBeInTheDocument();
    expect(pomoThemeButton).toHaveTextContent("pomo1");

    const shortThemeButton = screen.getByRole("button", {
      name: "Short Break",
    });
    expect(shortThemeButton).toBeInTheDocument();
    expect(shortThemeButton).toHaveTextContent("pomo2");

    const longThemeButton = screen.getByRole("button", { name: "Long Break" });
    expect(longThemeButton).toBeInTheDocument();
    expect(longThemeButton).toHaveTextContent("pomo3");

    const countResetTimeInput = screen.getByLabelText("Count Reset Time");
    expect(countResetTimeInput).toBeInTheDocument();
    expect(countResetTimeInput).toHaveValue("06:00");

    const resetButton = screen.getByRole("button", { name: "Reset" });
    expect(resetButton).toBeInTheDocument();

    const okButton = screen.getByRole("button", { name: "OK" });
    expect(okButton).toBeInTheDocument();
  });

  describe("Setting", () => {
    it("should close Setting Dialog after clicking Close Button", async () => {
      const user = userEvent.setup();
      render(<App />);

      await perform(user, { type: "CLICK_SETTING_BUTTON" });
      await perform(user, { type: "CLICK_CLOSE_BUTTON" });

      const settingDialog = screen.queryByRole("dialog", {
        name: "Timer Setting",
      });
      expect(settingDialog).not.toBeInTheDocument();
    });

    describe("Duration Input - Pomodoro", () => {
      it("should show previous value after losing focus if the input is cleared", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Pomodoro" });
        await user.clear(input);
        await user.tab();
        expect(input).toHaveValue(25);

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).toHaveTextContent(getTimerPattern("25"));
      });

      it("should show the valid input (1-120) after losing focus", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Pomodoro" });
        await user.tripleClick(input);
        await user.keyboard("60");
        await user.tab();
        expect(input).toHaveValue(60);

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).toHaveTextContent(getTimerPattern("60"));
      });

      it("should show 1 after losing focus if the input < 1", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Pomodoro" });
        await user.tripleClick(input);
        await user.keyboard("0");
        await user.tab();
        expect(input).toHaveValue(1);

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).toHaveTextContent(getTimerPattern("1"));
      });

      it("should show 120 after losing focus if the input > 120", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Pomodoro" });
        await user.tripleClick(input);
        await user.keyboard("121");
        await user.tab();
        expect(input).toHaveValue(120);

        const timer = screen.getByText(TIMER_PATTERN);
        expect(timer).toHaveTextContent(getTimerPattern("120"));
      });
    });

    describe("Duration Input - Short Break", () => {
      it("should show previous value after losing focus if the input is cleared", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Short Break" });
        await user.clear(input);
        await user.tab();
        expect(input).toHaveValue(5);
      });

      it("should show the valid input (1-120) after losing focus", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Short Break" });
        await user.tripleClick(input);
        await user.keyboard("60");
        await user.tab();
        expect(input).toHaveValue(60);
      });

      it("should show 1 after losing focus if the input < 1", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Short Break" });
        await user.tripleClick(input);
        await user.keyboard("0");
        await user.tab();
        expect(input).toHaveValue(1);
      });

      it("should show 120 after losing focus if the input > 120", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Short Break" });
        await user.tripleClick(input);
        await user.keyboard("121");
        await user.tab();
        expect(input).toHaveValue(120);
      });
    });

    describe("Duration Input - Long Break", () => {
      it("should show previous value after losing focus if the input is cleared", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Long Break" });
        await user.clear(input);
        await user.tab();
        expect(input).toHaveValue(15);
      });

      it("should show the valid input (1-120) after losing focus", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Long Break" });
        await user.tripleClick(input);
        await user.keyboard("60");
        await user.tab();
        expect(input).toHaveValue(60);
      });

      it("should show 1 after losing focus if the input < 1", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Long Break" });
        await user.tripleClick(input);
        await user.keyboard("0");
        await user.tab();
        expect(input).toHaveValue(1);
      });

      it("should show 120 after losing focus if the input > 120", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "Long Break" });
        await user.tripleClick(input);
        await user.keyboard("121");
        await user.tab();
        expect(input).toHaveValue(120);
      });
    });

    describe("Auto Start Breaks Toggle", () => {
      it("should be checked if it is clicked", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const toggle = screen.getByRole("switch", {
          name: "Auto Start Breaks",
        });
        await user.click(toggle);
        expect(toggle).toBeChecked();
      });

      it("should be unchecked if it is clicked twice", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const toggle = screen.getByRole("switch", {
          name: "Auto Start Breaks",
        });
        await user.dblClick(toggle);
        expect(toggle).not.toBeChecked();
      });
    });

    describe("Auto Start Pomodoros Toggle", () => {
      it("should be checked if it is clicked", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const toggle = screen.getByRole("switch", {
          name: "Auto Start Pomodoros",
        });
        await user.click(toggle);
        expect(toggle).toBeChecked();
      });

      it("should be unchecked if it is clicked twice", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const toggle = screen.getByRole("switch", {
          name: "Auto Start Pomodoros",
        });
        await user.dblClick(toggle);
        expect(toggle).not.toBeChecked();
      });
    });

    describe("Long Break Interval Input", () => {
      it("should show previous value after losing focus if the input is cleared", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", {
          name: "Long Break Interval",
        });
        await user.clear(input);
        await user.tab();
        expect(input).toHaveValue(4);
      });

      it("should show the valid input (1-16) after losing focus", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", {
          name: "Long Break Interval",
        });
        await user.tripleClick(input);
        await user.keyboard("8");
        await user.tab();
        expect(input).toHaveValue(8);
      });

      it("should show 1 after losing focus if the input < 1", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", {
          name: "Long Break Interval",
        });
        await user.tripleClick(input);
        await user.keyboard("0");
        await user.tab();
        expect(input).toHaveValue(1);
      });

      it("should show 16 after losing focus if the input > 16", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", {
          name: "Long Break Interval",
        });
        await user.tripleClick(input);
        await user.keyboard("17");
        await user.tab();
        expect(input).toHaveValue(16);
      });
    });

    describe("Alarm Sound Button", () => {
      it("should show listbox & 5 options after clicking the alarm sound button", async () => {
        vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_ALARM_SOUND_BUTTON" });

        const listbox = screen.getByRole("listbox", { name: "Alarm Sound" });
        expect(listbox).toBeInTheDocument();

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(5);

        for (const name of ALARM_NAME) {
          const option = screen.getByRole("option", { name });
          expect(option).toBeInTheDocument();
        }
      });

      it("should have option's value and play audio after selecting it", async () => {
        const audioPlaySpy = vi
          .spyOn(window.HTMLAudioElement.prototype, "play")
          .mockResolvedValue();
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        for (const name of ALARM_NAME) {
          await perform(user, { type: "CLICK_ALARM_SOUND_BUTTON" });
          await perform(user, { type: "SELECT_ALARM_SOUND_OPTION", name });

          const alarmSoundButton = screen.getByRole("button", {
            name: /Alarm Sound/,
          });
          expect(alarmSoundButton).toHaveTextContent(name);
          expect(audioPlaySpy).toHaveBeenCalled();
        }
      });
    });

    describe("Alarm Volume Slider", () => {
      beforeEach(() => {
        vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
      });

      it("should have a valid value (0-100) after dragging it", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const slider = screen.getByRole("slider", { name: "volume" });
        fireEvent.change(slider, { target: { value: 80 } });
        expect(slider).toHaveValue("80");
      });

      it("should have value 100 after dragging it out of the right end", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const slider = screen.getByRole("slider", { name: "volume" });
        fireEvent.change(slider, { target: { value: 101 } });
        expect(slider).toHaveValue("100");
      });

      it("should have value 0 after dragging it out of the left end", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const slider = screen.getByRole("slider", { name: "volume" });
        fireEvent.change(slider, { target: { value: -1 } });
        expect(slider).toHaveValue("0");
      });
    });

    describe("Alarm Repeat Input", () => {
      it("should show previous value after losing focus if the input is cleared", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "repeat" });
        await user.clear(input);
        await user.tab();
        expect(input).toHaveValue(1);
      });

      it("should show the valid input (1-5) after losing focus", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "repeat" });
        await user.tripleClick(input);
        await user.keyboard("3");
        await user.tab();
        expect(input).toHaveValue(3);
      });

      it("should show 1 after losing focus if the input < 1", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "repeat" });
        await user.tripleClick(input);
        await user.keyboard("0");
        await user.tab();
        expect(input).toHaveValue(1);
      });

      it("should show 5 after losing focus if the input > 5", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByRole("spinbutton", { name: "repeat" });
        await user.tripleClick(input);
        await user.keyboard("6");
        await user.tab();
        expect(input).toHaveValue(5);
      });
    });

    describe("Color Theme Button - Pomodoro", () => {
      it("should replace setting dialog with color picker dialog after clicking it", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_THEME_BUTTON", slot });

        const settingDialog = screen.queryByRole("dialog", {
          name: "Timer Setting",
        });
        expect(settingDialog).not.toBeInTheDocument();

        const colorPickerDialog = screen.getByRole("dialog", {
          name: `Pick a color for ${slot}`,
        });
        expect(colorPickerDialog).toBeInTheDocument();
      });

      it("should render 8 color buttons after clicking it", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_THEME_BUTTON", slot });

        for (const name of COLOR) {
          const colorButton = screen.getByRole("button", { name });
          expect(colorButton).toBeInTheDocument();
        }
      });

      it("should change the layout after clicking the color buttons", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        for (const color of COLOR) {
          await perform(user, { type: "CLICK_THEME_BUTTON", slot });
          await perform(user, { type: "CLICK_COLOR_BUTTON", color });

          const layout = screen.getByTestId("layout");
          expect(layout).toHaveClass(`bg-${color}`);
        }
      });

      it("should have a particular value after clicking the color buttons", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        for (const color of COLOR) {
          await perform(user, { type: "CLICK_THEME_BUTTON", slot });
          await perform(user, { type: "CLICK_COLOR_BUTTON", color });

          const themeButton = screen.getByRole("button", { name: slot });
          expect(themeButton).toHaveTextContent(color);
        }
      });

      it("should replace color picker dialog with setting dialog after clicking the backdrop of color picker dialog", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Pomodoro";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_THEME_BUTTON", slot });
        await perform(user, { type: "CLICK_COLOR_PICKER_DIALOG", slot });

        const colorPickerDialog = screen.queryByRole("dialog", {
          name: `Pick a color for ${slot}`,
        });
        expect(colorPickerDialog).not.toBeInTheDocument();

        const settingDialog = screen.getByRole("dialog", {
          name: "Timer Setting",
        });
        expect(settingDialog).toBeInTheDocument();
      });
    });

    describe("Color Theme Button - Short Break", () => {
      it("should replace setting dialog with color picker dialog after clicking it", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Short Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_THEME_BUTTON", slot });

        const settingDialog = screen.queryByRole("dialog", {
          name: "Timer Setting",
        });
        expect(settingDialog).not.toBeInTheDocument();

        const colorPickerDialog = screen.getByRole("dialog", {
          name: `Pick a color for ${slot}`,
        });
        expect(colorPickerDialog).toBeInTheDocument();
      });

      it("should render 8 color buttons after clicking it", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Short Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_THEME_BUTTON", slot });

        for (const name of COLOR) {
          const colorButton = screen.getByRole("button", { name });
          expect(colorButton).toBeInTheDocument();
        }
      });

      it("should have a particular value after clicking the color buttons", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Short Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        for (const color of COLOR) {
          await perform(user, { type: "CLICK_THEME_BUTTON", slot });
          await perform(user, { type: "CLICK_COLOR_BUTTON", color });

          const themeButton = screen.getByRole("button", { name: slot });
          expect(themeButton).toHaveTextContent(color);
        }
      });

      it("should replace color picker dialog with setting dialog after clicking the backdrop of color picker dialog", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Short Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_THEME_BUTTON", slot });
        await perform(user, { type: "CLICK_COLOR_PICKER_DIALOG", slot });

        const colorPickerDialog = screen.queryByRole("dialog", {
          name: `Pick a color for ${slot}`,
        });
        expect(colorPickerDialog).not.toBeInTheDocument();

        const settingDialog = screen.getByRole("dialog", {
          name: "Timer Setting",
        });
        expect(settingDialog).toBeInTheDocument();
      });
    });

    describe("Color Theme Button - Long Break", () => {
      it("should replace setting dialog with color picker dialog after clicking it", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Long Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_THEME_BUTTON", slot });

        const settingDialog = screen.queryByRole("dialog", {
          name: "Timer Setting",
        });
        expect(settingDialog).not.toBeInTheDocument();

        const colorPickerDialog = screen.getByRole("dialog", {
          name: `Pick a color for ${slot}`,
        });
        expect(colorPickerDialog).toBeInTheDocument();
      });

      it("should render 8 color buttons after clicking it", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Long Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_THEME_BUTTON", slot });

        for (const name of COLOR) {
          const colorButton = screen.getByRole("button", { name });
          expect(colorButton).toBeInTheDocument();
        }
      });

      it("should have a particular value after clicking the color buttons", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Long Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        for (const color of COLOR) {
          await perform(user, { type: "CLICK_THEME_BUTTON", slot });
          await perform(user, { type: "CLICK_COLOR_BUTTON", color });

          const themeButton = screen.getByRole("button", { name: slot });
          expect(themeButton).toHaveTextContent(color);
        }
      });

      it("should replace color picker dialog with setting dialog after clicking the backdrop of color picker dialog", async () => {
        const user = userEvent.setup();
        render(<App />);

        const slot = "Long Break";
        await perform(user, { type: "CLICK_SETTING_BUTTON" });
        await perform(user, { type: "CLICK_THEME_BUTTON", slot });
        await perform(user, { type: "CLICK_COLOR_PICKER_DIALOG", slot });

        const colorPickerDialog = screen.queryByRole("dialog", {
          name: `Pick a color for ${slot}`,
        });
        expect(colorPickerDialog).not.toBeInTheDocument();

        const settingDialog = screen.getByRole("dialog", {
          name: "Timer Setting",
        });
        expect(settingDialog).toBeInTheDocument();
      });
    });

    describe("Count Reset Time Input", () => {
      it("should show the valid input", async () => {
        const user = userEvent.setup();
        render(<App />);

        await perform(user, { type: "CLICK_SETTING_BUTTON" });

        const input = screen.getByLabelText("Count Reset Time");
        fireEvent.change(input, { target: { value: "18:00" } });
        expect(input).toHaveValue("18:00");
      });
    });

    it("should reset every setting back to default after clicking Reset Button", async () => {
      vi.spyOn(window.HTMLAudioElement.prototype, "play").mockResolvedValue();
      const user = userEvent.setup();
      render(<App />);

      await perform(user, { type: "CLICK_SETTING_BUTTON" });
      await perform(user, {
        type: "SET_DURATION",
        slot: "Pomodoro",
        value: 60,
      });
      await perform(user, {
        type: "SET_DURATION",
        slot: "Short Break",
        value: 60,
      });
      await perform(user, {
        type: "SET_DURATION",
        slot: "Long Break",
        value: 60,
      });
      await perform(user, { type: "CLICK_AUTO_START_BREAKS_TOGGLE" });
      await perform(user, { type: "CLICK_AUTO_START_POMODOROS_TOGGLE" });
      await perform(user, { type: "SET_LONG_BREAK_INTERVAL", value: 1 });
      await perform(user, { type: "CLICK_ALARM_SOUND_BUTTON" });
      await perform(user, { type: "SELECT_ALARM_SOUND_OPTION", name: "bell" });
      await perform(user, { type: "SET_ALARM_VOLUME", volume: 80 });
      await perform(user, { type: "SET_ALARM_REPEAT", repeat: 5 });
      await perform(user, { type: "CLICK_THEME_BUTTON", slot: "Pomodoro" });
      await perform(user, { type: "CLICK_COLOR_BUTTON", color: "pomo4" });
      await perform(user, { type: "CLICK_THEME_BUTTON", slot: "Short Break" });
      await perform(user, { type: "CLICK_COLOR_BUTTON", color: "pomo5" });
      await perform(user, { type: "CLICK_THEME_BUTTON", slot: "Long Break" });
      await perform(user, { type: "CLICK_COLOR_BUTTON", color: "pomo6" });
      await perform(user, { type: "SET_COUNT_RESET_TIME", time: "18:00" });
      await perform(user, { type: "CLICK_RESET_BUTTON" });

      const pomoDurationInput = screen.getByRole("spinbutton", {
        name: "Pomodoro",
      });
      expect(pomoDurationInput).toHaveValue(25);

      const shortDurationInput = screen.getByRole("spinbutton", {
        name: "Short Break",
      });
      expect(shortDurationInput).toHaveValue(5);

      const longDurationInput = screen.getByRole("spinbutton", {
        name: "Long Break",
      });
      expect(longDurationInput).toHaveValue(15);

      const autoStartBreaksToggle = screen.getByRole("switch", {
        name: "Auto Start Breaks",
      });
      expect(autoStartBreaksToggle).not.toBeChecked();

      const autoStartPomodorosToggle = screen.getByRole("switch", {
        name: "Auto Start Pomodoros",
      });
      expect(autoStartPomodorosToggle).not.toBeChecked();

      const longBreakIntervalInput = screen.getByRole("spinbutton", {
        name: "Long Break Interval",
      });
      expect(longBreakIntervalInput).toHaveValue(4);

      const alarmSoundButton = screen.getByRole("button", {
        name: /Alarm Sound/,
      });
      expect(alarmSoundButton).toHaveTextContent("kitchen");

      const alarmVolumeSlider = screen.getByRole("slider", { name: "volume" });
      expect(alarmVolumeSlider).toHaveValue("50");

      const alarmRepeatInput = screen.getByRole("spinbutton", {
        name: "repeat",
      });
      expect(alarmRepeatInput).toHaveValue(1);

      const pomoThemeButton = screen.getByRole("button", { name: "Pomodoro" });
      expect(pomoThemeButton).toHaveTextContent("pomo1");

      const shortThemeButton = screen.getByRole("button", {
        name: "Short Break",
      });
      expect(shortThemeButton).toHaveTextContent("pomo2");

      const longThemeButton = screen.getByRole("button", {
        name: "Long Break",
      });
      expect(longThemeButton).toHaveTextContent("pomo3");

      const countResetTimeInput = screen.getByLabelText("Count Reset Time");
      expect(countResetTimeInput).toHaveValue("06:00");
    });

    it("should close Setting Dialog after clicking Ok Button", async () => {
      const user = userEvent.setup();
      render(<App />);

      await perform(user, { type: "CLICK_SETTING_BUTTON" });
      await perform(user, { type: "CLICK_OK_BUTTON" });

      const settingDialog = screen.queryByRole("dialog", {
        name: "Timer Setting",
      });
      expect(settingDialog).not.toBeInTheDocument();
    });
  });
});
