import { createTheme } from "@mui/material";

const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#4B4E6D",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

export const theme = createTheme(themeOptions);
