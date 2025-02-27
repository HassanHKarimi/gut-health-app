import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveRecipe, isRecipeSaved, removeRecipe, addToGroceryList } = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock recipe data - in a real app, this would be fetched from an API based on the recipe ID
  const mockRecipes = [
    {
      id: 1,
      title: 'Gut-Healing Vegetable Soup',
      image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      prepTime: '15 min',
      cookTime: '30 min',
      difficulty: 'Easy',
      gutHealthRating: 5,
      ingredients: [
        { name: 'Carrots', amount: 2, unit: 'large' },
        { name: 'Broccoli', amount: 1, unit: 'head' },
        { name: 'Garlic', amount: 3, unit: 'cloves' },
        { name: 'Onions', amount: 1, unit: 'medium' },
        { name: 'Ginger', amount: 1, unit: 'inch piece' },
        { name: 'Vegetable Broth', amount: 4, unit: 'cups' },
        { name: 'Turmeric', amount: 1, unit: 'tsp' },
        { name: 'Black Pepper', amount: 0.5, unit: 'tsp' }
      ],
      instructions: [
        'Heat olive oil in a large pot over medium heat.',
        'Add diced onions and garlic, sauté until translucent.',
        'Add chopped carrots, broccoli, and grated ginger.',
        'Pour in vegetable broth and bring to a boil.',
        'Reduce heat and simmer for 20 minutes until vegetables are tender.',
        'Add turmeric and black pepper.',
        'Blend half of the soup if desired for a creamier texture.',
        'Serve hot with a sprinkle of fresh herbs.'
      ],
      description: 'A soothing soup packed with anti-inflammatory ingredients that promote gut health. This recipe features turmeric and ginger, two powerful ingredients known for their digestive benefits and anti-inflammatory properties. The fiber-rich vegetables help feed beneficial gut bacteria.',
      nutritionalInfo: {
        calories: 120,
        protein: 4,
        carbs: 22,
        fat: 3,
        fiber: 8
      },
      gutHealthBenefits: [
        'High in prebiotic fiber to feed beneficial gut bacteria',
        'Contains anti-inflammatory turmeric and ginger',
        'Easy to digest for sensitive stomachs',
        'Hydrating and soothing for the digestive tract'
      ]
    },
    {
      id: 2,
      title: 'Probiotic Yogurt Bowl',
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      prepTime: '10 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      gutHealthRating: 5,
      ingredients: [
        { name: 'Greek Yogurt', amount: 1, unit: 'cup' },
        { name: 'Berries', amount: 0.5, unit: 'cup' },
        { name: 'Honey', amount: 1, unit: 'tbsp' },
        { name: 'Chia Seeds', amount: 1, unit: 'tbsp' },
        { name: 'Almonds', amount: 2, unit: 'tbsp' },
        { name: 'Granola', amount: 0.25, unit: 'cup' }
      ],
      instructions: [
        'Add Greek yogurt to a bowl.',
        'Top with fresh berries, chia seeds, and chopped almonds.',
        'Sprinkle with granola.',
        'Drizzle with honey.',
        'Enjoy immediately.'
      ],
      description: 'A probiotic-rich breakfast that helps maintain a healthy gut microbiome. Greek yogurt contains beneficial bacteria that support digestive health, while berries add antioxidants and fiber. The nuts and seeds provide healthy fats and additional fiber for a well-rounded gut-friendly meal.',
      nutritionalInfo: {
        calories: 320,
        protein: 18,
        carbs: 36,
        fat: 14,
        fiber: 7
      },
      gutHealthBenefits: [
        'Contains live probiotics from Greek yogurt',
        'Berries provide polyphenols that feed beneficial gut bacteria',
        'Fiber from nuts and seeds support digestive regularity',
        'Prebiotic ingredients help probiotics thrive'
      ]
    }
  ];

  useEffect(() => {
    setLoading(true);
    // In a real app, you would fetch data from an API here
    const recipeData = mockRecipes.find(r => r.id === parseInt(id));
    
    if (recipeData) {
      setRecipe(recipeData);
    }
    
    setLoading(false);
  }, [id]);

  const handleAddToGroceryList = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    addToGroceryList(recipe.ingredients);
    alert('Ingredients added to your grocery list!');
  };

  const handleSaveRecipe = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (isRecipeSaved(recipe.id)) {
      removeRecipe(recipe.id);
    } else {
      saveRecipe(recipe);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <p>Loading recipe...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!recipe) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <p>Recipe not found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Recipe Header */}
          <div className="relative">
            <div className="h-64 sm:h-80 w-full">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl font-bold">{recipe.title}</h1>
                <div className="flex mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i}
                      className={`h-5 w-5 ${i < recipe.gutHealthRating ? 'text-yellow-400' : 'text-gray-400'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2">Gut Health Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Actions */}
          <div className="flex p-4 border-b">
            <button 
              onClick={handleSaveRecipe}
              className={`mr-2 px-4 py-2 rounded-md ${
                user && isRecipeSaved(recipe.id) 
                  ? 'bg-red-600 text-white' 
                  : 'bg-blue-600 text-white'
              }`}
            >
              {user && isRecipeSaved(recipe.id) ? 'Unsave Recipe' : 'Save Recipe'}
            </button>
            <button 
              onClick={handleAddToGroceryList}
              className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add to Grocery List
            </button>
          </div>
          
          {/* Recipe Content */}
          <div className="p-6">
            {/* Recipe Info */}
            <div className="flex flex-wrap justify-between mb-6 text-sm">
              <div className="w-full sm:w-auto mb-2 sm:mb-0">
                <span className="font-semibold">Prep Time:</span> {recipe.prepTime}
              </div>
              <div className="w-full sm:w-auto mb-2 sm:mb-0">
                <span className="font-semibold">Cook Time:</span> {recipe.cookTime}
              </div>
              <div className="w-full sm:w-auto mb-2 sm:mb-0">
                <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{recipe.description}</p>
            </div>
            
            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    <span>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <ol className="list-decimal list-inside space-y-3">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </div>
            
            {/* Nutritional Info */}
            {recipe.nutritionalInfo && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Nutritional Information</h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Calories</p>
                    <p className="font-bold">{recipe.nutritionalInfo.calories}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="font-bold">{recipe.nutritionalInfo.protein}g</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-bold">{recipe.nutritionalInfo.carbs}g</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="font-bold">{recipe.nutritionalInfo.fat}g</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Fiber</p>
                    <p className="font-bold">{recipe.nutritionalInfo.fiber}g</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Gut Health Benefits */}
            {recipe.gutHealthBenefits && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Gut Health Benefits</h2>
                <ul className="space-y-2">
                  {recipe.gutHealthBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetailPage;