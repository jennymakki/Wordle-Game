import Game from "../models/Score.js"; 


const saveGame = async (data) => {
  const game = new Game(data);
  await game.save();
};


const getHighScores = async () => {
  return await Game.find().sort({ score: -1, time: 1 }).limit(10); 
};

export { saveGame, getHighScores };