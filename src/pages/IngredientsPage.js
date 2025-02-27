import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const IngredientsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToGroceryList } = useRecipes();
  // Mock ingredients data
  const mockIngredients = [
    {
      id: 1,
      name: 'Yogurt',
      category: 'Dairy',
      gutHealthRating: 5,
      benefits: [
        'Contains probiotics that support digestive health',
        'Helps maintain gut microbiome balance',
        'May reduce inflammation in the gut',
        'Supports immune function'
      ],
      description: 'Yogurt is a fermented dairy product that contains beneficial bacteria known as probiotics. These live microorganisms help maintain a healthy balance of gut bacteria, which is essential for digestion and overall health.',
      tips: 'Choose plain, unsweetened yogurt with live active cultures. Greek yogurt is especially high in protein and lower in lactose.'
    },
    {
      id: 2,
      name: 'Kimchi',
      category: 'Fermented',
      gutHealthRating: 5,
      benefits: [
        'Rich in probiotics that support gut health',
        'Contains dietary fiber that feeds beneficial bacteria',
        'May improve digestion and reduce inflammation',
        'Contains antioxidants that protect gut cells'
      ],
      description: 'Kimchi is a traditional Korean side dish made from fermented vegetables, primarily cabbage and Korean radishes. The fermentation process creates beneficial probiotics that support digestive health and immune function.',
      tips: 'Store kimchi in a glass container in the refrigerator. The flavor intensifies with age, so adjust your consumption based on your preference.'
    },
    {
      id: 3,
      name: 'Garlic',
      category: 'Vegetables',
      gutHealthRating: 4,
      benefits: [
        'Contains prebiotic fibers that feed good gut bacteria',
        'Has antimicrobial properties that may help balance gut flora',
        'May reduce inflammation in the digestive tract',
        'Supports immune function'
      ],
      description: 'Garlic is a pungent vegetable that contains prebiotic fibers, which serve as food for beneficial gut bacteria. It also has natural antimicrobial properties that may help maintain a healthy balance of gut microbes.',
      tips: 'For maximum benefits, crush or chop garlic and let it sit for 10 minutes before cooking. This allows for the formation of beneficial compounds.'
    },
    {
      id: 4,
      name: 'Flaxseeds',
      category: 'Seeds',
      gutHealthRating: 4,
      benefits: [
        'High in soluble fiber that supports regular bowel movements',
        'Contains lignans that may promote gut health',
        'Helps feed beneficial gut bacteria',
        'May reduce gut inflammation'
      ],
      description: 'Flaxseeds are small seeds rich in omega-3 fatty acids and both soluble and insoluble fiber. The soluble fiber helps slow digestion and may reduce digestive discomfort, while insoluble fiber adds bulk to stool.',
      tips: 'Grind flaxseeds before consuming them to make their nutrients more bioavailable. Store ground flaxseeds in the refrigerator to prevent oxidation.'
    },
    {
      id: 5,
      name: 'Sauerkraut',
      category: 'Fermented',
      gutHealthRating: 5,
      benefits: [
        'Contains live probiotics that support gut health',
        'Rich in enzymes that may aid digestion',
        'Provides fiber that feeds beneficial bacteria',
        'May help reduce digestive symptoms'
      ],
      description: 'Sauerkraut is fermented cabbage that contains living probiotics. The fermentation process creates beneficial bacteria that can improve gut health, aid digestion, and support immune function.',
      tips: 'Choose unpasteurized sauerkraut to ensure it contains live probiotics. Heat can kill these beneficial bacteria, so add sauerkraut to dishes after cooking.'
    },
    {
      id: 6,
      name: 'Ginger',
      category: 'Roots',
      gutHealthRating: 4,
      benefits: [
        'May reduce nausea and digestive discomfort',
        'Contains compounds that can reduce gut inflammation',
        'Helps stimulate digestive enzymes',
        'May improve gut motility'
      ],
      description: 'Ginger is a root with powerful anti-inflammatory and antioxidant properties. It has been used for centuries to aid digestion, reduce nausea, and alleviate digestive discomfort.',
      tips: 'Fresh ginger can be grated into teas, smoothies, and dishes. For digestive support, try sipping ginger tea before or after meals.'
    },
    {
      id: 7,
      name: 'Kefir',
      category: 'Dairy',
      gutHealthRating: 5,
      benefits: [
        'Contains a diverse range of probiotics',
        'May improve lactose digestion',
        'Supports immune function through gut health',
        'Can help balance gut microbiome'
      ],
      description: 'Kefir is a fermented milk drink made by adding kefir grains to milk. It contains a wider range of beneficial bacteria than yogurt, making it particularly effective for gut health support.',
      tips: 'Kefir can be consumed plain or added to smoothies. If you\'re sensitive to dairy, look for water kefir or coconut kefir alternatives.'
    },
    {
      id: 8,
      name: 'Jerusalem Artichoke',
      category: 'Vegetables',
      gutHealthRating: 4,
      benefits: [
        'Rich in inulin, a prebiotic fiber',
        'Feeds beneficial gut bacteria',
        'Supports digestive regularity',
        'May help improve mineral absorption'
      ],
      description: 'Jerusalem artichokes, also known as sunchokes, are root vegetables rich in inulin, a type of soluble fiber that acts as a prebiotic. Prebiotics feed beneficial gut bacteria, promoting their growth and activity.',
      tips: 'Start with small amounts if you\'re not used to consuming prebiotic foods, as they can cause gas and bloating in some people until your gut adapts.'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  
  const categories = ['All', 'Dairy', 'Fermented', 'Vegetables', 'Seeds', 'Roots'];
  
  const filteredIngredients = mockIngredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ingredient.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const selectedIngredientData = selectedIngredient 
    ? mockIngredients.find(i => i.id === selectedIngredient) 
    : null;

  // Styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  };

  const heading1Style = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'var(--primary)',
    marginBottom: '2rem',
    textAlign: 'center'
  };

  const searchContainerStyle = {
    maxWidth: '900px',
    margin: '0 auto 2rem auto',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const formGroupStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  };

  const labelStyle = {
    display: 'block',
    color: 'var(--dark-text)',
    marginBottom: '0.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '0.25rem',
    fontSize: '1rem'
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '2rem'
  };

  const ingredientsListStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const listHeaderStyle = {
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '1rem',
    fontSize: '1.25rem',
    fontWeight: '600'
  };

  const ingredientItemStyle = {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const activeIngredientStyle = {
    backgroundColor: 'rgba(79, 121, 66, 0.1)'
  };

  const flexBetweenStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const ingredientNameStyle = {
    fontWeight: '500'
  };

  const categoryTextStyle = {
    fontSize: '0.875rem',
    color: '#666',
    marginTop: '0.25rem'
  };

  const ratingStyle = {
    display: 'flex'
  };

  const starStyle = {
    width: '1rem',
    height: '1rem'
  };

  const detailsCardStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const detailsHeaderStyle = {
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
    marginBottom: '1.5rem'
  };

  const ingredientTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'var(--primary)',
    marginBottom: '0.5rem'
  };

  const categoryBadgeStyle = {
    display: 'inline-block',
    backgroundColor: '#f5f5f5',
    color: '#666',
    fontSize: '0.875rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem'
  };

  const detailsRatingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem'
  };

  const ratingTextStyle = {
    fontSize: '0.875rem',
    color: '#666'
  };

  const sectionStyle = {
    marginBottom: '1.5rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'var(--dark-text)',
    marginBottom: '0.75rem'
  };

  const paragraphStyle = {
    color: '#666',
    lineHeight: '1.6'
  };

  const listStyle = {
    listStyle: 'disc',
    paddingLeft: '1.5rem',
    color: '#666',
    lineHeight: '1.6'
  };

  const listItemStyle = {
    marginBottom: '0.5rem'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '3rem',
    color: '#666'
  };

  const getRecipeButtonStyle = {
    display: 'inline-block',
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.25rem',
    textDecoration: 'none',
    marginTop: '1.5rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h1 style={heading1Style}>Gut Health Ingredients</h1>
        
        {/* Search and Filter */}
        <div style={searchContainerStyle}>
          <div style={formGroupStyle}>
            <div>
              <label htmlFor="search" style={labelStyle}>Search Ingredients</label>
              <input
                type="text"
                id="search"
                placeholder="Search by ingredient name..."
                style={inputStyle}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category" style={labelStyle}>Filter By Category</label>
              <select
                id="category"
                style={inputStyle}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div style={{ 
          ...gridContainerStyle,
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 2fr'
        }}>
          {/* Ingredients List */}
          <div style={ingredientsListStyle}>
            <div style={listHeaderStyle}>
              <h2>Ingredients</h2>
            </div>
            <div>
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map(ingredient => (
                  <div 
                    key={ingredient.id}
                    style={{
                      ...ingredientItemStyle,
                      ...(selectedIngredient === ingredient.id ? activeIngredientStyle : {})
                    }}
                    onClick={() => setSelectedIngredient(ingredient.id)}
                  >
                    <div style={flexBetweenStyle}>
                      <h3 style={ingredientNameStyle}>{ingredient.name}</h3>
                      <div style={ratingStyle}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg 
                            key={i}
                            style={{
                              ...starStyle,
                              color: i < ingredient.gutHealthRating ? 'var(--secondary)' : '#e2e2e2'
                            }}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p style={categoryTextStyle}>{ingredient.category}</p>
                  </div>
                ))
              ) : (
                <div style={emptyStateStyle}>
                  No ingredients found matching your search criteria.
                </div>
              )}
            </div>
          </div>
          
          {/* Ingredient Details */}
          <div>
            {selectedIngredientData ? (
              <div style={detailsCardStyle}>
                <div style={detailsHeaderStyle}>
                  <div style={flexBetweenStyle}>
                    <h2 style={ingredientTitleStyle}>{selectedIngredientData.name}</h2>
                    <span style={categoryBadgeStyle}>
                      {selectedIngredientData.category}
                    </span>
                  </div>
                  <div style={detailsRatingStyle}>
                    <div style={ratingStyle}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i}
                          style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            color: i < selectedIngredientData.gutHealthRating ? 'var(--secondary)' : '#e2e2e2'
                          }}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span style={ratingTextStyle}>Gut Health Rating</span>
                  </div>
                </div>
                
                <div style={sectionStyle}>
                  <h3 style={sectionTitleStyle}>Description</h3>
                  <p style={paragraphStyle}>{selectedIngredientData.description}</p>
                </div>
                
                <div style={sectionStyle}>
                  <h3 style={sectionTitleStyle}>Gut Health Benefits</h3>
                  <ul style={listStyle}>
                    {selectedIngredientData.benefits.map((benefit, index) => (
                      <li key={index} style={listItemStyle}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div style={sectionStyle}>
                  <h3 style={sectionTitleStyle}>Tips for Use</h3>
                  <p style={paragraphStyle}>{selectedIngredientData.tips}</p>
                </div>
                
                <div style={{ 
                  borderTop: '1px solid #eee',
                  paddingTop: '1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <button style={getRecipeButtonStyle} onClick={() => navigate(`/recipes?ingredient=${selectedIngredientData.name}`)}>
                    Find Recipes with {selectedIngredientData.name}
                  </button>
                  <button 
                    style={{
                      ...getRecipeButtonStyle,
                      backgroundColor: 'var(--secondary)'
                    }}
                    onClick={() => {
                      if (!user) {
                        navigate('/login');
                        return;
                      }
                      
                      const ingredientItem = {
                        name: selectedIngredientData.name,
                        amount: 1,
                        unit: 'item'
                      };
                      
                      addToGroceryList([ingredientItem]);
                      alert(`${selectedIngredientData.name} added to your grocery list!`);
                    }}
                  >
                    Add to Grocery List
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ ...detailsCardStyle, ...emptyStateStyle }}>
                <p>
                  Select an ingredient from the list to view detailed information about its gut health benefits.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IngredientsPage;