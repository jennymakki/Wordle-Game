import { useState , useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import './styles/App.css'

function App() {
  const [playerName, setPlayerName] = useState(null);
  const [wordLength, setWordLength] = useState(null);
  const [randomWord, setRandomWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(""); // To track the current guess being typed
  const [letterStatuses, setLetterStatuses] = useState({}); // Track the status of each letter
  const [gameOver, setGameOver] = useState("false");
  const [winMessage, setWinMessage] = useState("");


  const startGame = (name, length) => {
    setPlayerName(name);
    setWordLength(length);
    setGameOver (false);

    // Fetch a word of the chosen length
    fetch(`http://localhost:5080/random-word?length=${length}`)
      .then((response) => response.json())
      .then((data) => setRandomWord(data.word))
      .catch((error) => console.error("Error fetching word:", error));
  };

  const handleGuessChange = (e) => {
    setCurrentGuess(e.target.value.toUpperCase());
  };

  const checkGuess = (guess) => {
    const result = [];
    const correctWordLetters = randomWord.split("");
    const guessedLetters = guess.split("");

    const correctLetterCounts = {};

    for (let i = 0; i < guessedLetters.length; i++) {
      if (guessedLetters[i] === correctWordLetters[i]) {
        result [i] = { letter: guessedLetters [i], status: "correct"};
        correctLetterCounts[guessedLetters[i]] =
        (correctLetterCounts[guessedLetters[i]] || 0) +1;
      }
    }

    for (let i=0; i < guessedLetters.length; i++) {
      if (!result[i]) {
        const letter = guessedLetters [i];
        const occurencesInCorrectWord = randomWord.split(letter).length -1;
        const occurencesMarked = correctLetterCounts[letter] || 0;

        if (
          randomWord.includes(letter) &&
          occurencesMarked < occurencesInCorrectWord
        ) {
          result [i] = {letter, status: "misplaced" };
          correctLetterCounts[letter] = occurencesMarked +1;
        } else {
          result[i] = {letter, status: "incorrect" };
        }
      }
    }
    return result;
  };

  const handleSubmitGuess = (e) => {
    e.preventDefault();

    const guessLower = currentGuess.toLowerCase();

    if (guessLower.length !== wordLength) {
      alert(`Guess must be ${wordLength} letters long`);
      return;
    }

    setGuesses ([...guesses, guessLower]);

    const updatedStatuses = checkGuess(guessLower);
    const updatedLetterStatuses = { ...letterStatuses};

    updatedStatuses.forEach(( { letter, status }) => {
      updatedLetterStatuses[letter] = status;
    });
    
    setLetterStatuses(updatedLetterStatuses);

    if (guessLower === randomWord) {
      setGameOver(true);
      setWinMessage("Congratulations, you won!");
    }

    setCurrentGuess("");
  };

  if (!playerName) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className="App">
      <Header></Header>
      <h2>Good Luck, {playerName}!</h2>
      <h1>Random Word: {randomWord || "Loading..."}</h1>
      <Grid guesses={guesses} currentGuess={currentGuess} wordLength={wordLength} />
      <Keyboard letterStatuses={letterStatuses} />

      {!gameOver && (
        <form onSubmit={handleSubmitGuess}>
          <input
          type="text"
          value={currentGuess}
          onChange={handleGuessChange}
          maxLength={wordLength}
          placeholder={`Enter a ${wordLength}-letter word`}
          />
          <button type="submit">Submit Guess</button>
        </form>
      )}

      {gameOver && <h2>{winMessage}</h2>}
    </div>
  );
}

export default App;
