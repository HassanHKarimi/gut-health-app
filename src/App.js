import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import IngredientsPage from './pages/IngredientsPage';
import ScanFoodPage from './pages/ScanFoodPage';
import ProfilePage from './pages/ProfilePage';
import AuthCard from './components/auth/AuthCard';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';

// A protected route component to require authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<AuthCard />} />
            
            {/* Protected Routes */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recipes" 
              element={
                <ProtectedRoute>
                  <RecipesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recipes/:id" 
              element={
                <ProtectedRoute>
                  <RecipeDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ingredients" 
              element={
                <ProtectedRoute>
                  <IngredientsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/scan" 
              element={
                <ProtectedRoute>
                  <ScanFoodPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
