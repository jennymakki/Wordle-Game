import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import { submitScore } from "./api/gameService";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import './styles/App.css';

// Save winner data to the server
const saveWinner = async (name, startTime) => {
  try {
    const endTime = new Date(); // Set endTime as current time when the game ends
    const timeSpent = Math.floor((endTime - new Date(startTime)) / 1000); // Calculate time spent in seconds

    await fetch("http://localhost:5080/save-winner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        startTime: new Date(startTime),
        endTime, 
        timeSpent,
      }),
    });

    console.log("Winner saved!");
  } catch (err) {
    console.error("Failed to save winner:", err);
  }
};

const Game = () => {
  const [playerName, setPlayerName] = useState(null);
  const [wordLength, setWordLength] = useState(null);
  const [randomWord, setRandomWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(""); 
  const [letterStatuses, setLetterStatuses] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [gameLost, setGameLost] = useState(false);
  const [onlyUniqueLetters, setOnlyUniqueLetters] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Function to start a new game
  const startGame = async (name, length, onlyUnique) => {
    const response = await fetch('/start-game', { method: 'POST' });
    const data = await response.json();
    const startTime = data.startTime;
    setStartTime(startTime);
    
    setPlayerName(name);
    setWordLength(length);
    setOnlyUniqueLetters(onlyUnique);
    setGameOver(false);
    setGameLost(false);

    fetch(`http://localhost:5080/random-word?length=${length}&unique=${onlyUnique}`)
      .then((response) => response.json())
      .then((data) => setRandomWord(data.word))
      .catch((error) => console.error("Error fetching word:", error));
  };

  const handleGuessChange = (e) => {
    setCurrentGuess(e.target.value.toUpperCase());
  };

  // Function to check the user's guess
  const checkGuess = (guess) => {
    const result = [];
    const correctWordLetters = randomWord.split("");
    const guessedLetters = guess.split("");

    const correctLetterCounts = {};

    for (let i = 0; i < guessedLetters.length; i++) {
      if (guessedLetters[i] === correctWordLetters[i]) {
        result[i] = { letter: guessedLetters[i], status: "correct"};
        correctLetterCounts[guessedLetters[i]] =
        (correctLetterCounts[guessedLetters[i]] || 0) +1;
      }
    }

    for (let i=0; i < guessedLetters.length; i++) {
      if (!result[i]) {
        const letter = guessedLetters[i];
        const occurencesInCorrectWord = randomWord.split(letter).length -1;
        const occurencesMarked = correctLetterCounts[letter] || 0;

        if (
          randomWord.includes(letter) &&
          occurencesMarked < occurencesInCorrectWord
        ) {
          result[i] = {letter, status: "misplaced" };
          correctLetterCounts[letter] = occurencesMarked +1;
        } else {
          result[i] = {letter, status: "incorrect" };
        }
      }
    }
    return result;
  };

  // Function to handle submission of a guess
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

      if (startTime) {
        saveWinner(playerName, startTime);
      }
    }
  
    if (guesses.length === 5) {
      setGameLost(true);
      setGameOver(true);

      submitScore(playerName, guesses.length + 1);
    }
  
    setCurrentGuess("");
  };

  // If playerName is not set, show the start screen
  if (!playerName) {
    return <StartScreen onStart={startGame} />;
  }

  // Function to navigate back to the home screen (reset game)
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
    setStartTime(null);
  };

  // Function to restart the game
  const restartGame = () => {
    setGameLost(false);
    setGuesses([]);
    setCurrentGuess("");
    setLetterStatuses({});
    setGameOver(false);
    setWinMessage("");
    setStartTime(null);
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
      <h1>Random Word: {randomWord || "Loading..."}</h1>
    </div>
  );
};

// Main App component that includes routing
function App() {
  return (
    <Router>
      <Header onNavigateHome={() => {}} />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;