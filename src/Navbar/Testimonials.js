import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./Testimonial.css";
import Navbar from "./NavBar";
import Footer from "../Components/Footer";


const testimonialsData = [
  {
    image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    text: "FOODIE has changed the way I cook! The recipes are easy to follow, and the variety keeps my family excited at every meal.",
    name: "Jane Smith",
  },
  {
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww",
    text: "I love this app! It has brought new life to my cooking with delicious and unique recipes.",
    name: "Emily Johnson",
  },
  {
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8fDB8fHww",
    text: "Thanks to FOODIE, I've become more adventurous in the kitchen. The community feedback is invaluable!",
    name: "Alex Brown",
  },
];

const Testimonial = () => {
  return (
    <>
    <Navbar />
    <div className="testimonial-section-wrapper">
      <div className="testimonial-section-top">
        <p className="primary-subheading">Testimonials</p>
        <h1 className="primary-heading">What Our Users Are Saying</h1>
        <p className="primary-text">
          Discover how our recipe app has transformed cooking experiences for
          users worldwide.
        </p>
      </div>
      <div className="testimonial-cards-container">
        {testimonialsData.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <img src={testimonial.image} alt="User profile" className="testimonial-img" />
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonials-stars-container">
              {[...Array(5)].map((_, starIndex) => (
                <AiFillStar key={starIndex} className="star-icon" />
              ))}
            </div>
            <h2 className="testimonial-user">{testimonial.name}</h2>
          </div>
        ))}
      </div>
      <div className="best-comment-section">
        <h2>Best User Comment</h2>
        <div className="best-comment-slider">
          <div className="best-comment">
            <p>"The best recipe app out there! A must-have for every home cook!"</p>
            <span>- Sarah Williams</span>
          </div>
          
          <div className="best-comment">
            <p>"FOODIE has inspired me to cook every day. Thank you!"</p>
            <span>- Michael Lee</span>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Testimonial;
