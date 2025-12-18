import { useEffect, useState } from "react";
import { Card } from "./Card";

export function Game() {
  const url = "https://rickandmortyapi.com/api/character/";

  const [characterData, setCharacterData] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [pastSelections, setPastSelections] = useState([]);

  function shuffle(characterArray) {
    let currentIndex = characterArray.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [characterArray[currentIndex], characterArray[randomIndex]] = [
        characterArray[randomIndex],
        characterArray[currentIndex],
      ];
    }
    return characterArray;
  }

  useEffect(() => {
    const characterIDs = [1, 2, 3, 4, 5, 244];
    async function loadImage() {
      const res = await fetch(url + `${characterIDs}`);
      const data = await res.json();
      console.log(data);
      const newCharacterData = data.map((character) => ({
        id: character.id,
        name: character.name,
        image: character.image,
      }));
      setCharacterData(shuffle(newCharacterData));
    }
    loadImage();
  }, []);

  function handleCardClick(newID) {
    if (checkRepeat(newID)) {
      setCurrentStreak(0);
      setPastSelections([]);
    } else {
      setCurrentStreak(currentStreak + 1);
      setPastSelections([...pastSelections, newID]);
      setBestStreak(Math.max(bestStreak, currentStreak + 1));
    }
    setCharacterData(shuffle(characterData));
  }

  function checkRepeat(newID) {
    console.log("newID: ", newID);
    for (let ID of pastSelections) {
      console.log("ID: ", ID);
      if (newID === ID) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <div className="game-container">
        <div className="counter">
          Current Streak: {currentStreak} Best: {bestStreak}
        </div>
        <div className="gameboard">
          {characterData.map((char) => (
            <Card
              key={char.id}
              characterData={char}
              handleClick={() => handleCardClick(char.id)}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
}
