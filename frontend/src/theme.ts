// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, sans-serif",
  },
  palette: {
    primary: {
      main: "#28B8B8",
    },
    secondary: {
      main: "#CFFAFA",
    },
    success: {
        main: "#FAAD00",
        },
    background: {
      default: "#CFFAFA",
      paper: "#53C2C2"
    },
  },
});

export default theme;
