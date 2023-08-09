import { useEffect } from "react";

export default function useFavicon(href: string) {
  useEffect(() => {
    const link: HTMLLinkElement =
      document.querySelector("link[rel~='icon']") ??
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = href;
    document.head.append(link);
  }, [href]);
}
