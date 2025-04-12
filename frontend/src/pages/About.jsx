import React from "react";

const About = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto", lineHeight: "1.6" }}>
      <h1>About this Wordle Game</h1>
      <p>
        Welcome to my custom Wordle game! This is an interactive puzzle game inspired by the popular 
        word-guessing game "Wordle." Built using React for the frontend, Express for the backend, and MongoDB 
        to store the high scores, this project demonstrates a full-stack web application.
      </p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Customizable word length.</li>
        <li>Unique letter mode.</li>
        <li>High score tracking rendered server-side, ensuring real-time updates and persistence even after page reloads.</li>
        <li>Responsive design, optimized for both desktop and mobile devices.</li>
      </ul>
      
      <h2>Tech Stack</h2>
      <p>
        This project uses the following technologies:
      </p>
      <ul>
        <li><strong>React</strong> for building the interactive frontend and managing state.</li>
        <li><strong>Express</strong> for the backend API, handling requests and serving data.</li>
        <li><strong>MongoDB</strong> to store high scores, which are rendered server-side for improved performance and consistency.</li>
        <li><strong>CSS</strong> for styling the game and providing a smooth user experience.</li>
      </ul>

      <h2>Challenges & Solutions</h2>
      <p>
        Throughout the development of this game, I encountered a few challenges that required creative solutions:
      </p>
      <ul>
        <li>One challenge was implementing the high score system. I needed to find a way to save scores to the backend and retrieve them efficiently, which I solved by integrating MongoDB for data persistence.</li>
        <li>Another challenge was implementing the letter status system (correct, misplaced, incorrect) in the game. I had to ensure that the game provided real-time feedback while making sure it was both accurate and fun.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        This project was a fun way to practice my full-stack development skills, and I'm proud of the progress I've made. 
        Feel free to play the game, explore the code, and reach out if you have any questions or suggestions.
      </p>

      <h2>Game Rules</h2>
<p>Here are the simple rules to get you started:</p>
<ul style={{ textAlign: "left" }}>
  <li><strong>Objective:</strong> Guess the secret word, which is a random word chosen by the game. You have six attempts to guess it.</li>
  <li><strong>Guessing:</strong> Each guess must be a word with the correct number of letters. The number of letters is based on the game settings you chose (e.g., 5-letter word, 6-letter word, etc.).</li>
  <li><strong>Feedback:</strong> After each guess, the game will give you feedback on your guess:</li>
  <ul>
    <li><strong>Green</strong> - Correct letter in the correct position.</li>
    <li><strong>Yellow</strong> - Correct letter in the wrong position.</li>
    <li><strong>Gray</strong> - Incorrect letter (not in the word).</li>
  </ul>
  <li><strong>Win Condition:</strong> You win the game if you guess the correct word within six tries!</li>
  <li><strong>Lose Condition:</strong> If you use all your attempts without guessing the correct word, you lose.</li>
  <li><strong>High Scores:</strong> If you win, you can save your score to the high score list! This shows how many attempts it took you to guess the word and the time you spent playing.</li>
  <li><strong>Unique Letters (Optional):</strong> If you enable this mode, the secret word will only contain unique letters (no repeating letters).</li>
</ul>
<p>Good luck, and have fun!</p>

    </div>
  
  );
};

export default About;