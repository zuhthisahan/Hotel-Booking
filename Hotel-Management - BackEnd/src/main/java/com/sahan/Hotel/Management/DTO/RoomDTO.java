package com.sahan.Hotel.Management.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;


@Data
@NoArgsConstructor
public class RoomDTO {

    private Long id;
    private String roomType;
    private BigDecimal price;
    private boolean isBooked;
    private String photo;

    private List<BookingDTO> bookingDTOS; // Bookings for that room

    public RoomDTO(Long id, String roomType, BigDecimal price) {
        this.id = id;
        this.roomType = roomType;
        this.price = price;
    }


    public RoomDTO(Long id, String roomType, BigDecimal price, boolean isBooked,
                   String photoBytes, List<BookingDTO> bookingDTOS) {
        this.id = id;
        this.roomType = roomType;
        this.price = price;
        this.isBooked = isBooked;
        this.photo = photoBytes;
        this.bookingDTOS = bookingDTOS;
    }
}
