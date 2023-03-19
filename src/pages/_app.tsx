import React, { useEffect, useState } from "react";

import { isMobile } from "react-device-detect";
import { ThemeProvider } from "styled-components";
import { PageLayout } from "../layout/PageLayout";
import { GlobalStyles } from "../styles/GlobalStyles";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  const [animated, toggleAnimated] = useState(false);

  useEffect(() => {
    if (isMobile) {
      toggleAnimated(false);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <svg display="none">
        <defs>
          <filter id="displacementFilter">
            <feTurbulence
              seed={3}
              type="turbulence"
              baseFrequency="0.015"
              numOctaves="8"
              result="turbulence"
            >
              {/* {!animated ? (
                <animate attributeName="seed" from="1" to="10" dur="10s" repeatCount="indefinite" />
              ) : null} */}
            </feTurbulence>
            <feDisplacementMap
              in2="turbulence"
              in="SourceGraphic"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <GlobalStyles />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThemeProvider>
  );
}

export default MyApp;
