import React, { useState } from "react";
import RoomType from "../common/RoomType";
import { addRoom } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    roomType: "",
    price: "",
    photo: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    // For 'price', ensure it's a valid number or an empty string
    if (name === "price") {
      value = value ? parseFloat(value) : ""; // Convert to float or empty string
      if (isNaN(value)) value = ""; // If the value is not a number, set it to an empty string
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addRoom(
        newRoom.roomType,
        newRoom.price,
        newRoom.photo
      );
      if (resp) {
        setSuccessMessage("A new room was added successfully");
        setNewRoom({ roomType: "", price: "", photo: null });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout( ()=>{
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add New Room</h2>
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">
                {errorMessage}
              </div>
            )}
            <form>
              <div className="mb-3">
                <label
                  htmlFor="roomType"
                  className="form-label"
                  style={{ textAlign: "left", width: "100%" }}
                >
                  Room Type
                </label>
                <div>
                  <RoomType
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="price"
                  className="form-label"
                  style={{ textAlign: "left", width: "100%" }}
                >
                  Room Price
                </label>
                <input
                  className="form-control"
                  required
                  id="price"
                  name="price"
                  type="number"
                  value={newRoom.price}
                  onChange={handleRoomInputChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="photo"
                  className="form-label"
                  style={{ textAlign: "left", width: "100%" }}
                >
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
                    src={imagePreview}
                    className="mb-3"
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                  />
                )}

                <div className="d-grid d-md-flex mt-2">
                <Link to={"/existing-rooms"} className="btn btn-outline-info me-1">
                    All Rooms
                  </Link>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Room
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;
