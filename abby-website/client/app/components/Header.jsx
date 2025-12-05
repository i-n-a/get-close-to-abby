import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

import LogoA from "../assets/images/awif/abby_kortrijk_black.avif";
import Logo from "../assets/images/png/abby_kortrijk_black.png";

import closeIconA from "../assets/images/awif/close-icon.avif";
import closeIcon from "../assets/images/png/close-icon.png";

import expoIconA from "../assets/images/awif/menu-expo-icons.avif";
import expoIcon from "../assets/images/svg/menu-expo-icons.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const navigate = useNavigate();

  const languages = ["EN", "NL", "FR"];

  function handleLangClick(code) {
    setLang(code);
    setLangOpen(false);
    // Simulate navigation to index page
    navigate("/", { replace: true });
  }

  // Close menu with Escape key for accessibility
  function handleKeyDown(e) {
    if (e.key === "Escape") setMenuOpen(false);
  }

  return (
    <header
      className={menuOpen ? "header header--blue" : "header header--white"}
    >
      <h1 className="visually-hidden">Abby</h1>
      <nav>
        <NavLink className="nav__logo" to="/">
          <picture>
            <source srcSet={LogoA} type="image/avif" />
            <img src={Logo} alt="The abby logo" width="4167" height="1136" />
          </picture>
        </NavLink>

        <ul className="fixed__navigation nav__list">
          <li className="nav__list-item">
            <NavLink
              to="/"
              className="button button--l button--yellow buy-tickets"
            >
              {" "}
              Buy Museum Tickets
            </NavLink>
            <div className="nav__list-item nav__lang-wrapper">
              <button
                className="nav__lang-toggle"
                onClick={() => setLangOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={langOpen}
              >
                {lang}
              </button>
              {langOpen && (
                <ul className="nav__lang-dropdown" role="menu">
                  {languages.map((code) =>
                    code !== lang ? (
                      <li key={code} role="menuitem">
                        <button onClick={() => handleLangClick(code)}>
                          {code}
                        </button>
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </div>
          </li>
          <li className="nav__list-item">
            <button
              className="nav__menu-button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="main-menu-overlay"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <picture className="nav__icon nav__icon--close">
                  <source srcSet={closeIconA} type="image/avif" />
                  <img src={closeIcon} alt="Close Nav" />
                </picture>
              ) : (
                // <span className="nav__icon nav__icon--close">&times;</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="nav__icon nav__icon--hamburger"
                  width="40"
                  height="40"
                  viewBox="0 0 58 58"
                  fill="none"
                >
                  <rect
                    className="icon__circle-fill"
                    x="0.5"
                    y="0.5"
                    width="57"
                    height="57"
                    rx="28.5"
                    fill="#F7F7F7"
                  />
                  <rect
                    className="icon__circle-stroke"
                    x="0.5"
                    y="0.5"
                    width="57"
                    height="57"
                    rx="28.5"
                    stroke="#090909"
                  />
                  <line
                    x1="10"
                    y1="21"
                    x2="48"
                    y2="21"
                    stroke="#090909"
                    strokeWidth="2"
                  />
                  <line
                    x1="10"
                    y1="28"
                    x2="48"
                    y2="28"
                    stroke="#090909"
                    strokeWidth="2"
                  />
                  <line
                    x1="10"
                    y1="35"
                    x2="48"
                    y2="35"
                    stroke="#090909"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </nav>

      {/* Overlay menu always in DOM */}
      <div
        id="main-menu-overlay"
        className={`main-menu-overlay ${menuOpen ? "open" : "closed"}`}
        tabIndex="-1"
        aria-hidden={!menuOpen}
        onKeyDown={handleKeyDown}
      >
        <ul
          className="main-menu-overlay__content"
          role="dialog"
          aria-label="Main menu"
        >
          <li>
            <picture className="open-menu__section-icon">
              <source srcSet={expoIconA} type="image/avif" />
              <img src={expoIcon} alt="Icon" />
            </picture>
            <div className="open-menu__section-text">
              <h2>Discover</h2>
              <ul className="open-menu__section-list">
                <li>Expo</li>
                <li>Stadsliving</li>
                <li>Garden</li>
                <li>Collection</li>
                <li>Watch and read</li>
              </ul>
            </div>
          </li>
          <li>
            <picture className="open-menu__section-icon">
              <source srcSet={expoIconA} type="image/avif" />
              <img src={expoIcon} alt="Icon" />
            </picture>
            <div className="open-menu__section-text">
              <h2>Visit</h2>
              <ul className="open-menu__section-list">
                <li>Plan your visit</li>
                <li>Shop & tickets</li>
                <li>
                  <NavLink to="/visit/calendar">Calendar</NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <picture className="open-menu__section-icon">
              <source srcSet={expoIconA} type="image/avif" />
              <img src={expoIcon} alt="Icon" />
            </picture>
            <div className="open-menu__section-text">
              <h2>Take Part</h2>
              <ul className="open-menu__section-list">
                <li>Open House</li>
                <li>
                  <NavLink to="/">Open Calls</NavLink>
                </li>
                <li>Becoming a Friend</li>
                <li>Support Abby</li>
                <li>Work at Abby</li>
              </ul>
            </div>
          </li>
          <li>
            <picture className="open-menu__section-icon">
              <source srcSet={expoIconA} type="image/avif" />
              <img src={expoIcon} alt="Icon" />
            </picture>
            <div className="open-menu__section-text">
              <h2>About</h2>
              <ul className="open-menu__section-list">
                <li>Contact</li>
                <li>FAQ</li>
                <li>Location</li>
                <li>Jobs</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
