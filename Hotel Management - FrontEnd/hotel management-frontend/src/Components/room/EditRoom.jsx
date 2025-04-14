import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

const EditRoom = () => {
  const [room, setRoom] = useState({
    roomType: "",
    price: "",
    photo: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { roomId } = useParams();

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  // Get the room data
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRoomById(roomId);
        setRoom(data);
        if (data.photo && data.photo.trim() !== "") {
          setImagePreview(`data:image/jpeg;base64,${data.photo}`);
        }
      } catch (error) {
        console.log("Error fetching room data:", error);
      }
    };
    fetchRooms();
  }, [roomId]);
  

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await updateRoom(roomId, room);
      if (resp.status === 200) {
        setSuccessMessage("Room updated successfully");
        const updatedRoom = await getRoomById(roomId);
        setRoom(updatedRoom);
        setImagePreview(updatedRoom.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      setErrorMessage(error?.message || "An unexpected error occurred");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Edit Room</h2>
          {successMessage && (
            <div className="alert alert-success fade show">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger fade show">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">
                Room Type
              </label>
              <input
                className="form-control"
                required
                id="roomType"
                name="roomType"
                value={room.roomType}
                onChange={handleRoomInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Room Price
              </label>
              <input
                className="form-control"
                required
                id="price"
                name="price"
                type="number"
                value={room.price}
                onChange={handleRoomInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Room Photo
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                className="form-control"
                onChange={handleImage}
              />
              {imagePreview && (
                <img
                  src={`data:image/jpeg;base64, ${imagePreview}`}
                  className="mt-3"
                  alt="Preview Room Photo"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                />
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
              Back
              </Link>
              <button type="submit" className="btn btn-outline-warning">
                Save Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditRoom;
