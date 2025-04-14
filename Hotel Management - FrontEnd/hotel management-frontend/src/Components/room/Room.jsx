import React, { useEffect, useState} from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import RoomCard from "./RoomCard";
import { Container, Row, Col } from "react-bootstrap";
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'


const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const resp = await getAllRooms();
        setData(resp);
        setFilteredData(resp);
      } catch (error) {
        setError(`Error Fetching Rooms: ${error.message}`);
      } finally {
        setIsLoading(false); // Ensure loading state is cleared in all cases
      }
    };
  
    fetchRooms(); // Invoke the function
  }, []);
  

  if (isLoading) {
    return <div>Loading Rooms.....</div>;
  }

  if (error) {
    return <div className="text-danger">Error : {error}</div>;
  }

  const pageHandleChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / roomsPerPage);
  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    const validRooms = filteredData.slice(startIndex, endIndex).filter((room) => room !== undefined && room !== null);

    return validRooms.map((room) => (
      <RoomCard key={room.id} room={room} /> // Pass `room` instead of `data`
    ));
  };
  return (
    <Container>
        <Row>
            <Col md={6} className="mb-3 mb-md-0">
                <RoomFilter data={data} setFilteredData={setFilteredData}></RoomFilter>
            </Col>

            <Col md={6} className="d-flex align-items-center justify-content-end">
                <RoomPaginator currentPage={currentPage} totalPage={totalPages} onPageChange={pageHandleChange}></RoomPaginator>
            </Col>
        </Row>

        <Row>{renderRooms()}</Row>
        <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
                <RoomPaginator currentPage={currentPage} totalPage={totalPages} onPageChange={pageHandleChange}></RoomPaginator>
            </Col>
        </Row>
    </Container>
  )
};

export default Room;
