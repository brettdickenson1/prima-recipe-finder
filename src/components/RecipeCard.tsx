import React from "react";
import { Recipe } from "../types/Recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  return (
    <div className="recipe-card" onClick={() => onSelect(recipe)}>
      <img src={recipe?.image} alt={recipe?.title} />
      <h3>{recipe?.title}</h3>
      <p>{recipe?.description}</p>
    </div>
  );
};

export default RecipeCard;
