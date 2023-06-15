export default function classNames(...classList) {
  return classList.filter(Boolean).join(" ");
}
