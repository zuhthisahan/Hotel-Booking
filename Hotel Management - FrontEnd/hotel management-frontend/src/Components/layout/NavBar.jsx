import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import english from "../../assets/images/eng.jpg";
import german from "../../assets/images/german.jpg";
import { Dropdown } from "react-bootstrap";

function NavBar() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
      <div className="container-fluid">
        <p className="me-3 my-2 hotel-text">Peaceful Rest</p>
        <NavLink to={"/"}>
          <img src={logo} alt="Sahan Hotel" className="hotel-logo" />
        </NavLink>

        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScrolls"
          aria-expanded="false"
          aria-label="Toggle-navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                to={"/browse-all-rooms"}
                className="nav-link"
                aria-current="page"
              >
                Browse All Rooms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/admin"} className="nav-link" aria-current="page">
                Admin
              </NavLink>
            </li>
          </ul>

          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink to={"/find-bookings"} className="nav-link">
                Find My Bookings
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbar">
                <li>
                  <Link to={"/login"} className="dropdown-item">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"} className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/logout"} className="dropdown-item">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="custom-dropdown-toggle"
                >
                  <img
                    src={selectedLanguage === "English" ? english : german}
                    alt={selectedLanguage}
                    className="language-flag my-1"
                  />
                  <span className="language-text">{selectedLanguage}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleLanguageChange("English")}
                  >
                    <img
                      src={english}
                      alt="English"
                      className="language-flag"
                    />
                    English
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange("German")}>
                    <img src={german} alt="German" className="language-flag" />
                    German
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
