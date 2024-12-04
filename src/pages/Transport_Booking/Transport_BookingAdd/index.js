import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Transport_BookingAdd() {
    const [inputs, setInputs] = useState({ id: '', customer_id: '', transport_id: '', person: '', number_of_guest_adult: '', number_of_guest_child: '', check_in_date: '', check_out_date: '', fare: '', total: '', });

    const [customer, setCustomer] = useState([]);
    const [transport, setTransport] = useState([]);


    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/transport_booking/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
        let customerres = await axios.get(`/customer`)
        setCustomer(customerres.data.data);
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
                apiurl = `/transport_booking/edit/${inputs.id}`;
            } else {
                apiurl = `/transport_booking/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/transport_booking')
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
                            <h3>Add New Transport Booking</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Transport Booking</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">List</li>
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
                                                            <label for="email-id-vertical"> Person</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.Person} name="Person" onChange={handleChange} placeholder="Person" />
                                                        </div>
                                                    </div>


                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Check_In_Date</label>
                                                            <input type="date" id="email-id-vertical" className="form-control" defaultValue={inputs.check_in_date} name="check_in_date" onChange={handleChange} placeholder="Check_In_Date" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Check_Out_Date</label>
                                                            <input type="date" id="email-id-vertical" className="form-control" defaultValue={inputs.check_out_date} name="check_out_date" onChange={handleChange} placeholder="Check_Out_Date" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Fare</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.fare} name="fare" onChange={handleChange} placeholder="Fare" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Total</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.total} name="total" onChange={handleChange} placeholder="Total" />
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

export default Transport_BookingAdd