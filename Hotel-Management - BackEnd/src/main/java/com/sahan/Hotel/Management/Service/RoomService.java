package com.sahan.Hotel.Management.Service;

import com.sahan.Hotel.Management.DTO.BookingDTO;
import com.sahan.Hotel.Management.DTO.RoomDTO;
import com.sahan.Hotel.Management.Exception.ResourceNotFoundException;
import com.sahan.Hotel.Management.Model.Room;
import com.sahan.Hotel.Management.Repository.RoomRepository;
import com.sahan.Hotel.Management.Utils.PhotoUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoomService implements IRoomService{

    private final RoomRepository roomRepository;
    private final BookingService bookingService;

    @Override
    public Room addRoom(String roomType, BigDecimal price, MultipartFile photo) throws IOException, SQLException {
       Room room = new Room();
        if (!photo.isEmpty()){
            byte[] photoBytes = photo.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
            room.setRoomType(roomType);
            room.setPrice(price);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> findAllRoomTypes() {
        return roomRepository.findAllRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public void deleteRoom(Long roomId) throws ResourceNotFoundException {
        if(!roomRepository.existsById(roomId)) throw  new ResourceNotFoundException("Room");
        roomRepository.deleteById(roomId);
    }

    @Override
    public RoomDTO updateRoom(Long roomId, String roomType, BigDecimal price, String photoBase64) throws IOException, SQLException {
       Room room = roomRepository.findById(roomId)
               .orElseThrow(()-> new ResourceNotFoundException("Room with ID " + roomId + "not Found"));
        Blob photoBlob = !photoBase64.isEmpty() ?
                PhotoUtils.convertByteToBlob(PhotoUtils.convertBase64ToByte(photoBase64)): room.getPhoto();

       if (roomType != null) room.setRoomType(roomType);
       if(price != null) room.setPrice(price);
       room.setPhoto(photoBlob);

       roomRepository.save(room);
       return convertRoomToRoomDTO(room);
    }

    @Override
    public Blob getRoomPhotoById(Long roomId) {
        Optional<Room> room = roomRepository.findById(roomId);
        // return room.map(room1 -> room1.getPhoto()).orElse(null);
        return room.map(Room::getPhoto).orElse(null);
    }

    @Override
    public RoomDTO getRoomById(Long roomId) throws SQLException {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room.isPresent()) {
            System.out.println(room.get().getPrice());
            return convertRoomToRoomDTO(room.get());
        } else {
            throw new ResourceNotFoundException("Room not Found with ID : " + roomId);
        }
    }


    @Override
    public RoomDTO convertRoomToRoomDTO(Room room) throws SQLException {
        // Find all booking for the particular room
        List<BookingDTO> bookingInfo = bookingService.getAllBookingsByRoomId(room.getId())
                .stream()
                .map(booking -> new BookingDTO(
                        booking.getBookingId(), booking.getCheckIn(), booking.getCheckOut(), booking.getBookingConfirmCode()))
                .toList();

        byte[] photoBytes = PhotoUtils.convertBlobToBytes(room.getPhoto());
        String base64Photo = PhotoUtils.convertBytesToBase64(photoBytes);
        return new RoomDTO(room.getId(), room.getRoomType(), room.getPrice(), room.isBooked(), base64Photo, bookingInfo);
    }

    @Override
    public byte[] getRoomPhoto(Long roomId) throws SQLException {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + roomId));

        if (room.getPhoto() == null) {
            return null;
        }
       return  PhotoUtils.convertBlobToBytes(room.getPhoto());
    }

}
