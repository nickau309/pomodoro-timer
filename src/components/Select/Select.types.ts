export type SelectProps<T> = {
  label: string;
  list: T[];
  value: T;
  onChange: (value: T) => void;
};
