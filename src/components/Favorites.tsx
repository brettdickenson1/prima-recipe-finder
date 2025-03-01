import React from "react";
import { Recipe } from "../types/Recipe";
import { FaTrash } from "react-icons/fa";

interface FavoritesProps {
  favorites: Recipe[];
  onRemoveFavorite: (id: string) => void;
  favoritesRef: React.RefObject<HTMLDivElement | null>;
}

const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onRemoveFavorite,
  favoritesRef,
}) => {
  return (
    <div
      ref={favoritesRef}
      className="favorites-list bg-white p-4 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold text-teal-600">Your Favorites</h2>
      {favorites?.length === 0 ? (
        <p className="text-start text-gray-500 text-sm">
          0 favorites added - search to add them
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {favorites.map((recipe) => (
            <div
              key={recipe?.idMeal}
              className="favorite-item bg-white p-4 rounded-lg shadow-md flex flex-col justify-between relative transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={recipe?.strMealThumb}
                  alt={recipe?.strMeal}
                  className="w-full h-20 object-cover rounded-md mb-2"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150";
                  }}
                />
                <button
                  onClick={() => onRemoveFavorite(recipe?.idMeal)}
                  className="absolute top-2 right-2 bg-teal-600 text-white p-1 rounded-full hover:bg-teal-700 transition-colors duration-200"
                >
                  <FaTrash />
                </button>
              </div>

              <h3 className="text-md text-teal-600 text-center mb-2 mt-2 flex items-center justify-center flex-grow">
                {recipe.strMeal}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
