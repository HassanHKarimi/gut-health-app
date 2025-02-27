import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

const ScanFoodPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState([]);

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem'
  };

  const heading1Style = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'var(--primary)',
    marginBottom: '1.5rem',
    textAlign: 'center'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const textCenterStyle = {
    textAlign: 'center'
  };

  const paragraphStyle = {
    color: 'var(--dark-text)',
    marginBottom: '1.5rem'
  };

  const fileInputContainerStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const fileInputLabelStyle = {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--primary)',
    color: 'white',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontWeight: '500'
  };

  const imageContainerStyle = {
    marginTop: '2rem'
  };

  const heading2Style = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: 'var(--dark-text)'
  };

  const imagePreviewStyle = {
    backgroundColor: '#f5f5f5',
    padding: '0.5rem',
    borderRadius: '0.25rem'
  };

  const imageStyle = {
    maxHeight: '24rem',
    maxWidth: '100%',
    margin: '0 auto',
    display: 'block',
    borderRadius: '0.25rem'
  };

  const loadingStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 0'
  };

  const spinnerStyle = {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid var(--primary)',
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  };

  const ingredientsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const ingredientItemStyle = {
    backgroundColor: 'var(--light-bg)',
    padding: '1rem',
    borderRadius: '0.25rem',
    textAlign: 'center'
  };

  const recipeGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  };

  const recipeCardStyle = {
    backgroundColor: 'white',
    border: '1px solid #eee',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  };

  const recipeNameStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'var(--dark-text)',
    marginBottom: '0.5rem'
  };

  const recipeLinkStyle = {
    color: 'var(--primary)',
    textDecoration: 'none'
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        // In a real app, we would send this image to a backend for analysis
        simulateImageAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateImageAnalysis = () => {
    setIsAnalyzing(true);
    setResults([]);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      // Mock detected ingredients
      setResults([
        'Carrots',
        'Broccoli',
        'Kale',
        'Greek Yogurt',
        'Garlic',
        'Onions',
        'Ginger'
      ]);
    }, 2000);
  };

  // Create keyframes style for spinner animation
  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <Layout>
      <style>{keyframesStyle}</style>
      <div style={containerStyle}>
        <h1 style={heading1Style}>Scan Your Food</h1>
        
        <div style={cardStyle}>
          <div style={textCenterStyle}>
            <p style={paragraphStyle}>
              Take a photo of your fridge, pantry, or grocery items and we'll identify ingredients and suggest gut-healthy recipes.
            </p>
            
            <div style={fileInputContainerStyle}>
              <label style={fileInputLabelStyle}>
                Upload Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
          
          {selectedImage && (
            <div style={imageContainerStyle}>
              <h2 style={heading2Style}>Your Image</h2>
              <div style={imagePreviewStyle}>
                <img 
                  src={selectedImage} 
                  alt="Uploaded food" 
                  style={imageStyle} 
                />
              </div>
            </div>
          )}
          
          {isAnalyzing && (
            <div style={loadingStyle}>
              <div style={spinnerStyle}></div>
              <p>Analyzing your image...</p>
            </div>
          )}
          
          {results.length > 0 && (
            <div>
              <h2 style={{ ...heading2Style, marginTop: '2rem' }}>Detected Ingredients</h2>
              <div style={ingredientsGridStyle}>
                {results.map((ingredient, index) => (
                  <div key={index} style={ingredientItemStyle}>
                    {ingredient}
                  </div>
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h2 style={heading2Style}>Recommended Recipes</h2>
                <p style={{ ...paragraphStyle, marginBottom: '1.5rem' }}>
                  Here are some gut-healthy recipes you can make with these ingredients:
                </p>
                <div style={recipeGridStyle}>
                  {[
                    { name: 'Gut-Healing Vegetable Soup', ingredients: ['Carrots', 'Broccoli', 'Garlic', 'Onions', 'Ginger'] },
                    { name: 'Probiotic Yogurt Bowl', ingredients: ['Greek Yogurt', 'Kale'] },
                    { name: 'Anti-Inflammatory Stir Fry', ingredients: ['Broccoli', 'Garlic', 'Ginger', 'Onions'] },
                    { name: 'Fermented Vegetable Salad', ingredients: ['Carrots', 'Kale'] }
                  ].map((recipe, index) => (
                    <div key={index} style={recipeCardStyle}>
                      <h3 style={recipeNameStyle}>{recipe.name}</h3>
                      <p style={{ ...paragraphStyle, marginBottom: '1rem' }}>Using: {recipe.ingredients.join(', ')}</p>
                      <a href="#" style={recipeLinkStyle}>View Recipe</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ScanFoodPage;