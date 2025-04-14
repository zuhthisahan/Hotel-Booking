package com.sahan.Hotel.Management.Repository;

import com.sahan.Hotel.Management.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findAllRoomTypes();
    Optional<Room> getRoomById(Long roomId);

}
