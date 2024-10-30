import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Package_BookingAdd() {
    const [inputs, setInputs] = useState({ id: '', customer_id: '', package_id: '', number_of_guest_adult: '', number_of_guest_child: '', check_in_date: '', check_out_date: '', total_amount: '', });

    const [customer, setCustomer] = useState([]);
    const [packge, setPackge] = useState([]);


    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/package_booking/${id}`);
        setInputs(response.data.data);
    }
    const getRelational = async (e) => {
        let customerres = await axios.get(`/customer`)
        setCustomer(customerres.data.data);
        let packageres = await axios.get(`/package`)
        setPackge(packageres.data.data);
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
                apiurl = `/package_booking/edit/${inputs.id}`;
            } else {
                apiurl = `/package_booking/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/package_booking')
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
                            <h3>Add New Package_Booking</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Package_Booking</a></li>
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
                                                            <label for="first-name-vertical">Customer_Id</label>
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
                                                            <label for="email-id-vertical">Package_Id</label>
                                                            {packge.length > 0 &&
                                                                <select className="form-control" id="package_id" name='package_id' defaultValue={inputs.package_id} onChange={handleChange}>
                                                                    <option value="">Select Package</option>
                                                                    {packge.map((d, key) =>
                                                                        <option value={d.id}>{d.name}</option>
                                                                    )}
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Number_Of_Guest_Adult</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.number_of_guest_adult} name="number_of_guest_adult" onChange={handleChange} placeholder="Number_Of_Guest_Adult" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Number_Of_Guest_Child</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.number_of_guest_child} name="number_of_guest_child" onChange={handleChange} placeholder="Number_Of_Guest_Child" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Check_In_Date</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.check_in_date} name="check_in_date" onChange={handleChange} placeholder="Check_In_Date" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Check_Out_Date</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.check_out_date} name="check_out_date" onChange={handleChange} placeholder="Check_Out_Date" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="email-id-vertical">Total_Amount</label>
                                                            <input type="text" id="email-id-vertical" className="form-control" defaultValue={inputs.total_amount} name="total_amount" onChange={handleChange} placeholder="Total_Amount" />
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

export default Package_BookingAdd