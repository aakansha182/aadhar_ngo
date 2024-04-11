import React, { useState, useEffect } from 'react';
import ArrowUp from '../../../assets/icons8-arrow-up.gif'
import '../../../styles/landingpage/LandingPage.css'

const ScrollButton = ({ targetIds }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight / 2;
      const isScrolledToAnyTarget = targetIds.some((id) => {
        const targetElement = document.getElementById(id);
        return targetElement && window.scrollY > targetElement.offsetTop - offset;
      });

      setShowButton(isScrolledToAnyTarget);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetIds]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'transparent', // 
    color: '#fff', 
    border: 'none',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
  };

  return (
    showButton && (
      <button id='scroll-button' style={buttonStyle} className="scroll-button" onClick={scrollToTop}>
        <img src={ArrowUp} alt="arrow" />
      </button>
    )
  );
};

export default ScrollButton;
