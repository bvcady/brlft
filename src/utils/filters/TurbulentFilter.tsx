import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export const TurbulentFilter = () => {
  const [animated, toggleAnimated] = useState(false);

  useEffect(() => {
    if (isMobile) {
      toggleAnimated(false);
    }
  }, []);

  return (
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
            {!animated ? (
              <animate attributeName="seed" from="0" to="5" dur="1s" repeatCount="indefinite" />
            ) : null}
          </feTurbulence>
          <feDisplacementMap
            id="dm"
            in2="turbulence"
            in="SourceGraphic"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};
