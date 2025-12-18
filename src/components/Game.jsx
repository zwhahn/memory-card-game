import { useEffect, useState } from "react";
import { Card } from "./Card";

export function Game() {
  const url = "https://rickandmortyapi.com/api/character/";
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    const characterIDs = [1, 2, 3, 4, 5, 244];
    async function loadImage() {
      const res = await fetch(url + `${characterIDs}`);
      const data = await res.json();
      console.log(data);
      const newCharacterData = data.map((character) => ({
        name: character.name,
        image: character.image,
      }));
      setCharacterData(newCharacterData);
    }
    loadImage();
  }, []);

  return (
    <>
      <div className="gameboard">
        {characterData.map((char) => (
          <Card characterData={char}></Card>
        ))}
      </div>
    </>
  );
}
