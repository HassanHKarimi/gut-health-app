import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { savedRecipes, removeRecipe, groceryList, removeFromGroceryList, clearGroceryList } = useRecipes();
  const [activeTab, setActiveTab] = useState('recipes');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-center">Please login to view your profile.</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Welcome back, {user.name}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
          
          <div className="border-t border-gray-200">
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === 'recipes' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('recipes')}
              >
                Saved Recipes
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === 'groceries' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('groceries')}
              >
                Grocery List
              </button>
            </div>
            
            <div className="p-4">
              {activeTab === 'recipes' ? (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Saved Recipes</h3>
                  {savedRecipes.length === 0 ? (
                    <p className="text-gray-500">You haven't saved any recipes yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {savedRecipes.map(recipe => (
                        <div key={recipe.id} className="bg-white overflow-hidden shadow rounded-lg">
                          {recipe.image && (
                            <div className="h-48 w-full overflow-hidden">
                              <img 
                                className="h-full w-full object-cover" 
                                src={recipe.image} 
                                alt={recipe.title} 
                              />
                            </div>
                          )}
                          <div className="px-4 py-4">
                            <h3 className="text-lg font-medium text-gray-900">{recipe.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {recipe.description ? recipe.description.substring(0, 100) + '...' : 'No description available'}
                            </p>
                            <div className="mt-4 flex justify-between">
                              <button
                                onClick={() => navigate(`/recipes/${recipe.id}`)}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                View Recipe
                              </button>
                              <button
                                onClick={() => removeRecipe(recipe.id)}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Your Grocery List</h3>
                    {groceryList.length > 0 && (
                      <button
                        onClick={clearGroceryList}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Clear List
                      </button>
                    )}
                  </div>
                  
                  {groceryList.length === 0 ? (
                    <p className="text-gray-500">Your grocery list is empty.</p>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {groceryList.map((item, index) => (
                        <li key={index} className="py-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id={`item-${index}`}
                              name={`item-${index}`}
                              type="checkbox"
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`item-${index}`} className="ml-3 block text-gray-900">
                              <span className="font-medium">{item.name}</span>
                              {item.amount && item.unit && (
                                <span className="text-gray-500"> - {item.amount} {item.unit}</span>
                              )}
                            </label>
                          </div>
                          <button
                            onClick={() => removeFromGroceryList(index)}
                            className="ml-2 text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;