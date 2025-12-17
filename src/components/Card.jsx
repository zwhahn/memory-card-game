import { useEffect, useState } from "react";

export function Card() {
  const url = "https://rickandmortyapi.com/api/character/";
  const [image, setImage] = useState(null);

  useEffect(
    () =>
      async function loadImage() {
        const randomNum = Math.ceil(Math.random() * 800);
        const res = await fetch(url + `${randomNum}`);
        const data = await res.json();
        setImage(data.image);
      },
    [],
  );

  return (
    <>
      <div className="card">Hello World</div>;
      <img src={image} alt="" />
    </>
  );
}
