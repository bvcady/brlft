import { CSSProperties, useEffect, useState } from "react";

interface Props {
  style?: CSSProperties;
}

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
    <img
      src={`images/${image}`}
      alt=""
      style={{
        objectFit: "contain",
        filter: "url(#displacementFilter) blur(0.5px)",
        width: "clamp(150px, 250px, 50%)",
        height: 250,
        ...style,
      }}
    />
  );
};
