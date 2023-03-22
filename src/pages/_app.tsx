import React, { useEffect, useState } from "react";

import { isMobile } from "react-device-detect";
import { ThemeProvider } from "styled-components";
import { PageLayout } from "../layout/PageLayout";
import { GlobalStyles } from "../styles/GlobalStyles";
import { theme } from "../styles/theme";
import { FilterProvider } from "../utils/filters/FilterProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <FilterProvider />
      <GlobalStyles />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThemeProvider>
  );
}

export default MyApp;
