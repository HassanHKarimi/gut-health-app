import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const HomePage = () => {
  const heroStyle = {
    backgroundColor: 'rgba(79, 121, 66, 0.1)',
    padding: '2rem',
    borderRadius: '0.5rem',
    marginBottom: '2rem'
  };

  const heroContentStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  };

  const heading1Style = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'var(--primary)',
    marginBottom: '1rem'
  };

  const subheadingStyle = {
    fontSize: '1.25rem',
    color: 'var(--dark-text)',
    marginBottom: '2rem'
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '300px',
    margin: '0 auto'
  };

  const featuresContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const featureStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const featureIconContainerStyle = {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem auto'
  };

  const heading2Style = {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'var(--dark-text)',
    marginBottom: '0.5rem'
  };

  const paragraphStyle = {
    color: '#666'
  };

  const ingredientsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem'
  };

  const ingredientItemStyle = {
    backgroundColor: 'var(--light-bg)',
    padding: '1rem',
    borderRadius: '0.25rem',
    textAlign: 'center',
    cursor: 'pointer'
  };

  const ctaStyle = {
    backgroundColor: 'rgba(225, 173, 1, 0.1)',
    borderRadius: '0.5rem',
    padding: '2rem',
    textAlign: 'center'
  };

  return (
    <Layout>
      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Hero Section */}
        <div style={heroStyle}>
          <div style={heroContentStyle}>
            <h1 style={heading1Style}>
              Support Your Gut Health Journey
            </h1>
            <p style={subheadingStyle}>
              Discover recipes and ingredients that promote a healthy gut microbiome
            </p>
            <div style={buttonContainerStyle}>
              <Link to="/scan" className="btn btn-primary">
                Scan Your Ingredients
              </Link>
              <Link to="/recipes" className="btn btn-secondary">
                Browse Recipes
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={featuresContainerStyle}>
          <div style={featureStyle}>
            <div style={{
              ...featureIconContainerStyle,
              backgroundColor: 'rgba(79, 121, 66, 0.1)'
            }}>
              <svg style={{ width: '2rem', height: '2rem', color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 style={heading2Style}>Scan Your Food</h3>
            <p style={paragraphStyle}>
              Take photos of your fridge or grocery cart and get personalized recipe recommendations.
            </p>
          </div>
          
          <div style={featureStyle}>
            <div style={{
              ...featureIconContainerStyle,
              backgroundColor: 'rgba(225, 173, 1, 0.1)'
            }}>
              <svg style={{ width: '2rem', height: '2rem', color: 'var(--secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 style={heading2Style}>Recipe Catalog</h3>
            <p style={paragraphStyle}>
              Browse our extensive collection of gut-healthy recipes for every occasion.
            </p>
          </div>
          
          <div style={featureStyle}>
            <div style={{
              ...featureIconContainerStyle,
              backgroundColor: 'rgba(123, 63, 0, 0.1)'
            }}>
              <svg style={{ width: '2rem', height: '2rem', color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 style={heading2Style}>Ingredient Guide</h3>
            <p style={paragraphStyle}>
              Learn about ingredients that support your gut health and why they're beneficial.
            </p>
          </div>
        </div>

        {/* Featured Ingredients */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ ...heading2Style, textAlign: 'center', marginBottom: '1.5rem' }}>Featured Gut-Healthy Ingredients</h2>
          <div style={ingredientsGridStyle}>
            {['Yogurt', 'Kimchi', 'Sauerkraut', 'Kombucha', 'Kefir', 'Miso', 'Tempeh', 'Fiber-rich foods'].map((item) => (
              <div key={item} style={ingredientItemStyle}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div style={ctaStyle}>
          <h2 style={{ ...heading2Style, marginBottom: '1rem' }}>Ready to improve your gut health?</h2>
          <p style={{ ...paragraphStyle, marginBottom: '1.5rem' }}>
            Get started with our personalized recommendations based on the ingredients you have.
          </p>
          <Link to="/scan" className="btn btn-secondary">
            Upload a Photo Now
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;