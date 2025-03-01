import React from "react";
import { Recipe } from "../types/Recipe";

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe }) => {
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
      {safeRecipes.length > 0 &&
        safeRecipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden"
          >
            <img
              className="w-full h-48 object-cover"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-teal-600">
                {recipe.strMeal}
              </h2>
              <p className="text-gray-600 text-sm">{recipe.strCategory}</p>
              <button
                onClick={() => onSelectRecipe(recipe)}
                className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-full text-sm hover:bg-teal-700 transition-colors duration-200"
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecipeList;
