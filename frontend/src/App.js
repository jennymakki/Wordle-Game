import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import About from "./pages/About";
import "./styles/App.css";
import HighScoresRedirect from "./components/HighScoresRedirect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Game />} /> { }
        <Route path="/high-scores" element={<HighScoresRedirect />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;