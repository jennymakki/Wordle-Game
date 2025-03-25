import { useEffect, useState } from "react";

function App() {
  const [randomWord, setRandomWord] = useState("");

  useEffect(() => {
    fetch("http://localhost:5080/random-word")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setRandomWord(data.word))
      .catch((error) => {
        console.error("Error fetching word:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Random Word: {randomWord || "Loading..."}</h1>
    </div>
  );
}

export default App;