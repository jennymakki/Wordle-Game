import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import { submitScore } from "./api/gameService";
import './styles/App.css'

function App() {
  const [playerName, setPlayerName] = useState(null);
  const [wordLength, setWordLength] = useState(null);
  const [randomWord, setRandomWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(""); 
  const [letterStatuses, setLetterStatuses] = useState({});
  const [gameOver, setGameOver] = useState("false");
  const [winMessage, setWinMessage] = useState("");
  const [gameLost, setGameLost] = useState(false);


  const startGame = (name, length) => {
    setPlayerName(name);
    setWordLength(length);
    setGameOver (false);
    setGameLost(false);

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
  
    setGuesses([...guesses, guessLower]);
  
    const updatedStatuses = checkGuess(guessLower);
    const updatedLetterStatuses = { ...letterStatuses };
  
    updatedStatuses.forEach(({ letter, status }) => {
      updatedLetterStatuses[letter] = status;
    });
  
    setLetterStatuses(updatedLetterStatuses);
  

    if (guessLower === randomWord) {
      setGameOver(true);
      setWinMessage("Congratulations, you won!");

      submitScore(playerName, guesses.length + 1); 
    }
  

    if (guesses.length === 5) {
      setGameLost(true);
      setGameOver(true);

      submitScore(playerName, guesses.length + 1);
    }
  
    setCurrentGuess("");
  };

  if (!playerName) {
    return <StartScreen onStart={startGame} />;
  }

  const handleNavigateHome = () => {
    setPlayerName(null);
    setWordLength(null);
    setRandomWord("");
    setGuesses([]);
    setCurrentGuess("");
    setLetterStatuses({});
    setGameOver(false);
    setWinMessage("");
    setGameLost(false);
  };

  const restartGame = () => {
    setGameLost(false);
    setGuesses([]);
    setCurrentGuess("");
    setLetterStatuses({});
    setGameOver(false);
    setWinMessage("");
  };

  return (
    <div className="App">
      <Header onNavigateHome={handleNavigateHome} />
      <h2>Good Luck, {playerName}!</h2>
      {gameOver && (
        <div>
          <h2>{winMessage || "You lost, better luck next time!"}</h2>
        </div>
      )}
      {!gameOver && (
        <form className="guess-form" onSubmit={handleSubmitGuess}>
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
      <Grid guesses={guesses} wordLength={wordLength} randomWord={randomWord} />
      <Keyboard letterStatuses={letterStatuses} />
      { <h1>Random Word: {randomWord || "Loading..."}</h1> }
    </div>
  );
}

export default App;
