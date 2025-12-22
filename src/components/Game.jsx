import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

export function Game() {
  const url = "https://rickandmortyapi.com/api/character/";

  const easyCharacterIDs = [1, 2, 3, 4, 5, 599];
  const mediumCharacterIDs = [
    ...easyCharacterIDs,
    282,
    331,
    240,
    344,
    180,
    329,
  ];
  const hardCharacterIDs = [
    1, 8, 15, 22, 69, 72, 74, 78, 86, 119, 135, 164, 165, 187, 215, 265,
  ];

  const [characterData, setCharacterData] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [pastSelections, setPastSelections] = useState([]);
  const [repeatCardID, setRepeatCardID] = useState("");
  const [characterIDs, setCharacterIDs] = useState(easyCharacterIDs);
  const [gridClassName, setGridClassName] = useState("six-cards");
  const [btnSelect, setBtnSelect] = useState("easy");
  const [gameOver, setGameOver] = useState(false);

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
    async function loadImage() {
      const res = await fetch(url + `${characterIDs}`);
      const data = await res.json();
      const newCharacterData = data.map((character) => ({
        id: character.id,
        name: character.name,
        image: character.image,
        repeat: false,
      }));
      setCharacterData(shuffle(newCharacterData));
    }
    loadImage();
  }, [characterIDs]);

  function resetGame() {
    setCurrentStreak(0);
    setRepeatCardID("");
    setPastSelections("");
  }

  function isGameOver() {
    console.log("current steak: ", currentStreak);
    console.log("id length: ", characterIDs.length);
    if (currentStreak + 1 == characterIDs.length) {
      setGameOver(true);
      return;
    }
  }

  function handlePlayAgain() {
    resetGame();
    setGameOver(false);
  }

  function handleDifficultyLevelClick(difficulty) {
    console.log(difficulty);
    if (difficulty === "easy") {
      setCharacterIDs(easyCharacterIDs);
      setGridClassName("six-cards");
      setBtnSelect("easy");
    }
    if (difficulty === "medium") {
      setCharacterIDs(mediumCharacterIDs);
      setGridClassName("twelve-cards");
      setBtnSelect("medium");
    }
    if (difficulty === "hard") {
      setCharacterIDs(hardCharacterIDs);
      setGridClassName("sixteen-cards");
      setBtnSelect("hard");
    }
    resetGame();
    setBestStreak(0);
  }

  function handleCardClick(newID) {
    if (checkRepeat(newID)) {
      setRepeatCardID(newID);
      setTimeout(() => {
        resetGame();
        setCharacterData(shuffle(characterData));
      }, 2000);
    } else {
      setCurrentStreak(currentStreak + 1);
      setPastSelections([...pastSelections, newID]);
      setBestStreak(Math.max(bestStreak, currentStreak + 1));
      isGameOver();
      setCharacterData(shuffle(characterData));
    }
  }

  function checkRepeat(newID) {
    console.log("newID: ", newID);
    for (let ID of pastSelections) {
      if (newID === ID) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <div className="game-container">
        <div id="game-over" className={gameOver ? "show" : ""}>
          <h1>You Won</h1>
          <button onClick={() => handlePlayAgain()}>Play Again!</button>
        </div>
        <div className="scoreboard-and-menu">
          <div className="scoreboard">
            <div className="current-streak">
              Current Streak: {currentStreak}
            </div>
            <div className="best-streak">Best Streak: {bestStreak}</div>
          </div>
          <div className="mode-selection">
            <Button
              difficulty="Easy"
              selected={btnSelect === "easy" ? true : false}
              onClick={() => handleDifficultyLevelClick("easy")}
            ></Button>
            <Button
              difficulty="Medium"
              selected={btnSelect === "medium" ? true : false}
              onClick={() => handleDifficultyLevelClick("medium")}
            ></Button>
            <Button
              difficulty="Hard"
              selected={btnSelect === "hard" ? true : false}
              onClick={() => handleDifficultyLevelClick("hard")}
            ></Button>
          </div>
        </div>
        <div className={"gameboard " + `${gridClassName}`}>
          {characterData.map((char) => (
            <Card
              key={char.id}
              characterData={char}
              handleClick={() => handleCardClick(char.id)}
              repeatCardID={repeatCardID}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
}
