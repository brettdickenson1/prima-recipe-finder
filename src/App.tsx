import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import RecipeList from "./components/RecipeList.tsx";
import RecipeDetail from "./components/RecipeDetail.tsx";
import Favorites from "./components/Favorites.tsx";
import SearchBar from "./components/SearchBar.tsx";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./utils/localStorage.ts";
import { Recipe } from "./types/Recipe";

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<Recipe[]>(
    loadFromLocalStorage("favorites") || []
  );
  const recipeDetailRef = useRef<HTMLDivElement | null>(null);
  const favoritesRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);

  const fetchRecipes = async (query: string) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (response?.data?.meals) {
        setRecipes(response?.data?.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes", error);
      setRecipes([]);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      fetchRecipes(query);
    } else {
      setRecipes([]);
    }
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  useEffect(() => {
    if (selectedRecipe && recipeDetailRef.current) {
      recipeDetailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedRecipe]);

  const handleAddFavorite = (recipe: Recipe) => {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.idMeal === recipe.idMeal
    );

    if (favoritesRef.current) {
      favoritesRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (!isAlreadyFavorite) {
      setFavorites((prevFavorites) => [...prevFavorites, recipe]);
      saveToLocalStorage("favorites", [...favorites, recipe]);
    } else {
      alert("This recipe is already in your favorites!");
    }
  };

  const handleRemoveFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.idMeal !== id);
    setFavorites(updatedFavorites);
    saveToLocalStorage("favorites", updatedFavorites);
  };

  const handleBackToSearch = () => {
    if (selectedRecipe && backRef.current) {
      setSelectedRecipe(null);
      backRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={backRef} className="App bg-gray-100 min-h-screen py-4 px-4">
      <h1 className="text-xl sm:text-lg md:text-base lg:text-2xl xl:text-3xl text-center font-semibold text-teal-600 mb-4">
        Recipe Finder App
      </h1>
      {!selectedRecipe && <SearchBar onSearch={handleSearch} />}
      {recipes?.length === 0 && (
        <div className="flex flex-col justify-center text-center mb-4">
          <p className="text-gray-500">
            No recipes found. Please enter a meal or food term
          </p>
        </div>
      )}

      <div>
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
          favoritesRef={favoritesRef}
        />
      </div>

      {!selectedRecipe ? (
        <div className="flex flex-wrap gap-6 mt-4">
          <div className="flex-1">
            <RecipeList recipes={recipes} onSelectRecipe={handleSelectRecipe} />
          </div>
        </div>
      ) : (
        <div className="flex mt-4">
          <div className="flex-1">
            <RecipeDetail
              recipe={selectedRecipe}
              onAddFavorite={handleAddFavorite}
              onBackToSearch={handleBackToSearch}
              recipeDetailRef={recipeDetailRef}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
