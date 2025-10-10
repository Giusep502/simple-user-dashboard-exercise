import { useEffect, useState, type PropsWithChildren } from "react";
import { themeModes, type ThemeMode } from "../ui";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "./Contexts";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>(
    (sessionStorage?.getItem("theme") as ThemeMode) || "light",
  );

  useEffect(() => {
    sessionStorage.setItem("theme", currentMode);
  }, [currentMode]);

  return (
    <StyledThemeProvider theme={themeModes[currentMode]}>
      <ThemeContext value={{ setMode: setCurrentMode, currentMode }}>
        {children}
      </ThemeContext>
    </StyledThemeProvider>
  );
};
