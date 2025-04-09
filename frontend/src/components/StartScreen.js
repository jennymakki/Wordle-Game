import { useState } from "react";
import "../styles/StartScreen.css";

function StartScreen({ onStart }) {
  const [name, setName] = useState("");
  const [wordLength, setWordLength] = useState(5);
  const [onlyUniqueLetters, setOnlyUniqueLetters] = useState(false);

  const handleStart = () => {
    if (!name.trim()) {
      alert("Enter your name, please!");
      return;
    }
    onStart(name, wordLength, onlyUniqueLetters);
  };

  return (
    <div className="start-screen">
      <h2>Enter your name:</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
