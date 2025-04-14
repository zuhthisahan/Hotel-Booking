package com.sahan.Hotel.Management.Controller;

import com.sahan.Hotel.Management.DTO.BookingDTO;
import com.sahan.Hotel.Management.DTO.BookingRequestDTO;
import com.sahan.Hotel.Management.Exception.InvalidBookingException;
import com.sahan.Hotel.Management.Exception.ResourceNotFoundException;
import com.sahan.Hotel.Management.Model.Booking;
import com.sahan.Hotel.Management.Service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController()
@RequestMapping("/bookings")
public class BookingController {

    public final BookingService bookingService;

    @GetMapping("/all-bookings")
    public ResponseEntity<?> getAllBookings(){
        List<Booking> allBookings = bookingService.getAllBookings();
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        for(Booking booking: allBookings){
            BookingDTO bookingDTO = bookingService.getBookingDTO(booking);
            bookingDTOS.add(bookingDTO);
        }
        return ResponseEntity.ok(bookingDTOS);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try {
            // Retrieve booking using the service
            Booking booking = bookingService
                    .getBookingByConfirmationCode(confirmationCode)
                    .orElseThrow(() -> new ResourceNotFoundException("Booking not found with code: " + confirmationCode));

            // Convert Booking to BookingDTO
            BookingDTO bookingDTO = bookingService.getBookingDTO(booking);

            // Return the BookingDTO in a 200 OK response
            return ResponseEntity.ok(bookingDTO);

        } catch (ResourceNotFoundException e) {
            // Handle resource not found exception with 404 response
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Handle any unexpected exceptions with a 500 response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
                                         @RequestBody BookingRequestDTO bookingRequestDTO){

        try {
            String confirmCode= bookingService.saveBooking(roomId, bookingRequestDTO);
            return ResponseEntity.status(HttpStatus.OK).body("Room booked Successfully. Your Booking Confirmation Code is : " + confirmCode);
        } catch (InvalidBookingException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("booking/{bookingId}/delete")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId){
         bookingService.cancelBooking(bookingId);
         return ResponseEntity.noContent().build();
    }

}
