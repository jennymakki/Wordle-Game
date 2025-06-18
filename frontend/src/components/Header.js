import { Link } from "react-router-dom";

function Header({ onNavigateHome }) {
  return (
    <nav className="header">
  <Link className="header__item" to="/" onClick={onNavigateHome}>
    Wordle Game
  </Link>
  <Link className="header__item" to="/high-scores">
        High Scores
      </Link>
      <Link className="header__item" to="/about">
        About
      </Link>
    </nav>
  );
}

export default Header;