package com.sahan.Hotel.Management.Service;


import com.sahan.Hotel.Management.DTO.BookingDTO;
import com.sahan.Hotel.Management.DTO.BookingRequestDTO;
import com.sahan.Hotel.Management.Model.Booking;

import java.util.List;
import java.util.Optional;

public interface IBookingService {

    List<Booking> getAllBookings();

    BookingDTO getBookingDTO(Booking booking);

    Optional<Booking> getBookingByConfirmationCode(String confirmationCode);

    String saveBooking(Long roomId, BookingRequestDTO booking);

    void cancelBooking(Long bookingId);
}
