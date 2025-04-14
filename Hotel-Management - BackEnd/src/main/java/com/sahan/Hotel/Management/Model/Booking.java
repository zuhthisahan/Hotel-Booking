package com.sahan.Hotel.Management.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String guestFullName;
    private String guestEmail;
    private int noOfAdult;
    private int noOfChild;
    private int totNoGuest;

    @Column(name = "booking_code")
    private String bookingConfirmCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;


    public void calcTotalGuest(){
        this.totNoGuest = this.noOfChild + this.noOfAdult;
    }

    public void setNoOfAdult(int noOfAdult) {
        this.noOfAdult = noOfAdult;
        calcTotalGuest();
    }

    public void setNoOfChild(int noOfChild) {
        this.noOfChild = noOfChild;
        calcTotalGuest();
    }


}
