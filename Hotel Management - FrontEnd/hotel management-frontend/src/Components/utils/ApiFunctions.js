import axios from "axios";

// Set base url for the APP
export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Add a new room to the ssytem
export async function addRoom(roomType, roomPrice, photo) {
  const formData = new FormData();
  formData.append("roomType", roomType); // Add name and value for each field
  formData.append("price", roomPrice);
  formData.append("photo", photo);

  try {
    const response = await api.post("/rooms/add/new-room", formData);

    if (response.status === 200) {
      return true; // Success
    } else {
      return false; // Failure, or handle other status codes as needed
    }
  } catch (error) {
    console.error("Error while adding room:", error);
    return false; // In case of network error or other issues
  }
}

// Get all the room types available
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room-types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}

// Fetch all Rooms from DB
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms")
    // console.log(result.data)
    return result.data
  } catch (error) {
    throw new Error("Error fetching available rooms")
  }
}

// Delete a room by Room Id

export async function deleteRoom(roomId) {
  try {
    const result =await api.delete(`rooms/room/${roomId}`)
    return result.data

  } catch (error) {
    throw new Error(`Error deleting room with ${error.message}`)
  }
  
}

// To Update the selected Room
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType || "");
  formData.append("price", roomData.price || "");
  formData.append("photoBase64", roomData.photo || ""); // Explicitly append the Base64 string

  console.log("photoBase64:", roomData.photo); // Verify Base64 string in console

  try {
    const response = await api.put(`/rooms/update/${roomId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating room: ${error.message}`);
  }
}


// Fetech all the details of the selected room
export async function getRoomById(roomId) {
  try {
    // console.log(`Fetching room with ID: ${roomId}`);
    const response = await api.get(`/rooms/room/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching room: ${error.message}`);
  }
}

// Book a Room
export async function bookRoom(roomId, booking) {
  console.log(booking)
  const bookingObj = {
    "checkIn":booking.checkInDate,
    "checkOut":booking.checkOutDate,
    "guestFullName":booking.guestName,
    "guestEmail":booking.guestEmail,
    "noOfAdult":booking.numberOfAdults,
    "noOfChild":booking.numberOfChildren  }
try {
  const resp = await api.post(`/bookings/room/${roomId}/booking`, bookingObj)
  console.log(resp.data)
  return resp.data
} catch (error) {
  if(error.resp && error.resp.data){
    throw new Error(error.resp.data)
  }else{
    throw new Error(`Error Booking room: ${error.message}`)
  }
}
}

// Get all booking
export async function getAllBookings() {
  try {
    const resp = await api.get("/bookings/all-bookings")
    return resp.data
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`)
  }
}

// Get a booking by Booking Confirmation Code
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const resp = await api.get(`/bookings/confirmation/${confirmationCode}`)
    return resp.data
  } catch (error) {
    throw new Error(`Error fetching bookings by confirmtion code: ${error.message}`)
  }
}

// Cancel Bookings
export async function cancelBooking(bookingId) {
  try {
    const resp = await api.delete(`/bookings/booking/${bookingId}/delete`)
    return resp.data
  } catch (error) {
    throw new Error(`Error cancel booking: ${error.message}`)
  }
}