package com.sahan.Hotel.Management.Controller;


import com.sahan.Hotel.Management.DTO.BookingDTO;
import com.sahan.Hotel.Management.DTO.RoomDTO;
import com.sahan.Hotel.Management.Exception.PhotoRetrievedException;
import com.sahan.Hotel.Management.Exception.ResourceNotFoundException;
import com.sahan.Hotel.Management.Model.Booking;
import com.sahan.Hotel.Management.Model.Room;
import com.sahan.Hotel.Management.Service.BookingService;
import com.sahan.Hotel.Management.Service.RoomService;
import com.sahan.Hotel.Management.Utils.PhotoUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

    private final RoomService roomService;
    private final BookingService bookingService;

    @PostMapping("/add/new-room")
    public ResponseEntity<?> addRoom(@RequestParam("roomType") String roomType,
                                     @RequestParam("price") BigDecimal price,
                                     @RequestParam("photo") MultipartFile photo){
        Room savedRoom = null;
        try {
            savedRoom = roomService.addRoom( roomType,price, photo);
        } catch (IOException | SQLException e) {
            throw new RuntimeException(e);
        }
        RoomDTO response = new RoomDTO(savedRoom.getId(),savedRoom.getRoomType(),savedRoom.getPrice());
    return ResponseEntity.ok(response);
    }

    @GetMapping("/room-types")
    public ResponseEntity<?> getRoomTypes(){
        return ResponseEntity.ok(roomService.findAllRoomTypes());
    }

    @GetMapping("/all-rooms")
    public ResponseEntity<?> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomDTO> roomDTOS = rooms.stream()
                .map(room -> {
                    try {
                        return roomService.convertRoomToRoomDTO(room);
                    } catch (SQLException e) {
                        throw new PhotoRetrievedException(e); // Consolidated Exception Handling
                    }
                })
                .toList();
        return ResponseEntity.ok(roomDTOS);
    }

    @DeleteMapping("room/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long roomId){
        roomService.deleteRoom(roomId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{roomId}")
    public ResponseEntity<?> updateRoom(@PathVariable Long roomId,
                                        @RequestParam(required = false) String roomType,
                                        @RequestParam(required = false) BigDecimal price,
                                        @RequestParam(required = false) String photoBase64) throws IOException, SQLException {
        System.out.println("photoBase64 received: " + photoBase64); // Debug log
        RoomDTO newRoom = roomService.updateRoom(roomId, roomType, price, photoBase64);
        System.out.println("Update successful");
        return ResponseEntity.ok(newRoom);
    }


   @GetMapping("/room/{roomId}")
    public ResponseEntity<?> getRoomById(@PathVariable(name = "roomId") Long roomId) throws SQLException {

        RoomDTO room = roomService.getRoomById(roomId);
        return ResponseEntity.ok(room);
   }

    @GetMapping("/rooms/{roomId}/photo")
    public ResponseEntity<byte[]> getRoomPhoto(@PathVariable Long roomId) throws SQLException {
        byte[] photoBytes = roomService.getRoomPhoto(roomId);
        if (photoBytes == null ) return ResponseEntity.notFound().build();
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(photoBytes);
    }

}
