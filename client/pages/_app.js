import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { Provider } from "react-redux";
import { store } from "@/store";
import "bootstrap-icons/font/bootstrap-icons.css";
import styled from "styled-components";

const AppComponent = styled.div`
  .content-container {
    box-sizing: border-box;
    transition: padding-left 0.2s;
    padding-left: ${(props) => (props.isNavbarCollapsed ? "80px" : "200px")};
    /* width: calc(100% - ${(props) =>
      props.isNavbarCollapsed ? "80px" : "200px"}); */
  }

  .container {
    box-sizing: border-box;
    transition: margin 0.2s ease-in-out, width 0.2s ease-in-out;
    padding: 20px 20px;

    // max-width: 1600px;
    // padding-bottom: 20px;
    /* margin: 0 auto; */

    @media only screen and (min-width: 768px) {
      // max-width: 760px;
      // padding-bottom: 50px;
    }
    @media only screen and (min-width: 1024px) {
      // max-width: 1000px;
    }
    @media only screen and (min-width: 1200px) {
      // max-width: 1150px;
    }
    @media only screen and (min-width: 1600px) {
      // max-width: 1500px;
    }
  }
`;

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppComponent>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          />
        </Head>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        />
        <Component {...pageProps} />
      </AppComponent>
    </Provider>
  );
}

export default App;


