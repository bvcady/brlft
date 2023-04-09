import { useEffect, useState } from "react";

export const RandomImage = () => {
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
        width: "clamp(150px, 250px, 50%)",
        height: 250,
      }}
    />
  );
};
