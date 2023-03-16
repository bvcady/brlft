import styled from "styled-components";
import useMousePosition from "../utils/hooks/useMousePosition";
import { useWindowSize } from "../utils/hooks/useWindowSize";

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0 0 0 0;
  filter: url(#displacementFilter) blur(0.5px);
`;

export const RainWithUmbrella = () => {
  const mousePosition = useMousePosition();
  const windowSize = useWindowSize();

  const lines = new Array(Math.ceil(windowSize?.width || 0 / 15)).fill("").map((index) => index);

  const rain = `
			${lines.map((_, l) => {
        const x = l * 15 - 100;
        const deltaX = mousePosition?.x ? Math.abs(x - mousePosition.x) : 1000;
        return `M ${x} -100 V ${
          deltaX < 100 ? mousePosition.y - 100 + deltaX * 0.5 : windowSize.height
        } `;
      })}
		`;

  const umbrella = `
		M ${mousePosition.x} ${mousePosition.y - 100} V ${mousePosition.y + 80}
		M ${mousePosition.x} ${mousePosition.y - 100} L ${mousePosition.x + 100 - 5} ${mousePosition.y - 50}
		M ${mousePosition.x} ${mousePosition.y - 100} L ${mousePosition.x - 100 + 5} ${mousePosition.y - 50}
		M ${mousePosition.x} ${mousePosition.y + 80} 
		C ${mousePosition.x} ${mousePosition.y + 100} 
			${mousePosition.x - 20} ${mousePosition.y + 120} 
			${mousePosition.x - 40} ${mousePosition.y + 120} 
	`;

  return (
    <Wrapper>
      <svg style={{ width: windowSize.width, height: windowSize.height + 100 }}>
        <path
          // filter="url(#displacementFilter) blur(0.5px)"
          d={rain}
          stroke="#0467B2"
          strokeWidth={3}
          // strokeDasharray="20 10"
          strokeLinecap="round"
        />
        <path
          d={umbrella}
          stroke="black"
          fill="transparent"
          strokeWidth={10}
          strokeLinecap="round"
        />
      </svg>
    </Wrapper>
  );
};
