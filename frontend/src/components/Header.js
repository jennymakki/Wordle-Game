function Header( {onNavigateHome}) {
    return  (
        <nav className="header">
        <h1 className="header__item" onClick={onNavigateHome}>
          Wordle Game
        </h1>
        <h1 className="header__item">High Scores</h1>
        <h1 className="header__item">About</h1>
      </nav>
    );
}

export default Header;