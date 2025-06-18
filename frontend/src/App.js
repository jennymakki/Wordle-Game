import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Game from "./components/Game";
import About from "./pages/About";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Game />} /> { }
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;