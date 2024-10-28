import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/NavBar";
import "../style.css";
import Form from "../Components/Form";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      console.error("No authorization token found in session");
      navigate("/login");
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch("https://server-v95o.onrender.com/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchRecipes = async (categoryId = null) => {
      setLoading(true);
      try {
        const url = categoryId
          ? `https://server-v95o.onrender.com/recipes?category=${categoryId}`
          : "https://server-v95o.onrender.com/recipes";
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();
        setRecipes(Array.isArray(data) ? data : data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchRecipes(selectedCategory);
  }, [navigate, selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    query === "" ? true : recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="recipe-app">
      <Navbar />
      
      {/* Single Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter The Recipe Title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {/* Single Category Filter */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`category-button ${
              selectedCategory === category.id ? "active" : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Recipe List Display */}
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
            <img
              src={recipe.image_url || "/placeholder.jpg"}
              alt={`Image of ${recipe.title}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            {recipe.category && (
              <p className="text-sm text-gray-600 mb-2">
                Category: <span className="text-indigo-500 font-semibold">{recipe.category.name}</span>
              </p>
            )}

            {recipe.description && <p className="mb-3">{recipe.description}</p>}

            {recipe.instructions ? (
              <div className="bg-gray-50 p-3 rounded-md mb-3">
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <p>{recipe.instructions}</p>
              </div>
            ) : (
              <p>No instructions available.</p>
            )}

            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div>
                <h4 className="font-semibold mt-3">Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.name} - {ingredient.calories} calories, {ingredient.type}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recipe.reviews && recipe.reviews.length > 0 ? (
              <div>
                <h4 className="font-semibold mt-3">Reviews:</h4>
                <ul>
                  {recipe.reviews.map((review) => (
                    <li key={review.id} className="mb-2">
                      {review.comment}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        ))}
      </div>

      {/* Single Form Component */}
      <Form />
    </div>
  );
}

export default Recipe;
