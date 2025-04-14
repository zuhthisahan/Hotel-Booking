import React, { useEffect, useState } from "react";
import { getAllBookings } from "../utils/ApiFunctions";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap"; //Add a spinner for loading state
import RoomPaginator from "../common/RoomPaginator";


const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;


  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const resp = await getAllBookings();
      setBookings(resp);

      setErrorMessage("");
    } catch (error) {
      setErrorMessage(`Error fetching Bookings: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookings = () => {
    return bookings.map((booking) => (
      <div key={booking.id} id={booking.id}>
        {booking.id}
      </div>
    ));
  };

  const handlePaginationClick = (pageNumber) => {
    // once the user clicked the next page, update the current page
    setCurrentPage(pageNumber); // Will be called in the Room Paginator component
  };


  const totalPages = bookings.length>0 ? Math.ceil(bookings.length / roomsPerPage) : 0;
  const indexOfLastBooking = currentPage * roomsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - roomsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);


  return (
    <>
      <section className="container my-5">
        <h2 className="text-center mb-4">Booking List</h2>
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : bookings.length > 0 ? (
          <table className="table table-bordered table-hover table-striped table-sm">
            <thead className="thead-dark">
              <tr className="text-center">
                <th>#</th>
                <th>Guest Name</th>
                <th>Guest Email</th>
                <th>Guest Total</th>
                <th>Check-In</th>
                <th>Check-Out Name</th>
                <th>Booking Code</th>
                <th>Room No</th>
                <th>Edit/delete</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentBookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.guestFullName}</td>
                  <td>{booking.guestEmail}</td>
                  <td>{booking.totNoGuest}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.bookingConfirmCode}</td>
                  <td>{booking.room.id}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <Link
                      to={`/edit-booking/${booking.bookingId}`}
                      className="btn btn-info btn-sm"
                    >
                      <span className="btn btn-info btn-sm">
                        <FaEdit />
                      </span>
                    </Link>
                    <a
                      href={`bookings/${booking.bookingId}/delete`}
                      className="btn btn-danger ms-2"
                    >
                      <FaTrashAlt />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-danger text-center">
            {errorMessage || "No Bookings to show"}
          </p>
        )}
         <RoomPaginator
              currentPage={currentPage}
              totalPage={totalPages}
              onPageChange={handlePaginationClick}
            ></RoomPaginator>
      </section>
    </>
  );
};

export default ManageBooking;
