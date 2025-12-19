import "./App.css";
import { Game } from "./components/Game";

function App() {
  return (
    <>
      <header>
        <h1>Rick and Morty's Memory Game</h1>
      </header>
      <main>
        <Game></Game>
      </main>
      <div className="directions">
        Get points by clicking on an image but don't click on any more than
        once!
      </div>
    </>
  );
}

export default App;
