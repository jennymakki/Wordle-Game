import React, { useState } from "react";
import StartScreen from "./StartScreen";
import Grid from "./Grid";
import { submitScore } from "../api/submitScore";

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
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  const saveWinner = async (name, startTime, wordLength, onlyUniqueLetters) => {
    try {
      const endTime = new Date();
      const timeSpent = Math.floor((endTime - new Date(startTime)) / 1000);
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5080";

      await fetch(`${API_URL}/save-winner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          startTime: new Date(startTime).toISOString(),
          endTime: endTime.toISOString(),
          timeSpent,
          wordLength,
          onlyUniqueLetters,
        }),
      });

      console.log("Winner saved!");
    } catch (err) {
      console.error("Failed to save winner:", err);
    }
  };

  const handleSaveWinner = () => {
    if (startTime) {
      saveWinner(playerName, startTime, wordLength, onlyUniqueLetters);
    }
    setShowSavePrompt(false);
  };

  const handleCancelSave = () => {
    setShowSavePrompt(false);
  };

  const startGame = async (name, length, onlyUnique) => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5080";
    const response = await fetch(`${API_URL}/start-game`, { method: "POST" });
    const data = await response.json();
    setStartTime(data.startTime);

    setPlayerName(name);
    setWordLength(length);
    setOnlyUniqueLetters(onlyUnique);
    setGameOver(false);
    setGameLost(false);

    fetch(`${API_URL}/random-word?length=${length}&unique=${onlyUnique}`)
      .then((res) => res.json())
      .then((data) => setRandomWord(data.word))
      .catch((err) => console.error("Error fetching word:", err));
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
        result[i] = { letter: guessedLetters[i], status: "correct" };
        correctLetterCounts[guessedLetters[i]] = (correctLetterCounts[guessedLetters[i]] || 0) + 1;
      }
    }

    for (let i = 0; i < guessedLetters.length; i++) {
      if (!result[i]) {
        const letter = guessedLetters[i];
        const occurrencesInCorrectWord = randomWord.split(letter).length - 1;
        const occurrencesMarked = correctLetterCounts[letter] || 0;

        if (randomWord.includes(letter) && occurrencesMarked < occurrencesInCorrectWord) {
          result[i] = { letter, status: "misplaced" };
          correctLetterCounts[letter] = occurrencesMarked + 1;
        } else {
          result[i] = { letter, status: "incorrect" };
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
  
    const newGuesses = [...guesses, guessLower];
    setGuesses(newGuesses);
  
    if (guessLower === randomWord.toLowerCase()) {
      setWinMessage("Congratulations! You won!");
      setGameOver(true);
      setShowSavePrompt(true);
      submitScore(playerName, newGuesses.length, wordLength, onlyUniqueLetters);
      setCurrentGuess("");
      return;
    }
  
    if (newGuesses.length === 6) {
      setGameLost(true);
      setGameOver(true);
      submitScore(playerName, newGuesses.length, wordLength, onlyUniqueLetters);
    }
  
    setCurrentGuess("");
  };

  if (!playerName) {
    return <StartScreen onStart={startGame} />;
  }

  const restartGame = () => {
    setGameLost(false);
    setGuesses([]);
    setCurrentGuess("");
    setLetterStatuses({});
    setGameOver(false);
    setWinMessage("");
    setStartTime(null);
  };

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

  return (
    <div>
      <h2>Good Luck, {playerName}!</h2>

      {gameOver && (
        <div>
          <h2>{winMessage || `You lost! The word was: ${randomWord}`}</h2>
          {showSavePrompt && (
            <div className="save-prompt">
              <p>Would you like to save your win to the high scores?</p>
              <div className="save_buttons">
                <button className="Save_button" onClick={handleSaveWinner}>
                  Yes, Save
                </button>
                <button className="No-save_button" onClick={handleCancelSave}>
                  No, Thanks
                </button>
              </div>
            </div>
          )}
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
          <button type="submit" disabled={currentGuess.length !== wordLength}>
            Submit Guess
          </button>
        </form>
      )}

      <Grid guesses={guesses} wordLength={wordLength} randomWord={randomWord} />
    </div>
  );
};

export default Game;