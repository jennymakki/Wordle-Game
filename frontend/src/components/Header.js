function Header({ onNavigateHome }) {
  return (
    <nav className="header">
      <a className="header__item" onClick={onNavigateHome}>
        Wordle Game
      </a>
      <a className="header__item" href="http://localhost:5080/high-scores" target="_blank" rel="noopener noreferrer">
        High Scores
      </a>
      <a className="header__item">About</a>
    </nav>
  );
}

export default Header;