import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "../style.css";
import Form from "../Components/Form";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [activeRecipeId, setActiveRecipeId] = useState(null); // For comments
  const [comment, setComment] = useState(""); // Comment input

  useEffect(() => {
    fetch("https://server-v95o.onrender.com/recipes", { headers: "Auth" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRecipes(data);
        } else if (data.recipes) {
          setRecipes(data.recipes);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  // Function to handle likes
  const handleLike = async (recipeId) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}/likes`, {
        method: "POST",
      });

      if (response.ok) {
        alert("You liked this recipe!");
        // Optionally, update likes in the state for real-time feedback
      } else {
        alert("Failed to like the recipe.");
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };

  // Function to handle comment submission
  const handleCommentSubmit = async (recipeId, comment) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
        // Optionally, update comments in the state for real-time feedback
        setComment(""); // Clear comment input after submission
      } else {
        alert("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Set the active recipe for commenting
  const handleCommentButtonClick = (recipeId) => {
    setActiveRecipeId(recipeId); // Set the selected recipe
  };

  const filteredRecipes = Array.isArray(recipes)
    ? recipes.filter((recipe) => {
        if (query === "") {
          return true;
        } else if (recipe.title.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        return false;
      })
    : [];

  return (
    <div className="recipe-app">
      <NavBar />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter The Recipe Title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Directions: {recipe.directions}</p>

            {/* Like button */}
            <button
              className="like-button"
              onClick={() => handleLike(recipe.id)}
            >
              Like
            </button>

            {/* Comment button */}
            <button
              className="comment-button"
              onClick={() => handleCommentButtonClick(recipe.id)}
            >
              Comment
            </button>

            {/* Comment Form */}
            {activeRecipeId === recipe.id && (
              <div className="comment-section">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows="3"
                />
                <button
                  className="submit-comment"
                  onClick={() => handleCommentSubmit(recipe.id, comment)}
                >
                  Submit Comment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Form />
    </div>
  );
}

export default Recipe;
