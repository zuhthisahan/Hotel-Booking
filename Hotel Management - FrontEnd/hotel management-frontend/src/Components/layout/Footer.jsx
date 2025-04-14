import React from "react";
import { Col,Container, Row } from "react-bootstrap";

const Footer = () => {
  let today = new Date();
  return (
    <footer className="by-dark text-dark py-3 footer mt-lg-3">
      <Container>
        <Row>
          <Col xs={12} md={12} className="text-center">
            <p>&copy; {today.getFullYear()} Sample Hotel</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
