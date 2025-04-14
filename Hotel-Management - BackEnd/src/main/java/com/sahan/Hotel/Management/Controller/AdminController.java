package com.sahan.Hotel.Management.Controller;
import com.sahan.Hotel.Management.Service.BookingService;
import com.sahan.Hotel.Management.Service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    public final BookingService bookingService;
    public final RoomService roomService;


}
