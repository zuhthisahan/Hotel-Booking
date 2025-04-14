import React from "react";
import { Container } from "react-bootstrap";

const Parallex = () => {
  return (
    <div className="parallax mb-5">
      <Container className="text-center px-5 py-5 justify-content-center">
        <div className="animated-text bounceIn">
          <h1>
            Welocme to <span className="hotel-color">Sahan Hotel</span>
          </h1>
          <h3>Enjoy your holiday with us.</h3>
        </div>
      </Container>
    </div>
  );
};

export default Parallex;
