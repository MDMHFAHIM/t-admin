import React, { useEffect, useState } from 'react'
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function FlightpriceAdd() {
    const [inputs, setInputs] = useState({
        id: '', flight_id: '', class: '', trip_type: '', airfare: '',

    });
    const [flight, setFlight] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/flightprice/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
        let flightres = await axios.get(`/flight`)
        setFlight(flightres.data.data);
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
                apiurl = `/flightprice/edit/${inputs.id}`;
            } else {
                apiurl = `/flightprice/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/flightprice')
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
                            <h3>Add New FlightPrice</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">FlightPrice</a></li>
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
                                                            <label for="email-id-vertical">Flight</label>
                                                            {flight.length > 0 &&
                                                                <select className="form-control" id="hotel_id" name='hotel_id' defaultValue={inputs.hotel_id} onChange={handleChange}>
                                                                    <option value="">Select Flight</option>
                                                                    {flight.map((d, key) =>
                                                                        <option value={d.id}>Airline- {d.airline.name}, Time: {d.departure_time} - {d.arrival_time} Transit - {d.transit_time}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Class</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.qty} name="qty" onChange={handleChange} placeholder="Class" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">trip type</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.trip_type} name="trip_type" onChange={handleChange} placeholder="trip type" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Airfare</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.bedtype} name="bedtype" onChange={handleChange} placeholder="Airfare" />
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

export default FlightpriceAdd