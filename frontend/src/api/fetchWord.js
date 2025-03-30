export const fetchWord = async (wordLength) => {
    const response = await fetch(`http://localhost:5080/random-word?length=${wordLength}`);
    if (!response.ok) throw new Error("Failed to fetch word");
    const data = await response.json();
    return data.word;
  };