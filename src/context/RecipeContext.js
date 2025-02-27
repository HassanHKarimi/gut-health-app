import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
// Firebase imports commented out for development
// import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const RecipeContext = createContext(null);
// const db = getFirestore();

export const RecipeProvider = ({ children }) => {
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState([]);

  // Load saved recipes and grocery list when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // With Firebase
          // const userDocRef = doc(db, 'users', user.id);
          // const userDoc = await getDoc(userDocRef);
          
          // if (userDoc.exists()) {
          //   const userData = userDoc.data();
          //   if (userData.savedRecipes) setSavedRecipes(userData.savedRecipes);
          //   if (userData.groceryList) setGroceryList(userData.groceryList);
          // }
          
          // For development until Firebase is properly set up
          const storedRecipes = localStorage.getItem('savedRecipes');
          if (storedRecipes) {
            setSavedRecipes(JSON.parse(storedRecipes));
          }
          
          const storedGroceryList = localStorage.getItem('groceryList');
          if (storedGroceryList) {
            setGroceryList(JSON.parse(storedGroceryList));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setSavedRecipes([]);
        setGroceryList([]);
      }
    };
    
    fetchUserData();
  }, [user]);

  // Save recipe
  const saveRecipe = async (recipe) => {
    if (!user) return false;
    
    try {
      // With Firebase
      // const userDocRef = doc(db, 'users', user.id);
      // await updateDoc(userDocRef, {
      //   savedRecipes: arrayUnion(recipe)
      // });
      
      // For development until Firebase is properly set up
      const newSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(newSavedRecipes);
      localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
      return true;
    } catch (error) {
      console.error("Error saving recipe:", error);
      return false;
    }
  };

  // Remove recipe from saved
  const removeRecipe = async (recipeId) => {
    if (!user) return false;
    
    try {
      // With Firebase
      // const userDocRef = doc(db, 'users', user.id);
      // const recipeToRemove = savedRecipes.find(recipe => recipe.id === recipeId);
      // if (recipeToRemove) {
      //   await updateDoc(userDocRef, {
      //     savedRecipes: arrayRemove(recipeToRemove)
      //   });
      // }
      
      // For development until Firebase is properly set up
      const newSavedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
      setSavedRecipes(newSavedRecipes);
      localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
      return true;
    } catch (error) {
      console.error("Error removing recipe:", error);
      return false;
    }
  };

  // Check if recipe is saved
  const isRecipeSaved = (recipeId) => {
    return savedRecipes.some(recipe => recipe.id === recipeId);
  };

  // Add ingredients to grocery list
  const addToGroceryList = async (ingredients) => {
    if (!user) return false;
    
    try {
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
      
      // With Firebase
      // const userDocRef = doc(db, 'users', user.id);
      // await updateDoc(userDocRef, {
      //   groceryList: currentItems
      // });
      
      // For development until Firebase is properly set up
      setGroceryList(currentItems);
      localStorage.setItem('groceryList', JSON.stringify(currentItems));
      return true;
    } catch (error) {
      console.error("Error adding to grocery list:", error);
      return false;
    }
  };

  // Remove ingredient from grocery list
  const removeFromGroceryList = async (ingredientIndex) => {
    if (!user) return false;
    
    try {
      const newList = [...groceryList];
      newList.splice(ingredientIndex, 1);
      
      // With Firebase
      // const userDocRef = doc(db, 'users', user.id);
      // await updateDoc(userDocRef, {
      //   groceryList: newList
      // });
      
      // For development until Firebase is properly set up
      setGroceryList(newList);
      localStorage.setItem('groceryList', JSON.stringify(newList));
      return true;
    } catch (error) {
      console.error("Error removing from grocery list:", error);
      return false;
    }
  };

  // Clear entire grocery list
  const clearGroceryList = async () => {
    if (!user) return false;
    
    try {
      // With Firebase
      // const userDocRef = doc(db, 'users', user.id);
      // await updateDoc(userDocRef, {
      //   groceryList: []
      // });
      
      // For development until Firebase is properly set up
      setGroceryList([]);
      localStorage.setItem('groceryList', JSON.stringify([]));
      return true;
    } catch (error) {
      console.error("Error clearing grocery list:", error);
      return false;
    }
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