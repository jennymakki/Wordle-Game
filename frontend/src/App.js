import { useState , useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import './styles/App.css'

function App() {
  const [playerName, setPlayerName] = useState(null);
  const [wordLength, setWordLength] = useState(null);
  const [randomWord, setRandomWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(""); // To track the current guess being typed
  const [letterStatuses, setLetterStatuses] = useState({}); // Track the status of each letter

  const startGame = (name, length) => {
    setPlayerName(name);
    setWordLength(length);

    // Fetch a word of the chosen length
    fetch(`http://localhost:5080/random-word?length=${length}`)
      .then((response) => response.json())
      .then((data) => setRandomWord(data.word))
      .catch((error) => console.error("Error fetching word:", error));
  };

  const handleGuess = (guess) => {
    setGuesses([...guesses, guess]);

    // Update letter statuses
    const newStatuses = { ...letterStatuses };
    guess.split("").forEach((letter, index) => {
      if (randomWord[index] === letter) {
        newStatuses[letter] = "green"; // Correct letter
      } else if (randomWord.includes(letter)) {
        newStatuses[letter] = "yellow"; // Wrong position but present in the word
      } else {
        newStatuses[letter] = "gray"; // Not in the word
      }
    });

    setLetterStatuses(newStatuses);
    setCurrentGuess(""); // Clear the current guess after submitting
  };

  // Handle keyboard input (typing letters, backspace, and enter)
  const handleKeydown = (event) => {
    if (event.key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1)); // Remove last letter on Backspace
    } else if (event.key === "Enter") {
      if (currentGuess.length === wordLength) {
        handleGuess(currentGuess); // Submit guess if the word length is correct
      }
    } else if (/^[a-zA-Z]$/.test(event.key) && currentGuess.length < wordLength) {
      setCurrentGuess(currentGuess + event.key.toUpperCase()); // Add the letter to current guess
    }
  };

  // Use effect to add keydown event listener on mount and clean it up on unmount
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentGuess]);

  if (!playerName) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className="App">
      <h1>Wordle</h1>
      <h2>Player: {playerName}</h2>
      <h3>Word Length: {wordLength}</h3>
      <h1>Random Word: {randomWord || "Loading..."}</h1>
      <Grid guesses={guesses} currentGuess={currentGuess} wordLength={wordLength} />
      <Keyboard letterStatuses={letterStatuses} />
    </div>
  );
}

export default App;
