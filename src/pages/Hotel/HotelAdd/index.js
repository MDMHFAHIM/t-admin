import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function HotelAdd() {
    const [inputs, setInputs] = useState({
        id: '', zone_id: '', catagory_id: '', roomtype_id: '', image: '', hotel_name: '', rating: '', is_complementary_breakfast: '', latitude: '', longitude: '', hotel_details: '', facilities: '', checkin: '', checkout: '',
    });

    const [zone, setZone] = useState([]);
    const [category, setCategory] = useState([]);
    const [roomtype, setRoomtype] = useState([]);
    const [selectedfile, setSelectedFile] = useState([]);//for image 

    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/hotel/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
        let zoneres = await axios.get(`/zone`)
        setZone(zoneres.data.data);
        let catagories = await axios.get(`/catagory`)
        setCategory(catagories.data.data);
        let roomtyperes = await axios.get(`/roomtype`)
        setRoomtype(roomtyperes.data.data);
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
                apiurl = `/hotel/edit/${inputs.id}`;
            } else {
                apiurl = `/hotel/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/hotel')
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
                            <h3>Add New Hotel</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
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
                                                            <label for="first-name-vertical">Zone</label>
                                                            {zone.length > 0 &&
                                                                <select className="form-control" id="zone_id" name='zone_id' defaultValue={inputs.zone_id} onChange={handleChange}>
                                                                    <option value="">Select Zone</option>
                                                                    {zone.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Catagory</label>
                                                            {category.length > 0 &&
                                                                <select className="form-control" id="zone_id" name='catagory_id' defaultValue={inputs.catagory_id} onChange={handleChange}>
                                                                    <option value="">Select Catagory</option>
                                                                    {category.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Roomtype</label>
                                                            {roomtype.length > 0 &&
                                                                <select className="form-control" id="zone_id" name='roomtype_id' defaultValue={inputs.roomtype_id} onChange={handleChange}>
                                                                    <option value="">Select Roomtype</option>
                                                                    {roomtype.map((d, key) =>
                                                                        <option value={d.id}>{d.bedtype}</option>
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
                                                            <label for="email-id-vertical">Hotel_Name</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.hotel_name} name="hotel_name" onChange={handleChange} placeholder="Hotel_Name" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Rating</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.rating} name="rating" onChange={handleChange} placeholder="Rating" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Is_Complementary_Breakfast</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.is_complementary_breakfast} name="is_complementary_breakfast" onChange={handleChange} placeholder="Is_Complementary_Breakfast" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Latitude</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.latitude} name="latitude" onChange={handleChange} placeholder="Latitude" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Longitude</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.longitude} name="longitude" onChange={handleChange} placeholder="Longitude" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Hotel_Details</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.hotel_details} name="hotel_details" onChange={handleChange} placeholder="Hotel_Details" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Facilities</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.facilities} name="facilities" onChange={handleChange} placeholder="Facilities" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Checkin</label>
                                                            <input type="time" id="email-id-vertical" className="form-control" defaultValue={inputs.checkin} name="checkin" onChange={handleChange} placeholder="Checkin" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Checkout</label>
                                                            <input type="time" id="email-id-vertical" className="form-control" defaultValue={inputs.checkout} name="checkout" onChange={handleChange} placeholder="Checkout" />
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

export default HotelAdd