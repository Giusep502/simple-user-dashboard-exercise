import { render } from "@testing-library/react";
import { ThemeProvider } from "../../providers";

export const renderWithProviders = (component: React.ReactNode) => {
  return render(component, {
    wrapper: ThemeProvider,
  });
};
