import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  if (!room) {
    return null; // Gracefully handle undefined room
  }

  return (
    <Col key={room.id} className="mb-4" xs={12} >
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
            <Card.Img
              variant="top"
              src={room.photo ? `data:image:jpeg;base64, ${room.photo}` : "default-image-url.jpg"}
              alt="Room photo"
              style={{ width: "100%", maxWidth: "200px", height: "auto" }}
            />
            </Link>
          </div>

          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
            <Card.Title className="room-price">${room.price}</Card.Title>
            <Card.Text>Some sample room information</Card.Text>
          </div>

          <div className="flex-shrink-0 mt-3">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
