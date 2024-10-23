import React, { useState } from 'react';
import NavBar from './NavBar';
import Contact from "../Components/Contact";
import "../style.css";
import Footer from "../Components/Footer";
import { useNavigate } from 'react-router-dom';

// Sample data for chefs
const chefsData = [
  {
    image: "https://images.unsplash.com/photo-1722152667178-be659e54bffc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnN8ZW58MHx8MHx8fDA%3D", 
    name: "Chef Gordon Ramsay",
    bio: "A world-renowned chef known for his fiery personality and culinary expertise.",
    categories: "Italian, French, British",
    likes: 120,
    comments: 45,
  },
  {
    image: "https://images.unsplash.com/photo-1705917893262-51fec4cd3e29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoZWZzfGVufDB8fDB8fHww", 
    name: "Chef Nigella Lawson",
    bio: "Famous for her easy-going approach to cooking, Nigella is a favorite for home cooks.",
    categories: "Baking, Comfort Food, Desserts",
    likes: 95,
    comments: 30,
  },
  {
    image: "https://images.unsplash.com/photo-1717838207789-62684e75a770?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZiUyMGNvb2tpbmd8ZW58MHx8MHx8fDA%3D", 
    name: "Chef Masaharu Morimoto",
    bio: "A celebrity chef known for his mastery of sushi and Japanese cuisine.",
    categories: "Sushi, Japanese, Asian Fusion",
    likes: 75,
    comments: 20,
  },
];

function About() {
  const navigate = useNavigate()
  const [chefs, setChefs] = useState(chefsData); // Initialize chefs state
  const [activeChefId, setActiveChefId] = useState(null); // Track which chef is active for commenting

  // Handle liking a chef
  const handleLike = async (chefId) => {
    try {
      const response = await fetch(`/api/chefs/${chefId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the local state with the new likes count
        setChefs((prevChefs) => {
          return prevChefs.map((chef, index) => {
            if (index === chefId) {
              return { ...chef, likes: data.likes }; // Update the likes count
            }
            return chef;
          });
        });
      } else {
        alert('Failed to like chef.');
      }
    } catch (error) {
      console.error('Error liking chef:', error);
    }
  };

  const handleCommentSubmit = async (chefId, comment) => {
    try {
      const response = await fetch(`/api/chefs/${chefId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
        // You can implement more logic here to update the comments state if needed
      } else {
        alert('Failed to add comment.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentButtonClick = (chefId) => {
    setActiveChefId(chefId);
    navigate('/contact'); // Set the active chef for commenting
  };

  return (
    <>
      <NavBar />
      <div className='hero-section'>
        <h1 className='hero-title'>Meet Our Culinary Stars</h1>
        <p className='hero-subtitle'>Experience the magic of cooking through our talented chefs.</p>
      </div>
      <div className='about-section-wrapper'>
        <div className='about-section-top'>
          <p className='primary-subheading'>A Flight Straight Into Your Culinary Imagination</p>
          <h1 className='primary-heading'>Explore the chefs behind the recipes.</h1>
        </div>
        <div className='about-section-bottom'>
          {chefs.map((chef, index) => (
            <div className='about-section-info' key={index}>
              <div className='about-boxesImg-container'>
                <img src={chef.image} alt={chef.name} />
                <div className='like-comment-container'>
                  <span className='likes'>{chef.likes} Likes</span>
                  <span className='comments'>{chef.comments || 0} Comments</span>
                </div>
              </div>
              <h2>{chef.name}</h2>
              <p>{chef.bio}</p>
              <p><strong>Specializes In:</strong> {chef.categories}</p>
              <button className='like-button' onClick={() => handleLike(index)}>Like</button>
              <button className='comment-button' onClick={() => handleCommentButtonClick(index)}>Comment</button>
            </div>
          ))}
        </div>
      </div>
      {activeChefId !== null && (
        <Contact chefId={activeChefId} onCommentSubmit={handleCommentSubmit} />
      )}
      <Contact />
      <Footer />
    </>
  );
}

export default About;
