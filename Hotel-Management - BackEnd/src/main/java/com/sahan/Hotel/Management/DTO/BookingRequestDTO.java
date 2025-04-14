package com.sahan.Hotel.Management.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequestDTO {
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String guestFullName;
    private String guestEmail;
    private int noOfAdult;
    private int noOfChild;
}
