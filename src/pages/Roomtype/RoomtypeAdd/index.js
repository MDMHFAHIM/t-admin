import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function RoomtypeAdd() {
    const [inputs, setInputs] = useState({
        id: '', hotel_id: '', qty: '', bedtype: '', facilities: '', is_ac: '', is_tv: '', roomfare: '', number_of_guest: '',

    });
    const [hotel, setHotel] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/roomtype/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
        let hotelres = await axios.get(`/hotel`)
        setHotel(hotelres.data.data);
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
                apiurl = `/roomtype/edit/${inputs.id}`;
            } else {
                apiurl = `/roomtype/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/roomtype')
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
                            <h3>Add New Roomtype</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Roomtype</a></li>
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
                                                            <label for="email-id-vertical">Hotel</label>
                                                            {hotel.length > 0 &&
                                                                <select className="form-control" id="hotel_id" name='hotel_id' defaultValue={inputs.hotel_id} onChange={handleChange}>
                                                                    <option value="">Select Hotel</option>
                                                                    {hotel.map((d, key) =>
                                                                        <option value={d.id}>{d.hotel_name}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Qty</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.qty} name="qty" onChange={handleChange} placeholder="Qty" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Bedtype</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.bedtype} name="bedtype" onChange={handleChange} placeholder="Bedtype" />
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
                                                            <label for="email-id-vertical">Is_AC</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.is_ac} name="is_ac" onChange={handleChange} placeholder="Is_ac" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">is_TV</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.is_tv} name="is_tv" onChange={handleChange} placeholder="is_TV" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Roomfare</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.roomfare} name="roomfare" onChange={handleChange} placeholder="Roomfare" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Number_Of_Guest	</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.number_of_guest} name="number_of_guest" onChange={handleChange} placeholder="Number_of_guest" />
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

export default RoomtypeAdd