// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, sans-serif",
  },
  palette: {
    primary: {
      main: "#5ACCCC",
    },
    secondary: {
      main: "#EC407A",
    },
    background: {
      default: "#F5F5F5",
    },
  },
});

export default theme;
