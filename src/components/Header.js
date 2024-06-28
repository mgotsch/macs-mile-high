import  {useState, useEffect} from 'react';

export default function Header() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const changeBackground = () => {
    if(window.scrollY >= 90) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);
  
  return (
    <header className="header">
        {/* Logo */}
        <a href="/">
          <img
            alt="MMH Logo"
            src="./transparentLogo.png"
            width={125}
          />
        </a>
        {/* <p>A collection of one developer's highest recs in a city 5,280ft above the competition!</p> */}
      </header>
  );
}