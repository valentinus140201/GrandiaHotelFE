import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager
} from "@chakra-ui/react";

const Chakra = ({ cookies, children }) => {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};

export default Chakra;

export function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? ""
    }
  };
}
