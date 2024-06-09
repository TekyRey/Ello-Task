// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, sans-serif",
  },
  palette: {
    primary: {
      main: "#CFFAFA",
    },
    secondary: {
      main: "#CFFAFA",
    },
    success: {
      main: "#28B8B8",
    },
    error: {
      main: "#F76434",
    },

    background: {
      default: "#CFFAFA",
      paper: "#53C2C2",
    },
  },
});

export default theme;
