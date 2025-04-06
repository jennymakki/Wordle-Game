import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Winner = mongoose.model("Winner", winnerSchema);

export default Winner;