import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarStyle = {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const logoStyle = {
    color: 'var(--primary)',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    textDecoration: 'none'
  };

  const menuStyle = {
    display: 'flex',
    gap: '2rem'
  };

  const mobileBtnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  };

  const linkStyle = {
    color: 'var(--dark-text)',
    textDecoration: 'none'
  };

  const mobileMenuStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    borderTop: '1px solid #eee',
    padding: '1rem',
    backgroundColor: 'white'
  };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>Gut Health App</Link>
        
        {/* Mobile menu button */}
        <div className="mobile-menu" style={{ display: window.innerWidth < 768 ? 'block' : 'none' }}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={mobileBtnStyle}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Desktop menu */}
        <div className="desktop-menu" style={{ display: window.innerWidth >= 768 ? 'flex' : 'none', ...menuStyle }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/recipes" style={linkStyle}>Recipes</Link>
          <Link to="/ingredients" style={linkStyle}>Ingredients</Link>
          <Link to="/scan" style={linkStyle}>Scan Food</Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div style={mobileMenuStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/recipes" style={linkStyle}>Recipes</Link>
          <Link to="/ingredients" style={linkStyle}>Ingredients</Link>
          <Link to="/scan" style={linkStyle}>Scan Food</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;