import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function FlightAdd() {
    const [inputs, setInputs] = useState({
        id: '', airline_id: '', image: '', departure_zone: '', arrival_zone: '', departure_time: '', arrival_time: '', transit_time: '', is_complementary_food: '', baggage_allowance: '',
    });
    const [airline, setAirline] = useState([]);
    const [zone, setZone] = useState([]);
    const [selectedfile, setSelectedFile] = useState([]);//for image 

    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/flight/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
        let airliners = await axios.get(`/airline`)
        setAirline(airliners.data.data);

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
    //for image 
    const handelFile = (e) => {
        setSelectedFile(e.target.files)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < selectedfile.length; i++) {
            formData.append('files[]', selectedfile[i])
        }

        for (const property in inputs) {
            formData.append(property, inputs[property])
        }

        try {
            let apiurl = '';
            if (inputs.id != '') {
                apiurl = `/flight/edit/${inputs.id}`;
            } else {
                apiurl = `/flight/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/flight')
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
                            <h3>Add New Flight</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Flight</a></li>
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
                                                            <label for="first-name-vertical">Airline</label>
                                                            {airline.length > 0 &&
                                                                <select className="form-control" id="airline_id" name='airline_id' defaultValue={inputs.airline_id} onChange={handleChange}>
                                                                    <option value="">Select Airline</option>
                                                                    {airline.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Image</label>
                                                            <input type="file" id="email-id-vertical" className="form-control" multiple defaultValue={inputs.image} name="image" onChange={handelFile} placeholder="Image" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">From</label>
                                                            {zone.length > 0 &&
                                                                <select className="form-control" id="departure_zone" name='departure_zone' defaultValue={inputs.departure_zone} onChange={handleChange}>
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
                                                            <label for="arrival_zone">To</label>
                                                            {zone.length > 0 &&
                                                                <select className="form-control" id="arrival_zone" name='arrival_zone' defaultValue={inputs.arrival_zone} onChange={handleChange}>
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
                                                            <label for="email-id-vertical">Departure_Time</label>
                                                            <input type="time" id="email-id-vertical" className="form-control" defaultValue={inputs.departure_time} name="departure_time" onChange={handleChange} placeholder="Departure_Time" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Arrival_Time</label>
                                                            <input type="time" id="email-id-vertical" className="form-control" defaultValue={inputs.arrival_time} name="arrival_time" onChange={handleChange} placeholder="Arrival_Time" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Transit_Time</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.transit_time} name="transit_time" onChange={handleChange} placeholder="Transit_Time" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Is_Complementary_Food</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.is_complementary_food} name="is_complementary_food" onChange={handleChange} placeholder="Is_Complementary_Food" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Baggage_Allowance</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.baggage_allowance} name="baggage_allowance" onChange={handleChange} placeholder="Baggage_Allowance" />

                                                            <div className="col-12 d-flex justify-content-end">
                                                                <button type="submit" className="btn btn-primary mr-1 mb-1">Submit</button>
                                                                <button type="reset" className="btn btn-light-secondary mr-1 mb-1">Reset</button>
                                                            </div>
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

export default FlightAdd