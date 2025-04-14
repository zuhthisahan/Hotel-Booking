package com.sahan.Hotel.Management.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomType;
    private BigDecimal price;
    private boolean isBooked = false;

    @Lob
    private Blob photo;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Booking> bookings;

    public Room() {
        this.bookings = new ArrayList<>();
    }


    public void addBooking(Booking booking) {
//        if (this.bookings == null) {
//            this.bookings = new ArrayList<>();
//        }
        this.bookings.add(booking);
        this.isBooked=true;
        String code = RandomStringUtils.random(10,true,true);
        booking.setBookingConfirmCode(code);
        booking.setRoom(this);  // Make sure to set the room reference in the booking
    }


}
