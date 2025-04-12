import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  name: String,
  startTime: { type: Date, required: true }, 
  endTime: { type: Date, required: true }, 
  timeSpent: { type: Number, required: true }, 
  date: {
    type: Date,
    default: Date.now
  },
  wordLength: { type: Number, required: true },
  onlyUniqueLetters: {type: Boolean, required: true },
});

const Winner = mongoose.model("Winner", winnerSchema);

export default Winner;