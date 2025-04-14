import React, { useEffect, useState } from "react";
import { use } from "react";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]); // to Store rooms that are filtered, will be used as callback Fn in RoomFilter
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccesMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Get all the Rooms available in the DB when the component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  //  Function to fetch all rooms
  const fetchRooms = async () => {
    setIsLoading(true); // Make isLoading true, So the load message will be dispalyed until get the data
    try {
      const data = await getAllRooms();
      setRooms(data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // When every times rooms or the user filtered by a room this Fn will be executed
  useEffect(() => {
    if (selectedRoomType === "") {
      // If nothing selected all rooms visible
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.type === selectedRoomType);
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  // Calculate Total Pages based on Filters if applied
  const calculateTotalPages = (filteredRooms, roomPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomPerPage);
  };

  const handlePaginationClick = (pageNumber) => {
    // once the user clicked the next page, update the current page
    setCurrentPage(pageNumber); // Will be called in the Room Paginator component
  };

  const handleDelete = async (roomId) => {
    try {
      const resutl = await deleteRoom(roomId);
      if (resutl === "") {
        setSuccesMessage(`Room ${roomId} was Successfully deleted`);
        fetchRooms();
      } else {
        console.log(`Error deleting room: ${resutl.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccesMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const indexOfLastRoom = currentPage * roomPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Define the total pages calculation outside of JSX
  const totalPages = calculateTotalPages(filteredRooms, roomPerPage, rooms);

  return (
    <>
      {isLoading ? (
        <p>Rooms are Loading...</p>
      ) : (
        <>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}

          <section className="mt-5 mb-5 container">
            <div className="d-flex justify- content-center align-items-center mb-5 mt-5">
              <h2>Existing Rooms</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <RoomFilter
                  data={rooms}
                  setFilteredData={setFilteredRooms}
                ></RoomFilter>
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Link
                  to={"/add-room"}
                  className="btn btn-outline-primary d-flex align-items-center mb-3"
                >
                  <FaPlus className="me-2" /> Add Room
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>RoomType</th>
                  <th>RoomPrice</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.price}</td>

                    <td className="gap-2">
                      <Link to={`/edit-room/${room.id}`}>
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-info btn-sm">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(room.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <RoomPaginator
              currentPage={currentPage}
              totalPage={totalPages}
              onPageChange={handlePaginationClick}
            ></RoomPaginator>
          </section>
        </>
      )}
    </>
  );
};

export default ExistingRooms;
