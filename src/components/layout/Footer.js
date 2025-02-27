import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'var(--dark-text)',
    color: 'white',
    padding: '2rem 0'
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  };

  const headingStyle = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem'
  };

  const textStyle = {
    color: '#ccc',
    marginBottom: '0.5rem'
  };

  const linkStyle = {
    color: '#ccc',
    textDecoration: 'none'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const listItemStyle = {
    marginBottom: '0.5rem'
  };

  const borderTopStyle = {
    borderTop: '1px solid #555',
    marginTop: '2rem',
    paddingTop: '2rem',
    textAlign: 'center',
    color: '#ccc'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          <div>
            <h3 style={headingStyle}>Gut Health App</h3>
            <p style={textStyle}>
              Supporting your gut health journey with personalized recipes and ingredient information.
            </p>
          </div>
          
          <div>
            <h3 style={headingStyle}>Quick Links</h3>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                <Link to="/" style={linkStyle}>Home</Link>
              </li>
              <li style={listItemStyle}>
                <Link to="/recipes" style={linkStyle}>Recipes</Link>
              </li>
              <li style={listItemStyle}>
                <Link to="/ingredients" style={linkStyle}>Ingredients</Link>
              </li>
              <li style={listItemStyle}>
                <Link to="/scan" style={linkStyle}>Scan Food</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 style={headingStyle}>Contact</h3>
            <p style={textStyle}>Email: info@guthealth.app</p>
            <p style={textStyle}>Phone: (123) 456-7890</p>
          </div>
        </div>
        
        <div style={borderTopStyle}>
          <p>&copy; {new Date().getFullYear()} Gut Health App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;