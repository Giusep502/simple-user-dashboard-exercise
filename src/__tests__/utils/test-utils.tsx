import { render } from "@testing-library/react";
import { ThemeProvider } from "../../providers";
import { BrowserRouter } from "react-router-dom";
export const renderWithProviders = (component: React.ReactNode) => {
  return render(component, {
    wrapper: ({ children }) => (
      <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    ),
  });
};
