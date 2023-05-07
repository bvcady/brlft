import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  style?: CSSProperties;
}

const Image = styled.img`
  object-fit: contain;
  filter: url(#displacementFilter) blur(0.5px);
  width: clamp(150px, 250px, 50%);
  height: 250px;

  @media (width <= 500px) {
    margin: -1rem 0;
    height: 200px;
  }
`;

export const RandomImage = ({ style }: Props) => {
  const images = [
    "bob-en-lisa.png",
    "champagne.png",
    "glazen.png",
    "platenspeler.png",
    // "trippy-bob-en-lisa.jpg",
  ];
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(() => {
      const rand = Math.floor(Math.random() * images.length);
      return images[rand];
    });
  }, []);

  if (!image) return null;
  return (
    <Image
      src={`images/${image}`}
      alt=""
      style={{
        ...style,
      }}
    />
  );
};
