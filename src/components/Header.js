export default function Header() {
  
  return (
    <header className="header">
        {/* Logo */}
        <div className="header-logo">
          <a href="/">
            <img
              alt="MMH Logo"
              src="./transparentLogo.png"
              width={125}
            />
          </a>
        </div>
        {/* Blurb */}
        <div className="header-blurb">
          A collection of one developer's highest recs in a city 5,280ft up!
        </div>
      </header>
  );
}