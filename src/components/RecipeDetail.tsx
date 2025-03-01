import React from "react";
import { Recipe } from "../types/Recipe";

interface RecipeDetailProps {
  recipe: Recipe;
  onAddFavorite: (recipe: Recipe) => void;
  onBackToSearch: () => void;
  recipeDetailRef: React.RefObject<HTMLDivElement | null>;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onAddFavorite,
  onBackToSearch,
  recipeDetailRef,
}) => {
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient);
    }
  }

  return (
    <div
      ref={recipeDetailRef}
      className="recipe-detail bg-white rounded-lg shadow-lg p-4 max-w-3xl mx-auto"
    >
      <div className="flex justify-between mb-4">
        <button
          onClick={onBackToSearch}
          className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition duration-300"
        >
          Back to Recipes
        </button>

        <button
          onClick={() => onAddFavorite(recipe)}
          className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition duration-300"
        >
          Add to Favorites
        </button>
      </div>
      <hr />

      <h2 className="mt-2 text-2xl font-bold text-teal-600 mb-4 text-center">
        {recipe?.strMeal}
      </h2>

      <div className="flex flex-row justify-between mb-4">
        <div className="w-1/2 pr-4">
          <img
            src={recipe?.strMealThumb}
            alt={recipe?.strMeal}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="w-1/2">
          <h3 className="text-xl font-semibold text-teal-500 mb-2">
            Ingredients
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {ingredients?.length > 0 ? (
              ingredients?.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))
            ) : (
              <li className="text-gray-700">No ingredients available.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-teal-500 mb-2">
          Instructions
        </h3>
        <p className="text-gray-700 text-sm">{recipe?.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
