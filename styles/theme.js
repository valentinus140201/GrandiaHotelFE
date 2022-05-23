import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      main: "#a1613f",
      light: "#ad6b47",
      dark: "#734932",
    },
    secondary: {
      main: "#ff8532",
      light: "#ff9d5b",
      dark: "#b25d23",
    },
    mainBackground: "#eeeeee",
  },
  fonts: {
    body: "'Inter', sans-serif",
  },
});

export default theme;
