import express from "express";
import Winner from "../models/Winner.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, startTime, endTime } = req.body;

  if (!name || !startTime || !endTime) {
    return res.status(400).json({ error: "Name, startTime, and endTime are required" });
  }

  const timeSpent = Math.floor((new Date(endTime) - new Date(startTime)) / 1000); 

  try {
    const winner = new Winner({
      name,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      timeSpent,
    });
    
    await winner.save();
    res.status(201).json({ message: "Winner saved!", winner });
  } catch (err) {
    console.error("Error saving winner:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;