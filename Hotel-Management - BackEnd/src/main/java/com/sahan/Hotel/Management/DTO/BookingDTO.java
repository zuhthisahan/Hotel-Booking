package com.sahan.Hotel.Management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {

    private Long bookingId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String guestFullName;
    private String guestEmail;
    private int noOfAdult;
    private int noOfChild;
    private int totNoGuest;
    private String bookingConfirmCode;
    private RoomDTO room;

    public BookingDTO(Long bookingId, LocalDate checkIn, LocalDate checkOut, String bookingConfirmCode) {
        this.bookingId = bookingId;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.bookingConfirmCode = bookingConfirmCode;
    }
}
