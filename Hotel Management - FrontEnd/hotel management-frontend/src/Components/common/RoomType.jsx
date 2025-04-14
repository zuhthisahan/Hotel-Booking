import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomType = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    // useEffect(() => {
    //     const fetchRoomTypes = async () => {
    //         try {
    //             const data = await getRoomTypes();
    //             setRoomTypes(data);
    //         } catch (error) {
    //             console.error("Failed to fetch room types:", error);
    //         }
    //     };
    
    //     fetchRoomTypes();
    // }, []);

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        });
    }, []);

    const handleNewRoomInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        className='form-control'
                        id='roomType'
                        name='roomType'
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewRoomTypeInput(true)
                            } else {
                                handleRoomInputChange(e)
                            }
                        }}
                    >
                        <option value={""}>Select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>

                    {showNewRoomTypeInput && (
                        <div className='input-group'>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Enter new room type'
                                onChange={handleNewRoomInputChange}
                            />

                            <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add Room</button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomType
