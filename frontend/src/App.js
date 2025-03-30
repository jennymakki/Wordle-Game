import { useState } from "react";
import StartScreen from "./components/StartScreen";

function App() {
  const [playerName, setPlayerName] = useState(null);
  const [wordLength, setWordLength] = useState(null);
  const [randomWord, setRandomWord] = useState("");

  const startGame = (name, length) => {
    setPlayerName(name);
    setWordLength(length);

    // Fetch a word of the chosen length
    fetch(`http://localhost:5080/random-word?length=${length}`)
      .then((response) => response.json())
      .then((data) => setRandomWord(data.word))
      .catch((error) => console.error("Error fetching word:", error));
  };

  if (!playerName) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className="App">
      <h1>Wordle</h1>
      <h2>Player: {playerName}</h2>
      <h3>Word Length: {wordLength}</h3>
      <h1>Random Word: {randomWord || "Loading..."}</h1>
    </div>
  );
}

export default App;