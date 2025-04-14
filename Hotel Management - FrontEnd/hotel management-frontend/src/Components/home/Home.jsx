import React from 'react'
import HomeHeader from '../layout/HomeHeader'
import HotelServices from '../common/HotelServices'
import Parallex from'../common/Parallex'
import RoomCarousal from '../common/RoomCarousal'

const Home = () => {
  return (
    <section>
      <HomeHeader/>
      <section className='container'>
        <RoomCarousal/>
        <Parallex/>
        <HotelServices/>
        <Parallex/>
        <RoomCarousal/>
      </section>
    </section>
    
   
  )
}

export default Home 