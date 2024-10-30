import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function TransportAdd() {
    const [inputs, setInputs] = useState({
        id: '', country: '', state: '', image: '', schedule: '', departure_time: '', arrival_time: '', vehicle_id: '', fare: '',

    });

    const [vehicle, setVehicle] = useState([]);
    const [selectedfile, setSelectedFile] = useState([]);//for image 

    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/transport/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
        let vehicleres = await axios.get(`/vehicle`)
        setVehicle(vehicleres.data.data);

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
                apiurl = `/transport/edit/${inputs.id}`;
            } else {
                apiurl = `/transport/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/transport')
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
                            <h3>Add New Transport</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Transport</a></li>
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
                                                            <label for="first-name-vertical">Country</label>
                                                            <input type="text" id="first-name-vertical" className="form-control" defaultValue={inputs.country} name="country" onChange={handleChange} placeholder="Country" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">State</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.state} name="state" onChange={handleChange} placeholder="State" />
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
                                                            <label for="email-id-vertical">Schedule</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.schedule} name="schedule" onChange={handleChange} placeholder="Schedule" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Departure_Time</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.departure_time} name="departure_time" onChange={handleChange} placeholder="Departure_Time" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Arrival_Time</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.arrival_time} name="arrival_time" onChange={handleChange} placeholder="Arrival_Time" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Vehicle_Id</label>
                                                            {vehicle.length > 0 &&
                                                                <select className="form-control" id="vehicle_id" name='vehicle_id' defaultValue={inputs.vehicle_id} onChange={handleChange}>
                                                                    <option value="">Select Vehicle</option>
                                                                    {vehicle.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Fare</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.fare} name="fare" onChange={handleChange} placeholder="Fare" />
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

export default TransportAdd