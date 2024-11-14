import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Flight_BookingAdd() {
    const [inputs, setInputs] = useState({
        id: '', customer_id: '', zone_id: '', flight_id: '', number_of_seat: '', check_in_date: '', check_out_date: '', total_amount: '',
    });

    const [customer, setCustomer] = useState([]);
    const [flight, setFlight] = useState([]);
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

        let flightres = await axios.get(`/flight`)
        setFlight(flightres.data.data);
        
        let zoneres = await axios.get(`/zone`)
        setZone(zoneres.data.data);

    }

    useEffect(() => {
        if (id) {
            getDatas();
        }
        getRelational()
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
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
            navigate('/flight_booking')
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
                                                                <select className="form-control" id="zone_id" name='zone_id' defaultValue={inputs.zone_id} onChange={handleChange}>
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
                                                                <select className="form-control" id="zone_id" name='zone_id' defaultValue={inputs.zone_id} onChange={handleChange}>
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
                                                                <select className="form-control" id="flight_id" name='flight_id' defaultValue={inputs.flight_id} onChange={handleChange}>
                                                                    <option value="">Select Flight</option>
                                                                    {flight.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Number Of Seat</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.number_of_seat} name="number_of_seat" onChange={handleChange} placeholder="Number Of Seat" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Check In Date</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.check_in_date} name="check_in_date" onChange={handleChange} placeholder="Check In Date" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Check_Out_Date</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.check_out_date} name="check_out_date" onChange={handleChange} placeholder="Check Out Date" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Total Amount</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.total_amount} name="total_amount" onChange={handleChange} placeholder="Total Amount" />
                                                        </div>
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