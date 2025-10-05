const baseTheme = {
  breakpoints: {
    small: 600,
    medium: 900,
    large: 1200,
  },
  fontFamily: {
    primary: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  fontSize: {
    small: "0.8em",
    medium: "1em",
    large: "1.5em",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    small: "16px",
    medium: "24px",
    large: "32px",
  },
  spacing: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
} as const;

const defaultTheme = {
  ...baseTheme,
  text: {
    primary: "#222",
    secondary: "#5A5A5A",
    inverse: "#FAFAFA",
  },
  fill: {
    primary: "#222",
    accent: "#007BFF",
    success: "#28A745",
    inactive: "#6C757D",
  },
  background: {
    default: "#FFFFFF",
  },
  surface: {
    default: "#F8F9FA",
  },
  button: {
    background: {
      default: "#007BFF",
      hover: "#0069D9",
      pressed: "#0056B3",
    },
    outline: "#2C92FF",
    text: "#FFFFFF",
  },
  iconButton: {
    hover: "#F0F0F0",
    outline: "#777777",
    pressed: "#E0E0E0",
  },
  border: { default: "#F8F9FA" },
};

export type Theme = typeof defaultTheme;

const darkTheme: Theme = {
  ...baseTheme,
  text: {
    primary: "#FAFAFA",
    secondary: "#B0B0B0",
    inverse: "#000",
  },
  fill: {
    primary: "#FAFAFA",
    accent: "#4DA6FF",
    success: "#70E385",
    inactive: "#A0A0A0",
  },
  background: {
    default: "#1A1A1A",
  },
  surface: {
    default: "#252525",
  },
  border: {
    default: "#3D3D3D",
  },
  button: {
    background: {
      default: "#176FC7",
      hover: "#0A58A5",
      pressed: "#00448A",
    },
    outline: "#3588D8",
    text: "#FFFFFF",
  },
  iconButton: {
    hover: "#202020",
    outline: "#B3B3B3",
    pressed: "#303030",
  },
};

export const themeModes = {
  light: defaultTheme,
  dark: darkTheme,
} as const;

export type ThemeMode = keyof typeof themeModes;
