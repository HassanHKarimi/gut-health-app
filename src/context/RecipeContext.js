import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState([]);

  // Load saved recipes from localStorage on mount and when user changes
  useEffect(() => {
    if (user) {
      const storedRecipes = localStorage.getItem('savedRecipes');
      if (storedRecipes) {
        setSavedRecipes(JSON.parse(storedRecipes));
      }
      
      const storedGroceryList = localStorage.getItem('groceryList');
      if (storedGroceryList) {
        setGroceryList(JSON.parse(storedGroceryList));
      }
    } else {
      setSavedRecipes([]);
      setGroceryList([]);
    }
  }, [user]);

  // Save recipe
  const saveRecipe = (recipe) => {
    if (!user) return false;
    
    const newSavedRecipes = [...savedRecipes, recipe];
    setSavedRecipes(newSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
    return true;
  };

  // Remove recipe from saved
  const removeRecipe = (recipeId) => {
    if (!user) return false;
    
    const newSavedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
    setSavedRecipes(newSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
    return true;
  };

  // Check if recipe is saved
  const isRecipeSaved = (recipeId) => {
    return savedRecipes.some(recipe => recipe.id === recipeId);
  };

  // Add ingredients to grocery list
  const addToGroceryList = (ingredients) => {
    if (!user) return false;
    
    // Merge existing ingredients with new ones, avoiding duplicates
    const currentItems = [...groceryList];
    
    ingredients.forEach(newItem => {
      const existingItemIndex = currentItems.findIndex(item => 
        item.name.toLowerCase() === newItem.name.toLowerCase()
      );
      
      if (existingItemIndex >= 0) {
        // If ingredient exists, update the amount if possible
        if (currentItems[existingItemIndex].unit === newItem.unit) {
          currentItems[existingItemIndex].amount += newItem.amount;
        } else {
          // If units don't match, just add as a new item
          currentItems.push(newItem);
        }
      } else {
        // If ingredient doesn't exist, add it
        currentItems.push(newItem);
      }
    });
    
    setGroceryList(currentItems);
    localStorage.setItem('groceryList', JSON.stringify(currentItems));
    return true;
  };

  // Remove ingredient from grocery list
  const removeFromGroceryList = (ingredientIndex) => {
    if (!user) return false;
    
    const newList = [...groceryList];
    newList.splice(ingredientIndex, 1);
    setGroceryList(newList);
    localStorage.setItem('groceryList', JSON.stringify(newList));
    return true;
  };

  // Clear entire grocery list
  const clearGroceryList = () => {
    if (!user) return false;
    
    setGroceryList([]);
    localStorage.setItem('groceryList', JSON.stringify([]));
    return true;
  };

  return (
    <RecipeContext.Provider 
      value={{ 
        savedRecipes, 
        saveRecipe, 
        removeRecipe, 
        isRecipeSaved,
        groceryList,
        addToGroceryList,
        removeFromGroceryList,
        clearGroceryList
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  return useContext(RecipeContext);
};