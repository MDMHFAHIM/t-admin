import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Customer from './pages/Customer';
import CustomerAdd from './pages/Customer/CustomerAdd';
import Package from './pages/Package';
import PackageAdd from './pages/Package/PackageAdd';
import Package_Booking from './pages/Package_Booking';
import Package_BookingAdd from './pages/Package_Booking/Package_BookingAdd';
import Hotel from './pages/Hotel';
import HotelAdd from './pages/Hotel/HotelAdd';
import Hotel_Booking from './pages/Hotel_Booking';
import Hotel_BookingAdd from './pages/Hotel_Booking/Hotel_BookingAdd';
import Flight from './pages/Flight';
import FlightAdd from './pages/Flight/FlightAdd';
import Flight_Booking from './pages/Flight_Booking';
import Flight_BookingAdd from './pages/Flight_Booking/Flight_BookingAdd';
import Transport from './pages/Transport';
import TransportAdd from './pages/Transport/TransportAdd';
import Subscription from './pages/Subscription';
import SubscriptionAdd from './pages/Subscription/SubscriptionAdd';
import Catagory from './pages/Catagory';
import CatagoryAdd from './pages/Catagory/CatagoryAdd';
import Country from './pages/Country';
import CountryAdd from './pages/Country/CountryAdd';
import State from './pages/State';
import StateAdd from './pages/State/StateAdd';
import Zone from './pages/Zone';
import ZoneAdd from './pages/Zone/ZoneAdd';
import Roomtype from './pages/Roomtype';
import RoomtypeAdd from './pages/Roomtype/RoomtypeAdd';
import Airline from './pages/Airline';
import AirlineAdd from './pages/Airline/AirlineAdd';
import Vehicle from './pages/Vehicle';
import VehicleAdd from './pages/Vehicle/VehicleAdd';



import Protected from './components/protected';

function App() {
  const isSignedIn = localStorage.getItem("access_token") || false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path={"/"} element={
          <Protected isSignedIn={isSignedIn} >
            <Dashboard />
          </Protected>
        } />
        <Route path={"/customer"} element={
          <Protected isSignedIn={isSignedIn} >
            <Customer />
          </Protected>
        } />
        <Route path={"/customer/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <CustomerAdd />
          </Protected>
        } />
        <Route path={"/customer/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <CustomerAdd />
          </Protected>
        } />
        <Route path={"/package"} element={
          <Protected isSignedIn={isSignedIn} >
            <Package />
          </Protected>
        } />
        <Route path={"/package/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <PackageAdd />
          </Protected>
        } />
        <Route path={"/package/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <PackageAdd />
          </Protected>
        } />
        <Route path={"/package_booking"} element={
          <Protected isSignedIn={isSignedIn} >
            <Package_Booking />
          </Protected>
        } />
        <Route path={"/package_booking/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <Package_BookingAdd />
          </Protected>
        } />
        <Route path={"/package_booking/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <Package_BookingAdd />
          </Protected>
        } />
        <Route path={"/hotel"} element={
          <Protected isSignedIn={isSignedIn} >
            <Hotel />
          </Protected>
        } />
        <Route path={"/hotel/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <HotelAdd />
          </Protected>
        } />
        <Route path={"/hotel/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <HotelAdd />
          </Protected>
        } />
        <Route path={"/hotel_booking"} element={
          <Protected isSignedIn={isSignedIn} >
            <Hotel_Booking />
          </Protected>
        } />
        <Route path={"/hotel_booking/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <Hotel_BookingAdd />
          </Protected>
        } />
        <Route path={"/hotel_booking/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <Hotel_BookingAdd />
          </Protected>
        } />
        <Route path={"/flight"} element={
          <Protected isSignedIn={isSignedIn} >
            <Flight />
          </Protected>
        } />
        <Route path={"/flight/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <FlightAdd />
          </Protected>
        } />
        <Route path={"/flight/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <FlightAdd />
          </Protected>
        } />
        <Route path={"/flight_booking"} element={
          <Protected isSignedIn={isSignedIn} >
            <Flight_Booking />
          </Protected>
        } />
        <Route path={"/flight_booking/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <Flight_BookingAdd />
          </Protected>
        } />
        <Route path={"/flight_booking/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <Flight_BookingAdd />
          </Protected>
        } />
        <Route path={"/transport"} element={
          <Protected isSignedIn={isSignedIn} >
            <Transport />
          </Protected>
        } />
        <Route path={"/transport/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <TransportAdd />
          </Protected>
        } />
        <Route path={"/transport/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <TransportAdd />
          </Protected>
        } />
        <Route path={"/subscription"} element={
          <Protected isSignedIn={isSignedIn} >
            <Subscription />
          </Protected>
        } />
        <Route path={"/subscription/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <SubscriptionAdd />
          </Protected>
        } />
        <Route path={"/subscription/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <SubscriptionAdd />
          </Protected>
        } />
        <Route path={"/catagory"} element={
          <Protected isSignedIn={isSignedIn} >
            <Catagory />
          </Protected>
        } />
        <Route path={"/catagory/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <CatagoryAdd />
          </Protected>
        } />
        <Route path={"/catagory/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <CatagoryAdd />
          </Protected>
        } />
        <Route path={"/country"} element={
          <Protected isSignedIn={isSignedIn} >
            <Country />
          </Protected>
        } />
        <Route path={"/country/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <CountryAdd />
          </Protected>
        } />
        <Route path={"/country/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <CountryAdd />
          </Protected>
        } />
        <Route path={"/state"} element={
          <Protected isSignedIn={isSignedIn} >
            <State />
          </Protected>
        } />
        <Route path={"/state/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <StateAdd />
          </Protected>
        } />
        <Route path={"/state/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <StateAdd />
          </Protected>
        } />

        <Route path={"/zone"} element={
          <Protected isSignedIn={isSignedIn} >
            <Zone />
          </Protected>
        } />
        <Route path={"/zone/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <ZoneAdd />
          </Protected>
        } />
        <Route path={"/zone/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <ZoneAdd />
          </Protected>
        } />
        <Route path={"/roomtype"} element={
          <Protected isSignedIn={isSignedIn} >
            <Roomtype />
          </Protected>
        } />
        <Route path={"/roomtype/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <RoomtypeAdd />
          </Protected>
        } />
        <Route path={"/roomtype/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <RoomtypeAdd />
          </Protected>
        } />

        <Route path={"/airline"} element={
          <Protected isSignedIn={isSignedIn} >
            <Airline />
          </Protected>
        } />
        <Route path={"/airline/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <AirlineAdd />
          </Protected>
        } />
        <Route path={"/airline/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <AirlineAdd />
          </Protected>
        } />

        <Route path={"/vehicle"} element={
          <Protected isSignedIn={isSignedIn} >
            <Vehicle />
          </Protected>
        } />
        <Route path={"/vehicle/add"} element={
          <Protected isSignedIn={isSignedIn} >
            <VehicleAdd />
          </Protected>
        } />
        <Route path={"/vehicle/edit/:id"} element={
          <Protected isSignedIn={isSignedIn} >
            <VehicleAdd />
          </Protected>
        } />
      </Routes>
    </BrowserRouter >
  );
}

export default App;