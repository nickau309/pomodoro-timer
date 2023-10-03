export type PositiveNumberInputProps = {
  defaultValue?: number;
  label?: string;
  onBlur?: (value: number) => void;
  vertical?: boolean;
} & Pick<React.ComponentPropsWithoutRef<"input">, "max" | "min">;
