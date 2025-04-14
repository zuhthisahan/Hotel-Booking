import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const noOfDays = checkOutDate.diff(checkInDate, "days")
    const[isBookingConfirmed, setisBookingConfirmed] = useState(false)
    const[isProcessingPayment, setIsProcessingPayment] = useState(false)
    const navigate = useNavigate()

    const handleConfirmBooking = ()=>{
        setIsProcessingPayment(true)
        setTimeout(()=>{
            setIsProcessingPayment(false)
            setisBookingConfirmed(true)
            onConfirm(booking)
        }, 3000)
    }
    
    useEffect(()=>{
        if(isBookingConfirmed){
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])


  return (
    <div className='card card-body mt-5'>
        <h4>Reservation Summary</h4>
        <p>Full Name: <strong>{booking.guestName}</strong></p>
        <p>Email: <strong>{booking.guestEmail}</strong></p>
        <p>Check-In Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
        <p>Check-Out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
        <p>Total days Staying: <strong>{noOfDays}</strong></p>
        <div>
            <h5>No of Guest</h5>
            <strong>
                Adult {booking.numberOfAdults >1 ? "s": ""} : {booking.numberOfAdults}
            </strong>
            <strong>
                Children: {booking.numberOfChildren}
            </strong>
        </div>

        <div>
            {payment>0 ? (
                <>
                <p>

                    Total Payment: <strong>${payment}</strong>
                </p>
                {isFormValid && !isBookingConfirmed ? (
                    <Button
                    variant='success' onClick={handleConfirmBooking}>
                        {isProcessingPayment ? (
                            <> 
                            <span 
                            className='spinner-border spinner-border-sm mr-2'
                            role='status'
                            aria-hidden="true">
                            </span>
                            Booking Confirmed, redirecting to the Payment...
                            </>
                        ):("Confirm Booking and Proceed to payment")}

                    </Button>
                ): isBookingConfirmed ? (
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='spinner-border text-primary' role='status'>
                            <span className='sr-only'>Loading..</span>
                        </div>
                    </div>
                ): null}
                </>
            ):(
                <p className='text-danger'>Checkin and out date must be valid before booking </p>
            )} 
        </div>   
    </div>
  )
}

export default BookingSummary