import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../style.css";
import Form from "../Components/Form";

const mockCategories = ["All", "Italian", "Desserts", "Asian", "Vegan"]; // Mock categories
const mockRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhZ2hldHRpJTIwY2FyYm9uYXJhfGVufDB8fDB8fHww",
    ingredients: "Pasta, Eggs, Parmesan, Bacon",
    directions: "Cook pasta. Mix with eggs and cheese. Add bacon.",
    category: "Italian",
    likes: 0,
    comments: [],
  },
  {
    id: 2,
    title: "Tiramisu",
    image: "https://images.unsplash.com/photo-1542326237-94b1c5a538d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlyYW1pc3V8ZW58MHx8MHx8fDA%3D",
    ingredients: "Ladyfingers, Coffee, Mascarpone, Cocoa",
    directions: "Layer ladyfingers with coffee and mascarpone. Dust with cocoa.",
    category: "Desserts",
    likes: 0,
    comments: [],
  },
  // Add more mock recipes as needed
];

function Recipe() {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newComment, setNewComment] = useState("");

  // Handle like button click
  const handleLike = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, likes: recipe.likes + 1 }
          : recipe
      )
    );
  };

  // Handle comment submit
  const handleCommentSubmit = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              comments: [...recipe.comments, newComment],
            }
          : recipe
      )
    );
    setNewComment(""); // Clear comment input after submission
  };

  // Filter recipes based on category and search query
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesQuery =
      query === "" || recipe.title.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="recipe-app">
      <NavBar />

      {/* Category filter */}
      <div className="category-list">
        {mockCategories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter The Recipe Title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {/* Recipe list */}
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Directions: {recipe.directions}</p>

            {/* Likes and comments */}
            <div className="like-comment-section">
              <button onClick={() => handleLike(recipe.id)}>Like</button>
              <span>{recipe.likes} Likes</span>
              <div className="comment-section">
                <h4>Comments:</h4>
                <ul>
                  {recipe.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => handleCommentSubmit(recipe.id)}>
                  Submit Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Form />
    </div>
  );
}

export default Recipe;
