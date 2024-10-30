import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function SubscriptionAdd() {
    const [inputs, setInputs] = useState({
        id: '', image: '', name: '', email: '', zone_id: '', address: '', contact: '', alt_contact: '',
    });
    const [zone, setZone] = useState([]);
    const [selectedfile, setSelectedFile] = useState([]);//for image 

    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/subscription/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
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
                apiurl = `/subscription/edit/${inputs.id}`;
            } else {
                apiurl = `/subscription/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/subscription')
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
                            <h3>Add New Subscription</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Subscription</a></li>
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
                                                            <label for="email-id-vertical">Image</label>
                                                            <input type="file" id="email-id-vertical" className="form-control" multiple defaultValue={inputs.image} name="image" onChange={handelFile} placeholder="Image" />
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
                                                            <label for="email-id-vertical">Email</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.email} name="email" onChange={handleChange} placeholder="Email" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Zone_Id</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.zone_id} name="zone_id" onChange={handleChange} placeholder="Zone_Id" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Address</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.address} name="address" onChange={handleChange} placeholder="Address" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Contact</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.contact} name="contact" onChange={handleChange} placeholder="Contact" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Alt_Contact</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.alt_contact} name="alt_contact" onChange={handleChange} placeholder="Alt-Contact" />
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

export default SubscriptionAdd