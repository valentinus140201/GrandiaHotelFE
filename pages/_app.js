import Router from "next/router";
import NProgress from "nprogress";
import "styles/nprogress.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { Chakra } from "components/common";
import theme from "../styles/theme";
import fonts from "../styles/font-face";
import { Layout } from "components/layout";
import { UserProvider } from "context/userContext";
import { FavouritesProvider } from "context/favouritesContext";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  return (
    <Chakra cookies={pageProps.cookies}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <FavouritesProvider>
            <Global styles={fonts} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FavouritesProvider>
        </UserProvider>
      </ChakraProvider>
    </Chakra>
  );
};

export default MyApp;

// export { getServerSideProps } from "components/common/Chakra";
