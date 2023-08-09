export default function classNames(...classList: (string | boolean)[]) {
  return classList.filter(Boolean).join(" ");
}
