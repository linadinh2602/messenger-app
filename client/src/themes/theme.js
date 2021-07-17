import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: {
      xsmall: 10,
      small: 12,
      medium: 14,
      large: 16,
      heading: 20,
      title: 26,
    },
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
    },
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold",
      },
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
  },
  spacing: [0, 5, 10, 16, 20, 24, 32, 41, 64, 100],
});
