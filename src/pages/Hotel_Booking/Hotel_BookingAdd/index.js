import React, { useEffect, useState } from 'react';
import axios from '../../../components/axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Hotel_BookingAdd() {
    const [inputs, setInputs] = useState({
        id: '', customer_id: '', hotel_id: '', roomtype_id: '', number_of_room: '', number_of_guest_adult: '', number_of_guest_child: '', check_in_date: '', check_out_date: '', total_amount: '',
    });
    const [customer, setCustomer] = useState([]);
    const [hotel, setHotel] = useState([]);
    const [roomtype, setRoomtype] = useState([]);
    const [roomfare, setRoomfare] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const getDatas = async (e) => {
        let response = await axios.get(`/hotel_booking/${id}`);
        setInputs(response.data.data);
    }

    const getRelational = async (e) => {
        let zoneres = await axios.get(`/customer`)
        setCustomer(zoneres.data.data);
        let catagories = await axios.get(`/hotel`)
        setHotel(catagories.data.data);
    }

    const getRoomType = async (e) => {
        let roomtyperes = await axios.get(`/roomtype?hotel_id=${e.target.value}`)
        setRoomtype(roomtyperes.data.data);
    }

    const getRoomFare = async (e) => {
        let r = await axios.get(`/roomtype/${e.target.value}`)
        setRoomfare(r.data.data?.roomfare);
    }

    const calRoomFare = async (e) => {
        let number_of_room = document.getElementById('number_of_room').value
        let check_in_date = document.getElementById('check_in_date').value
        let check_out_date = document.getElementById('check_out_date').value
        var date1 = new Date(check_in_date);
        var date2 = new Date(check_out_date);
        var diff = new Date(date2.getTime() - date1.getTime());
        let numberofday = diff.getUTCDate() - 1;

        let totalfare = parseFloat(roomfare) * (parseFloat(number_of_room) * numberofday);
        setInputs(values => ({ ...values, ['total_amount']: totalfare }));
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
                apiurl = `/hotel_booking/edit/${inputs.id}`;
            } else {
                apiurl = `/hotel_booking/create`;
            }
            let res = await axios.post(apiurl, formData)
            console.log(res);
            navigate('/hotel_booking')
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
                            <h3>Add New Hotel_Booking</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Hotel_Booking</a></li>
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
                                                            <label for="email-id-vertical">Customer</label>
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
                                                            <label for="email-id-vertical">Hotel</label>
                                                            {hotel.length > 0 &&
                                                                <select className="form-control" id="hotel_id" name='hotel_id' defaultValue={inputs.hotel_id} onChange={e => { handleChange(e); getRoomType(e) }}>
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
                                                            <label for="email-id-vertical">Roomtype</label>
                                                            {roomtype.length > 0 &&
                                                                <select className="form-control" id="roomtype_id" name='roomtype_id' defaultValue={inputs.roomtype_id} onChange={e => { handleChange(e); getRoomFare(e) }}>
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
                                                            <label for="number_of_room">number_of_room</label>
                                                            <input type="text" id="number_of_room" className="form-control" defaultValue={inputs.number_of_room} name="number_of_room" onChange={e => { handleChange(e); calRoomFare(e) }} placeholder="number_of_room" />
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
                                                            <label for="check_in_date">Check_In_Date</label>
                                                            <input type="date" id="check_in_date" className="form-control" defaultValue={inputs.check_in_date} name="check_in_date" onChange={e => { handleChange(e); calRoomFare(e) }} placeholder="Check_In_Date" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label for="check_out_date">Check_Out_Date</label>
                                                            <input type="date" id="check_out_date" className="form-control" defaultValue={inputs.check_out_date} name="check_out_date" onChange={e => { handleChange(e); calRoomFare(e) }} placeholder="Check_Out_Date" />
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

export default Hotel_BookingAdd