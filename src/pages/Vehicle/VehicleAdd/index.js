import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function VehicleAdd() {
    const [inputs, setInputs] = useState({
        id: '', transport_id: '', name: '', vehicle_code: '', detail: '', is_ac: '', size: '', fare: '',
    });
    const [transport, setTransport] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/vehicle/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
        let transportres = await axios.get(`/transport`)
        setTransport(transportres.data.data);
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
                apiurl = `/vehicle/edit/${inputs.id}`;
            } else {
                apiurl = `/vehicle/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/vehicle')
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
                            <h3>Add New Vehicle</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Vehicle</a></li>
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
                                                            <label for="email-id-vertical">Transport</label>
                                                            {transport.length > 0 &&
                                                                <select className="form-control" id="transport_id" name='transport_id' defaultValue={inputs.transport_id} onChange={handleChange}>
                                                                    <option value="">Select Transport</option>
                                                                    {transport.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="first-name-vertical">Name</label>
                                                            <input type="text" id="first-name-vertical" className="form-control" defaultValue={inputs.name} name="name" onChange={handleChange} placeholder="Full Name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Vehicle_Code</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.vehicle_code} name="vehicle_code" onChange={handleChange} placeholder="Vehicle_Code" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Detail</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.detail} name="detail" onChange={handleChange} placeholder="Detail" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Is_AC</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.is_ac} name="is_ac" onChange={handleChange} placeholder="Is_AC" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Size</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.size} name="size" onChange={handleChange} placeholder="Size" />
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

export default VehicleAdd