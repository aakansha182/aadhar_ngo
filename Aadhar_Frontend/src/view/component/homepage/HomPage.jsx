import React, { useState } from "react";
import "../../../styles/homepage/HomePage.css";
import { Link } from "react-scroll";
import sasi from "../../../assets/image/sasi-icon.png";


const HomPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="home">
      <header >
        {/* <div className="home-logo"> */}
        <Link to="home" spy={true} smooth={true} duration={300} className="image">
          <img src={sasi} alt="Logo"  />
        </Link>
        {/* </div> */}
        {/* <div className="main"> */}
        <nav id="navbar" className={isMenuOpen ? "open" : ""}>
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={300}
            className="active"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={300}
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="event"
            spy={true}
            smooth={true}
            duration={500}
            onClick={toggleMenu}
          >
            Event
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </nav>
        <div className="nav-btn" onClick={toggleMenu} style={{ color: "white" }}>
          ☰
        </div>
        {isMenuOpen && (
          <div id='nav-burger'>
            <a href='#home'>Home</a>
            <a href='#about'>About</a>
            <a href='#event'>Event</a>
            <a href='#contact'>Contact</a>
          </div>
        )}
        {/* </div> */}
      </header>
      <div className="content">
        <h2>
          Save The <span className="child">Children</span>
        </h2>
        <span className="ch">
          For The new <span className="ch2">world</span>
        </span>{" "}
        <br />
        <p className="par">
        we believe in the power of compassion and collective action to make 
        a positive difference in the world.
        </p>
        <button className="cn">
          <a href="#d">Donate Now</a>
        </button>
      </div>
    </section>
  );
};

export default HomPage;