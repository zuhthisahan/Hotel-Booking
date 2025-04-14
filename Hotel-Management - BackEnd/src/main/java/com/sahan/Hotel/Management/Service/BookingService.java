package com.sahan.Hotel.Management.Service;

import com.sahan.Hotel.Management.DTO.BookingDTO;
import com.sahan.Hotel.Management.DTO.BookingRequestDTO;
import com.sahan.Hotel.Management.DTO.RoomDTO;
import com.sahan.Hotel.Management.Exception.InvalidBookingException;
import com.sahan.Hotel.Management.Model.Booking;
import com.sahan.Hotel.Management.Model.Room;
import com.sahan.Hotel.Management.Repository.BookingRepository;
import com.sahan.Hotel.Management.Repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BookingService implements IBookingService {

    private final BookingRepository bookingRepo;
    private final RoomRepository roomRepository;

    public List<Booking> getAllBookingsByRoomId(Long roomId) {
        return bookingRepo.findAllBookingsByRoomId(roomId);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @Override
    public BookingDTO getBookingDTO(Booking booking) {
        Room theRoom = roomRepository.getRoomById(booking.getRoom().getId()).get();
        RoomDTO roomDTO = new RoomDTO(theRoom.getId(),
                theRoom.getRoomType(),theRoom.getPrice());
        return new BookingDTO(booking.getBookingId(),booking.getCheckIn(),booking.getCheckOut(),
                booking.getGuestFullName(),booking.getGuestEmail(),booking.getNoOfAdult(),booking.getNoOfChild(),
                booking.getTotNoGuest(),booking.getBookingConfirmCode(),roomDTO);
    }

    @Override
    public Optional<Booking> getBookingByConfirmationCode(String confirmationCode) {
        return bookingRepo.getBookingByBookingConfirmCode(confirmationCode);
    }

    @Override
    public String saveBooking(Long roomId, BookingRequestDTO bookingRequestDTO) {
        Booking bookingRequest = new Booking();
        System.out.println(bookingRequestDTO.getGuestEmail());
        bookingRequest.setCheckIn(bookingRequestDTO.getCheckIn());
        bookingRequest.setCheckOut(bookingRequestDTO.getCheckOut());
        bookingRequest.setGuestEmail(bookingRequestDTO.getGuestEmail());
        bookingRequest.setGuestFullName(bookingRequestDTO.getGuestFullName());
        bookingRequest.setNoOfAdult(bookingRequestDTO.getNoOfAdult());
        bookingRequest.setNoOfChild(bookingRequestDTO.getNoOfChild());

        if(bookingRequest.getCheckOut().isBefore(bookingRequest.getCheckIn())){
            throw new InvalidBookingException("Check-in date must come before check-out");
        }
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new InvalidBookingException("Room not found"));
        List<Booking> existingBookings = room.getBookings();
        boolean isRoomAvailable= isRoomAvailable(bookingRequest,existingBookings);
        if(isRoomAvailable){
            room.addBooking(bookingRequest);
            bookingRepo.save(bookingRequest);
        }else {
            throw new InvalidBookingException("This room not available on the requested dates..");
        }


        return bookingRequest.getBookingConfirmCode();
    }

    private boolean isRoomAvailable(Booking bookingRequest, List<Booking> existingBookings) {
        for (Booking existingBooking : existingBookings) {
            // Check if bookingRequest overlaps with existingBooking, avoiding exact date matches
            boolean isOverlap =
                    (bookingRequest.getCheckIn().isBefore(existingBooking.getCheckOut()) &&
                            bookingRequest.getCheckOut().isAfter(existingBooking.getCheckIn())) &&
                            !(bookingRequest.getCheckIn().isEqual(existingBooking.getCheckOut()) ||
                                    bookingRequest.getCheckOut().isEqual(existingBooking.getCheckIn()));

            // If there is an overlap, return false (room not available)
            if (isOverlap) {
                return false;
            }
        }
        // If no overlap is found, return true (room available)
        return true;
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepo.deleteById(bookingId);
    }


}
