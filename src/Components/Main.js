import React from "react";
import { Link } from "react-router-dom"; 
import MainBackground from "../Components/Assets/about-background.png";
import MainBackgroundImage from "../Components/Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const Main = () => {
  return (
    <div className="main-section-container">
      <div className="main-background-image-container">
        <img src={MainBackground} alt="" />
      </div>
      <div className="main-section-image-container">
        <img src={MainBackgroundImage} alt="" />
      </div>
      <div className="main-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Food Is An Important Part Of A Balanced Diet
        </h1>
        <p className="primary-text">
          Each recipe is presented with detailed instructions, beautiful images, 
          and nutritional information, ensuring you have everything you need to create mouthwatering meals.
        </p>
        <p className="primary-text">
          FOODIE is a vibrant and intuitive recipe app designed to ignite your culinary creativity.
        </p>
        <div className="main-buttons-container">
          <Link to="/about"> 
            <button className="secondary-button">Let's Wip It {""}</button>
          </Link>
          <button className="watch-video-button" onClick={() => window.open('https://www.youtube.com/watch?v=dPBXgwJD35E', '_blank')}>
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
