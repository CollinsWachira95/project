import React from "react";
import BannerBackground from "../Components/Assets/home-banner-background.png"
import BannerImage from "../Components/Assets/home-banner-image.png"
import Navbar from "./NavBar"
import Main from "../Components/Main"
import Footer from "../Components/Footer"
import { Link } from "react-router-dom"; 

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Favourite Food Cooked From Home Served Hot & Fresh Only At Foodie.
          </h1>
          <p className="primary-text">
            Welcome to the world where your culinary dreams are fulfilled, where you will find healthy meals but most Importantly novishly tasty.
          </p>
          <Link to='login'>
          <button className="secondary-button">
            Let's Burn It Up 
          </button>
          </Link>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
