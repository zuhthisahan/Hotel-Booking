package com.sahan.Hotel.Management.Service;

import com.sahan.Hotel.Management.DTO.RoomDTO;
import com.sahan.Hotel.Management.Exception.ResourceNotFoundException;
import com.sahan.Hotel.Management.Model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

// To implemented in RoomService
public interface IRoomService {
    Room addRoom(String roomType, BigDecimal price, MultipartFile photo) throws IOException, SQLException;
    List<String> findAllRoomTypes();
    List<Room> getAllRooms();
    RoomDTO convertRoomToRoomDTO(Room room) throws SQLException;
     void deleteRoom(Long roomId) throws ResourceNotFoundException;

    RoomDTO updateRoom(Long roomId, String roomType, BigDecimal price, String photoBase64) throws IOException, SQLException;

    Blob getRoomPhotoById(Long roomId);

    RoomDTO getRoomById(Long roomId) throws SQLException;

    byte[] getRoomPhoto(Long roomId) throws SQLException;
}
