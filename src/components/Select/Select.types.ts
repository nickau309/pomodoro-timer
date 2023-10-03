export type SelectProps<T> = {
  label: string;
  list: readonly T[];
  onChange: (value: T) => void;
  value: T;
};
