import React, { useEffect, useState } from "react";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";
import { Col, Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: "",
    numberOfChildren: "",
  });

  const [roomInfo, setRoomInfo] = useState({
    roomType: "",
    price: "",
    photo: "",
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const resp = await getRoomById(roomId);
      setRoomPrice(resp.price);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const totalDays = moment(booking.checkOutDate).diff(moment(booking.checkInDate), "days")
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return totalDays>0 ? totalDays * paymentPerDay : 0;
  };

  const isGuestValid = () => {
    const adultCount = parseInt(booking.numberOfAdults) ||0;
    const childrenCount = parseInt(booking.numberOfChildren) || 0;
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check out date must come after checkin date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
  
    if (
      !form.checkValidity() || // Corrected typo
      !isGuestValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
      setIsSubmitted(false); // Reset the submission state on failure
    } else {
      setIsSubmitted(true); // Proceed with submission
    }
  
    setIsValidated(true); // Mark the form as validated
  };

  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/booking-success", { state: { message: error.errorMessage } });
    }
  };


  const payment = calculatePayment(); // Best practice to use it as camputed value preps since no event trigger needed in the child

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card card-title">Reserved Room</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestName">Full Name :</Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={booking.guestName}
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your full name
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="guestEmail">Email :</Form.Label>
                  <FormControl
                    required
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your email
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset style={{ border: "2px" }}>
                  <legend>Loading Period</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Group>
                        <Form.Label htmlFor="checkInDate">
                          Check-In Date :
                        </Form.Label>
                        <FormControl
                          required
                          type="date"
                          id="checkInDate"
                          name="checkInDate"
                          value={booking.checkInDate}
                          placeholder="Check-In Date"
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please select a check -in date
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-6">
                      <Form.Group>
                        <Form.Label htmlFor="checkOutDate">
                          Check-Out Date :
                        </Form.Label>
                        <FormControl
                          required
                          type="date"
                          id="checkOutDate"
                          name="checkOutDate"
                          value={booking.checkOutDate}
                          placeholder="check-out Date"
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please select a check -out date
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    {errorMessage && (
                      <p className="error-message text-danger">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Number of Guest</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Group>
                        <Form.Label htmlFor="numberOfAdults">
                          Adults :
                        </Form.Label>
                        <FormControl
                          required
                          type="number"
                          id="numberOfAdults"
                          name="numberOfAdults"
                          value={booking.numberOfAdults}
                          placeholder="0"
                          min={1}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter 1 ore more adults
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-6">
                      <Form.Group>
                        <Form.Label htmlFor="numberOfChildren">
                          Children :
                        </Form.Label>
                        <FormControl
                          type="number"
                          id="numberOfChildren"
                          name="numberOfChildren"
                          value={booking.numberOfChildren}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the number of childrens
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>
                </fieldset>

                <div className="form-group mt-2 mb-2">
                  <button type="submit" className="btn btn-hotel">
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>

          <div className="col-md-6">
            {isSubmitted && (
                <BookingSummary 
                booking={booking}
                payment={payment}
                isFormValid={isValidated}
                onConfirm={handleBooking}
                />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
