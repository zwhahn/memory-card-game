import "./App.css";
import { Card } from "./components/Card";

function App() {
  return (
    <>
      <header>
        <h1>Memory Game</h1>
      </header>
      <main>
        <div className="game-board">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </main>
    </>
  );
}

export default App;
