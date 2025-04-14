import React from "react";

const HomeHeader = () => {
  return (
    <header className="header-banner">
      <div className="overlay"></div>
      <div className="animated-text overlay-content">
        <h1>
          Welocme to <span className="hotel-color">Sahan Hotel</span>
        </h1>
        <h4>From booking to bed, we're here to help you rest easy</h4>
      </div>
    </header>
  );
};

export default HomeHeader;
