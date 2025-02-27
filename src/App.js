import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import IngredientsPage from './pages/IngredientsPage';
import ScanFoodPage from './pages/ScanFoodPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/scan" element={<ScanFoodPage />} />
      </Routes>
    </Router>
  );
}

export default App;
