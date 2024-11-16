import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Flight_BookingAdd() {
    const [inputs, setInputs] = useState({
        id: '', customer_id: '', departure_zone: '', arrival_zone: '', flight_id: '', number_of_seat: '', check_in_date: '', check_out_date: '', total_amount: '',
    });

    const [customer, setCustomer] = useState([]);
    const [flight, setFlight] = useState([]);
    const [flightPrice, setflightPrice] = useState([]);
    const [zone, setZone] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/flight_booking/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
        let customerres = await axios.get(`/customer`)
        setCustomer(customerres.data.data);

        let zoneres = await axios.get(`/zone`)
        setZone(zoneres.data.data);
    }
    const getFlight = async (e) => {
        let departure_zone = document.getElementById('departure_zone').value;
        let arrival_zone = document.getElementById('arrival_zone').value;
        if (departure_zone && arrival_zone) {
            let flightres = await axios.get(`/flight?departure_zone=${departure_zone}&arrival_zone=${arrival_zone}`)
            setFlight(flightres.data.data);
        }
    }
    const getFlightPrice = async (e) => {
        let flight_id = document.getElementById('flight_id').value;
        if (flight_id) {
            let flightres = await axios.get(`/flightprice?flight_id=${flight_id}`)
            setflightPrice(flightres.data.data);
        }
    }
    const TotalPrice = async (e) => {
        let number_of_seat = document.getElementById('number_of_seat').value;
        let flightprice_id = document.getElementById('flightprice_id').value;
        if (flightprice_id) {
            let price = flightPrice.find(data => data.id == flightprice_id)?.airfare;
            setInputs(values => ({ ...values, ['total_amount']: price * number_of_seat }));
        }
    }

    useEffect(() => {
        if (id) {
            getDatas();
        }
        getRelational()
    }, []);

    const handleChange = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        getFlight(event)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const property in inputs) {
            formData.append(property, inputs[property])
        }

        try {
            let apiurl = '';
            if (inputs.id != '') {
                apiurl = `/flight_booking/edit/${inputs.id}`;
            } else {
                apiurl = `/flight_booking/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            //navigate('/flight_booking')
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>Add New Flight_Booking</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Flight Booking</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Add New</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <section id="basic-vertical-layouts">
                    <div className="row match-height">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form form-vertical" onSubmit={handleSubmit}>
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="first-name-vertical">Customer</label>
                                                            {customer.length > 0 &&
                                                                <select className="form-control" id="customer_id" name='customer_id' defaultValue={inputs.customer_id} onChange={handleChange}>
                                                                    <option value="">Select Customer</option>
                                                                    {customer.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">From</label>
                                                            {zone.length > 0 &&
                                                                <select className="form-control" id="departure_zone" name='departure_zone' defaultValue={inputs.departure_zone} onChange={(e) => { handleChange(e); getFlight(e) }}>
                                                                    <option value="">Select Departure</option>
                                                                    {zone.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">To</label>
                                                            {zone.length > 0 &&
                                                                <select className="form-control" id="arrival_zone" name='arrival_zone' defaultValue={inputs.arrival_zone} onChange={(e) => { handleChange(e); getFlight(e) }}>
                                                                    <option value="">Select Arrival</option>
                                                                    {zone.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Flight</label>
                                                            {flight.length > 0 &&
                                                                <select className="form-control" id="flight_id" name='flight_id' defaultValue={inputs.flight_id} onChange={(e) => { handleChange(e); getFlightPrice(e) }}>
                                                                    <option value="">Select Flight</option>
                                                                    {flight.map((d, key) =>
                                                                        <option value={d.id}>Airline- {d.airline?.name}, Time: {d.departure_time} - {d.arrival_time} Transit - {d.transit_time}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="number_of_seat">Number Of Seat</label>
                                                            <input type="text" id="number_of_seat" className="form-control" defaultValue={inputs.number_of_seat} name="number_of_seat" onChange={(e) => { handleChange(e); TotalPrice(e) }} placeholder="Number Of Seat" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="flightprice_id">Seat Type</label>
                                                            {flightPrice.length > 0 &&
                                                                <select className="form-control" id="flightprice_id" name='flightprice_id' defaultValue={inputs.flightprice_id} onChange={(e) => { handleChange(e); TotalPrice(e) }}>
                                                                    <option value="">Select Flight</option>
                                                                    {flightPrice.map((d, key) =>
                                                                        <option value={d.id}>Class: {d.class}, Trip Type: {d.trip_type} Fare: {d.airfare}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Check In Date</label>
                                                            <input type="date" id="email-id-vertical" className="form-control" defaultValue={inputs.check_in_date} name="check_in_date" onChange={handleChange} placeholder="Check In Date" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Check_Out_Date</label>
                                                            <input type="date" id="email-id-vertical" className="form-control" defaultValue={inputs.check_out_date} name="check_out_date" onChange={handleChange} placeholder="Check Out Date" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Total Amount</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.total_amount} name="total_amount" onChange={handleChange} placeholder="Total Amount" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                        <button type="reset" className="btn btn-light-secondary mr-1 mb-1">Reset</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </AdminLayout>
    )
}

export default Flight_BookingAdd