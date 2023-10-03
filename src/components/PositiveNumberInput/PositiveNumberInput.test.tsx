import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import PositiveNumberInput from "./PositiveNumberInput";

describe("PositiveNumberInput", () => {
  it("should render", () => {
    render(<PositiveNumberInput />);

    const inputElement = screen.getByRole("spinbutton");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(1);
  });

  it("should render a default value even if it is not valid", () => {
    const defaultValue = -16;
    render(<PositiveNumberInput defaultValue={defaultValue} />);

    const inputElement = screen.getByRole("spinbutton");
    expect(inputElement).toHaveValue(defaultValue);
  });

  it("should render a label", () => {
    const label = "test";
    render(<PositiveNumberInput label={label} />);

    const inputElement = screen.getByRole("spinbutton", { name: label });
    expect(inputElement).toBeInTheDocument();
  });

  describe("aria-invalid state", () => {
    it("should have aria-invalid='true' if the input is not valid", () => {
      render(<PositiveNumberInput defaultValue={0} />);

      const inputElement = screen.getByRole("spinbutton");
      expect(inputElement).toBeInvalid();
    });

    it("should have aria-invalid='false' if the input is valid", () => {
      render(<PositiveNumberInput />);

      const inputElement = screen.getByRole("spinbutton");
      expect(inputElement).toBeValid();
    });
  });

  describe("when user types", () => {
    it("should allow user to type 0-9", async () => {
      const user = userEvent.setup();
      render(<PositiveNumberInput />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.keyboard("1324567890");
      expect(inputElement).toHaveValue(1324567890);
    });

    it("should allow user to clear the input", async () => {
      const user = userEvent.setup();
      render(<PositiveNumberInput />);

      const inputElement = screen.getByRole("spinbutton");
      await user.clear(inputElement);
      expect(inputElement).toHaveValue(null);
    });

    it("should not allow user to type 'e', 'E', '+', '-', '.'", async () => {
      const user = userEvent.setup();
      render(<PositiveNumberInput />);

      const inputElement = screen.getByRole("spinbutton");
      await user.type(inputElement, "eE+-.");
      expect(inputElement).toHaveValue(1);
    });
  });

  describe("after losing focus", () => {
    it("should remain unchanged if input is valid", async () => {
      const user = userEvent.setup();
      render(<PositiveNumberInput />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.keyboard("16");
      await user.tab();
      expect(inputElement).toHaveValue(16);
    });

    it("should show default value if input > MAX_VALUE", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("1e999");
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it(`should show MAX_SAFE_INTEGER if
          1. \`max\` is not passed to the component AND
          2. input > MAX_SAFE_INTEGER`, async () => {
      const user = userEvent.setup();
      render(<PositiveNumberInput />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.keyboard("{9>16/}");
      await user.tab();
      expect(inputElement).toHaveValue(Number.MAX_SAFE_INTEGER);
    });

    it(`should show max if
          1. \`max\` is passed to the component AND
          2. input > max`, async () => {
      const user = userEvent.setup();
      const max = 16;
      render(<PositiveNumberInput max={max} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.keyboard("17");
      await user.tab();
      expect(inputElement).toHaveValue(max);
    });

    it("should show default value if input < MIN_VALUE", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("-1e999");
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it(`should show 1 if
          1. \`min\` is not passed to the component AND
          2. input <= 1`, async () => {
      const user = userEvent.setup();
      render(<PositiveNumberInput />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.keyboard("0");
      await user.tab();
      expect(inputElement).toHaveValue(1);
    });

    it(`should show 1 if
          1. \`min\` is passed to the component AND
          2. input <= 1 AND
          3. min <= 1`, async () => {
      const user = userEvent.setup();
      const min = -16;
      render(<PositiveNumberInput min={min} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("-15");
      await user.tab();
      expect(inputElement).toHaveValue(1);
    });

    it(`should show min if
          1. \`min\` is passed to the component AND
          2. input < min AND
          3. min > 1`, async () => {
      const user = userEvent.setup();
      const min = 16;
      render(<PositiveNumberInput min={min} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.keyboard("1");
      await user.tab();
      expect(inputElement).toHaveValue(min);
    });

    it(`should show the integral part of the input if
          1. input is a floating point number`, async () => {
      const user = userEvent.setup();
      render(<PositiveNumberInput />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("16.5");
      await user.tab();
      expect(inputElement).toHaveValue(16);
    });

    it("should show default value if input is '+'", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("+");
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it("should show default value if input is '++'", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("++");
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it("should show default value if input is '-'", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("-");
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it("should show default value if input is '--'", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("--");
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it("should show default value if input is 'e'", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("e");
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it("should show default value if input is 'E'", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste("E");
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it("should show default value if input is '.'", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.tripleClick(inputElement);
      await user.paste(".");
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it("should show default value if input is empty", async () => {
      const user = userEvent.setup();
      const defaultValue = 16;
      render(<PositiveNumberInput defaultValue={defaultValue} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.clear(inputElement);
      await user.tab();
      expect(inputElement).toHaveValue(defaultValue);
    });

    it("should call the blur handler", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<PositiveNumberInput onBlur={handleBlur} />);

      const inputElement = screen.getByRole("spinbutton");
      await user.click(inputElement);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });
});
