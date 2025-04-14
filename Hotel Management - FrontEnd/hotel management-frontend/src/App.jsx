import { useState } from 'react'
import AddRoom from './Components/room/addRoom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ExistingRooms from './Components/room/ExistingRooms';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/home/Home';
import EditRoom from './Components/room/EditRoom'
import Footer from './Components/layout/Footer';
import NavBar from './Components/layout/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RoomListing from './Components/room/RoomListing'
import Admin from './Components/admin/Admin';
import Checkout from './Components/bookings/Checkout';
import BookingSuccess from './Components/bookings/BookingSuccess'
import ManageBooking from './Components/admin/ManageBooking';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element ={<Home/>} />
          <Route path='/edit-room/:roomId' element ={<EditRoom/>} />
          <Route path='/existing-rooms' element ={<ExistingRooms/>}/>
          <Route path='/add-room' element ={<AddRoom/>}/>
          <Route path='/browse-all-rooms' element ={<RoomListing/>}/>
          <Route path='/admin' element ={<Admin/>}/>
          <Route path='/book-room/:roomId' element ={<Checkout/>} />
          <Route path='/booking-success' element ={<BookingSuccess/>}/>
          <Route path='/manage-booking' element ={<ManageBooking/>}/>
        </Routes>
      </Router>
      <Footer/>
    </main>
  );
}
export default App
