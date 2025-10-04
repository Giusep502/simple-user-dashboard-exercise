import { useState, type PropsWithChildren } from "react";
import { themeModes, type ThemeMode } from "../ui";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "./Contexts";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>("light");

  return (
    <StyledThemeProvider theme={themeModes[currentMode]}>
      <ThemeContext value={{ setMode: setCurrentMode, currentMode }}>
        {children}
      </ThemeContext>
    </StyledThemeProvider>
  );
};
