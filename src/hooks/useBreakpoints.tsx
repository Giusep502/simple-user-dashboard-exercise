import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

export const useBreakpointIndex = (): 0 | 1 | 2 => {
  const { breakpoints } = useTheme();

  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width < breakpoints.small) return 0;
  if (width < breakpoints.medium) return 1;
  return 2;
};
