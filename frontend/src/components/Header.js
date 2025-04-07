import { Link } from "react-router-dom";

function Header({ onNavigateHome }) {
  return (
    <nav className="header">
  <Link className="header__item" to="/" onClick={onNavigateHome}>
    Wordle Game
  </Link>
      <a className="header__item" href="http://localhost:5080/high-scores" rel="noopener noreferrer">
        High Scores
      </a>
      <Link className="header__item" to="/about">
        About
      </Link>
    </nav>
  );
}

export default Header;