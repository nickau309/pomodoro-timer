import clsx from "clsx";
import { forwardRef } from "react";

type NumberInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "className" | "type"
>;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(props, ref) {
    return (
      <input
        ref={ref}
        type="number"
        className={clsx(
          "w-full rounded bg-neutral-200/60 px-2.5 py-2 text-neutral-600",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-blue-400 focus-visible:[&[aria-invalid='true']]:ring-red-400",
        )}
        {...props}
      />
    );
  },
);

export default NumberInput;
