import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';

const RecipesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveRecipe, isRecipeSaved, removeRecipe, addToGroceryList } = useRecipes();
  // Mock recipe data
  const mockRecipes = [
    {
      id: 1,
      title: 'Gut-Healing Vegetable Soup',
      image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      prepTime: '15 min',
      cookTime: '30 min',
      difficulty: 'Easy',
      gutHealthRating: 5,
      ingredients: ['Carrots', 'Broccoli', 'Garlic', 'Onions', 'Ginger', 'Vegetable Broth', 'Turmeric', 'Black Pepper'],
      description: 'A soothing soup packed with anti-inflammatory ingredients that promote gut health.'
    },
    {
      id: 2,
      title: 'Probiotic Yogurt Bowl',
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      prepTime: '10 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      gutHealthRating: 5,
      ingredients: ['Greek Yogurt', 'Berries', 'Honey', 'Chia Seeds', 'Almonds', 'Granola'],
      description: 'A probiotic-rich breakfast that helps maintain a healthy gut microbiome.'
    },
    {
      id: 3,
      title: 'Fermented Kimchi Stir Fry',
      image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      prepTime: '20 min',
      cookTime: '15 min',
      difficulty: 'Medium',
      gutHealthRating: 4,
      ingredients: ['Kimchi', 'Brown Rice', 'Tofu', 'Bell Peppers', 'Carrots', 'Sesame Oil', 'Garlic'],
      description: 'A spicy stir fry featuring fermented kimchi, which is excellent for gut health.'
    },
    {
      id: 4,
      title: 'Prebiotic Banana Smoothie',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a90a3099?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      prepTime: '5 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      gutHealthRating: 4,
      ingredients: ['Green Banana', 'Yogurt', 'Kefir', 'Flaxseeds', 'Berries', 'Honey'],
      description: 'Green bananas are rich in prebiotic fiber that feeds beneficial gut bacteria.'
    },
    {
      id: 5,
      title: 'Sauerkraut & Lentil Salad',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      prepTime: '15 min',
      cookTime: '20 min',
      difficulty: 'Medium',
      gutHealthRating: 5,
      ingredients: ['Sauerkraut', 'Lentils', 'Cherry Tomatoes', 'Cucumber', 'Red Onion', 'Olive Oil', 'Lemon Juice'],
      description: 'A fiber-rich salad with probiotic sauerkraut for optimal digestive health.'
    },
    {
      id: 6,
      title: 'Miso Soup with Seaweed',
      image: 'https://images.unsplash.com/photo-1582284615447-e09a56b9a2d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      prepTime: '10 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      gutHealthRating: 4,
      ingredients: ['Miso Paste', 'Seaweed', 'Tofu', 'Green Onions', 'Shiitake Mushrooms', 'Ginger'],
      description: 'A traditional Japanese soup with fermented miso and mineral-rich seaweed.'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Check URL for ingredient parameter
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ingredientParam = params.get('ingredient');
    if (ingredientParam) {
      setSearchQuery(ingredientParam);
    }
  }, []);
  
  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        recipe.ingredients.some(ingredient => 
                          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
                        );
    
    const matchesCategory = selectedCategory === 'All' || 
                           (selectedCategory === '5 Star' && recipe.gutHealthRating === 5) || 
                           (selectedCategory === 'Quick' && 
                            (parseInt(recipe.prepTime) + parseInt(recipe.cookTime)) <= 30);
    
    return matchesSearch && matchesCategory;
  });

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

  const filterSectionStyle = {
    maxWidth: '900px',
    margin: '0 auto 3rem auto'
  };

  const filterCardStyle = {
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

  const recipeGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem'
  };

  const recipeCardStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const recipeImageContainerStyle = {
    height: '200px',
    overflow: 'hidden'
  };

  const recipeImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const recipeContentStyle = {
    padding: '1.5rem'
  };

  const recipeTitleRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  };

  const recipeTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--dark-text)'
  };

  const ratingStyle = {
    display: 'flex'
  };

  const starStyle = {
    width: '1.25rem',
    height: '1.25rem'
  };

  const recipeDescriptionStyle = {
    color: '#666',
    marginBottom: '1rem'
  };

  const tagContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  const tagStyle = {
    backgroundColor: 'var(--light-bg)',
    color: 'var(--dark-text)',
    fontSize: '0.875rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem'
  };

  const recipeMetaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    color: '#666',
    marginBottom: '1rem'
  };

  const viewButtonStyle = {
    width: '100%',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '0.25rem',
    fontWeight: '500',
    cursor: 'pointer'
  };

  const emptyResultStyle = {
    textAlign: 'center',
    padding: '3rem 0',
    color: '#666'
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h1 style={heading1Style}>
          Gut-Healthy Recipes
        </h1>
        
        {/* Search and Filter */}
        <div style={filterSectionStyle}>
          <div style={filterCardStyle}>
            <div style={formGroupStyle}>
              <div>
                <label htmlFor="search" style={labelStyle}>Search Recipes</label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by recipe name or ingredient..."
                  style={inputStyle}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category" style={labelStyle}>Filter By</label>
                <select
                  id="category"
                  style={inputStyle}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Recipes</option>
                  <option value="5 Star">5 Star Gut Health</option>
                  <option value="Quick">Quick Prep (Under 30 min)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recipe Cards */}
        {filteredRecipes.length > 0 ? (
          <div style={recipeGridStyle}>
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} style={recipeCardStyle}>
                <div style={recipeImageContainerStyle}>
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    style={recipeImageStyle}
                  />
                </div>
                <div style={recipeContentStyle}>
                  <div style={recipeTitleRowStyle}>
                    <h2 style={recipeTitleStyle}>{recipe.title}</h2>
                    <div style={ratingStyle}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i}
                          style={{
                            ...starStyle,
                            color: i < recipe.gutHealthRating ? 'var(--secondary)' : '#e2e2e2'
                          }}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <p style={recipeDescriptionStyle}>{recipe.description}</p>
                  
                  <div style={tagContainerStyle}>
                    {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                      <span key={i} style={tagStyle}>
                        {ingredient}
                      </span>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>
                        +{recipe.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div style={recipeMetaStyle}>
                    <span>Prep: {recipe.prepTime}</span>
                    <span>Cook: {recipe.cookTime}</span>
                    <span>Difficulty: {recipe.difficulty}</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      style={viewButtonStyle} 
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                    >
                      View Recipe
                    </button>
                    
                    {user && (
                      <button 
                        style={{
                          ...viewButtonStyle,
                          backgroundColor: isRecipeSaved(recipe.id) ? '#e53e3e' : '#4f46e5',
                          width: 'auto',
                          padding: '0.75rem 1rem'
                        }}
                        onClick={() => {
                          if (isRecipeSaved(recipe.id)) {
                            removeRecipe(recipe.id);
                          } else {
                            saveRecipe(recipe);
                          }
                        }}
                      >
                        {isRecipeSaved(recipe.id) ? 'Unsave' : 'Save'}
                      </button>
                    )}
                    
                    {user && (
                      <button 
                        style={{
                          ...viewButtonStyle,
                          backgroundColor: '#047857',
                          width: 'auto',
                          padding: '0.75rem 1rem'
                        }}
                        onClick={() => {
                          // Convert ingredients to grocery items
                          const groceryItems = recipe.ingredients.map(name => ({
                            name,
                            amount: 1,
                            unit: 'item'
                          }));
                          
                          addToGroceryList(groceryItems);
                          alert('Ingredients added to grocery list!');
                        }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor" 
                          style={{ width: '1.25rem', height: '1.25rem' }}
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={emptyResultStyle}>
            <p>No recipes found matching your search criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecipesPage;