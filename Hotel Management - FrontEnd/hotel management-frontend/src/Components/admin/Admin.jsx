import React from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import { Row, Col, Card } from "react-bootstrap";

const Admin = () => {
  return (
    <section className="container mt-5">
      <Header
        title={"Welcome to Admin Pannel"}
        className="text-center"
      ></Header>
      <h2 className="text-center my-3">Admin Services</h2>
      <hr />
      <Row>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <Card.Title className="text-center fw-bold fs-4">
                Manage Rooms
              </Card.Title>
              <Card.Text className="text-center text-muted mb-4">
                Add, edit, and delete rooms here
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Link to={"/add-room"} className="btn btn-primary btn-sm px-4">
                  Manage Rooms
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <Card.Title className="text-center fw-bold fs-4">
                Manage Bookings
              </Card.Title>
              <Card.Text className="text-center text-muted mb-4">
                Manage all the current bookings
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Link to={"/manage-booking"} className="btn btn-primary btn-sm px-4">
                  Manage Bookings
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <Card.Title className="text-center fw-bold fs-4">
                Manage Users
              </Card.Title>
              <Card.Text className="text-center text-muted mb-4">
                Add, View and Edit Users
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Link to={"/manage-booking"} className="btn btn-primary btn-sm px-4">
                  Manage Bookings
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Admin;
