import React, { useState } from "react";
import "../styles/StartScreen.css";

function StartScreen({ onStart }) {
  const [playerName, setPlayerName] = useState("");
  const [wordLength, setWordLength] = useState(5);
  const [onlyUniqueLetters, setOnlyUniqueLetters] = useState(false);

  const handleStart = () => {
    console.log("Start button clicked");
    if (!playerName.trim()) {
      alert("Enter your name, please!");
      return;
    }
    onStart(playerName, wordLength, onlyUniqueLetters);
  };

  return (
    <div className="start-screen">
      <h2>Enter your name:</h2>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Your Name"
      />
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={onlyUniqueLetters}
          onChange={(e) => setOnlyUniqueLetters(e.target.checked)}
        />
        <span className="slider"></span>
        <span className="label-text">Only unique letters</span>
      </label>
      <h2>Choose Word Length:</h2>
      <select
        value={wordLength}
        onChange={(e) => setWordLength(Number(e.target.value))}
      >
        {[4, 5, 6, 7, 8].map((length) => (
          <option key={length} value={length}>
            {length} letters
          </option>
        ))}
      </select>

      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}

export default StartScreen;
