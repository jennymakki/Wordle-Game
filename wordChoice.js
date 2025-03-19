export default function wordChoice(length = null, allowDuplicates = true) {
    const words = ["cykla", "solen", "våg", "hund", "äpple", "tåg", "lampa", "robot"];

    let filteredWords = words;

    // Filter words if length is specified. 
    if (length !== null) {
        filteredWords = filteredWords.filter(word => word.length === length);
    }

    // Filter out words with the same letters in them if duplicate words are not allowed.
    if (!allowDuplicates) {
        filteredWords = filteredWords.filter(word => new Set(word).size === word.length);
    }

    // Return null if there are no matching words to the criteria. 
    if (filteredWords.length === 0) {
        console.warn("No words match the given criteria.");
        return null;
    }

    // Randomly select a word with the given criteria. 
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}