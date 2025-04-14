import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomCarousal = () => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await getAllRooms();
        setData(resp);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading Rooms..</div>;
  }

  if (errorMessage) {
    return <div className="mt-5 mb-5 text-danger">Error: {errorMessage}</div>;
  }

  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link to="/browse-all-rooms" className="hotel-color text-center">
        Browse All Rooms
      </Link>
      <Container>
        <Carousel indicators={false}>
          {Array.from({ length: Math.ceil(data.length / 4) }).map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {data.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/jpeg;base64, ${room.photo}`}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "200px" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-color">
                          {room.roomType}
                        </Card.Title>
                        <Card.Title className="room-price">
                          ${room.price}
                        </Card.Title>
                        <div className="flex-shrink-0 mt-3">
                          <Link
                            to={`/book-room/${room.id}`}
                            className="btn btn-hotel btn-sm"
                          >
                            Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousal;
