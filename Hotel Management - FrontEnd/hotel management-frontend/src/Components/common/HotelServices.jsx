import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { FaClock, FaCocktail, FaFootballBall, FaSwimmingPool, FaTableTennis, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa";

const HotelServices = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title={"Our Services"} />
        <Row>
          <h4 className="text-center">
            Services at <span className="hotel-color">Sahan - </span> Hotel
            <span className="gap-2">
              <span> </span> <FaClock /> - 24 Hour Service
            </span>
          </h4>
        </Row>
        <hr />

        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi /> WiFi
                </Card.Title>
                <Card.Text>Stay Connected with high speed</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils/> Breakfast
                </Card.Title>
                <Card.Text>Start your day fresh and healthy</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt/> Laundry
                </Card.Title>
                <Card.Text>Keep your cloths clean and fresh</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaCocktail/> Mini-Bar
                </Card.Title>
                <Card.Text>Chill your evenng with range of products</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTableTennis/> Indoor
                </Card.Title>
                <Card.Text>Enjoy your time with loved ones</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSwimmingPool/> Swimming Pool
                </Card.Title>
                <Card.Text>Free access to the Pool at any time</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotelServices;
