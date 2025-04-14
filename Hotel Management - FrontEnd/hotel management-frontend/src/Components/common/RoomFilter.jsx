import React, { useState } from 'react'

const RoomFilter = ({data, setFilteredData}) => { // Parent call with All room data array and setFilterData function
  const[userFilter, setUserFilter] = useState("") // 

  const handleSelectChange = (e) =>{
    const selectRoomType = e.target.value // Read and set the input filter option 
    setUserFilter(selectRoomType)
    // No needed but for the optimization
    // Avoid filtering when no option slected
    if (!selectRoomType) {
      setFilteredData(data); // Reset to all data if no filter
      return;
    }
    const filteredRooms = data.filter((room) => ( // filter methon assign the values which are true on the call back Fn to a new Array
      room.roomType.toLowerCase().includes(selectRoomType.toLowerCase()) // Check for partial(substring match) in room types (=== Vs includes)
    ))
    setFilteredData(filteredRooms) // update the filtered data state in the parent component
  }

  // Function to clear applied filters on RoomType
  const handleClear = () =>{
    setUserFilter("")
    setFilteredData(data)
  }

  // Hold the unique Room types
  // data.map => create an array with the room types
  // Set > converts the array to set of Unique elements : remove dublicates
  // ... is a "Spread Oerator" create a new array from the set
  // "", ... > Set the first elemnt of the new array to ""
  // ?.  in case data is undefined or null, to prevent runtime errors.
  const uniqueRoomTypes = ["", ...new Set(data?.map((room) => room.roomType))]
  return (
    <div className='input-group mb-3'>
      <span className='input-group-text' id='room-type-filter'>
        Filter by room type
      </span>
      <select
      className='form-select'
      value={userFilter}
      onChange={handleSelectChange}
      aria-label="Filter rooms by type"
      >
        <option value={""}>Select a room type here..</option>
        {uniqueRoomTypes.map((type, index) =>( // provide filter options based on the values in uniqueRoomTypes
          <option key={index} value={type}>
            {type}
          </option>

        ))}
      </select>

      <button className='btn btn-hotel' type= "button" onClick={handleClear}>
        Clear Filter
      </button>
      
    </div>
  )
}

export default RoomFilter