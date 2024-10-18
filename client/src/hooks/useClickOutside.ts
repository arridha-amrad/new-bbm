import { useEffect, RefObject, useRef } from "react";

function useClickOutside(
  callback: () => void,
  excludeRef?: RefObject<HTMLElement>
) {
  const domNodeRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (excludeRef && excludeRef.current) {
        if (
          domNodeRef.current &&
          !domNodeRef.current.contains(event.target as Node) &&
          !excludeRef.current.contains(event.target as Node)
        ) {
          callback();
        }
      } else {
        if (
          domNodeRef.current &&
          !domNodeRef.current.contains(event.target as Node)
        ) {
          callback();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, excludeRef]);
  return { domNodeRef };
}

export default useClickOutside;
