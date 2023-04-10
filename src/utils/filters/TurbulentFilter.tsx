import { useEffect, useState } from "react";
import { useDevicePixelRatio } from "use-device-pixel-ratio";

export const TurbulentFilter = () => {
  const dpr = useDevicePixelRatio();
  const [frequency, setFrequency] = useState(0.015);

  useEffect(() => {
    setFrequency(dpr * 0.0075);
  }, [dpr]);

  return (
    <svg display="none">
      <defs>
        <filter id="displacementFilter">
          <feTurbulence
            seed={3}
            type="turbulence"
            baseFrequency={frequency}
            numOctaves="8"
            result="turbulence"
          >
            <animate attributeName="seed" from="0" to="5" dur="1s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap
            id="dm"
            in2="turbulence"
            in="SourceGraphic"
            scale={4}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur in="dm" stdDeviation={0.5} />
        </filter>
      </defs>
    </svg>
  );
};
