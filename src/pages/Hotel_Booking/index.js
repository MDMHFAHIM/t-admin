import React, { useEffect, useState } from 'react';
import axios from '../../components/axios';
import AdminLayout from '../../layouts/AdminLayout';
import { Link } from 'react-router-dom';

function Hotel_Booking() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = async (e) => {
        let res = await axios.get(`/hotel_booking`)
        setData(res.data.data);

    }
    const deleteData = async (id) => {
        let res = await axios.delete(`/hotel_booking/${id}`)
        getDatas();

    }
    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>Hotel Booking</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Hotel Booking</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">List</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="row" id="table-bordered">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">All Hotel Booking</h4>
                                <Link to={'/hotel_booking/add'} className='btn btn-primary float-right' >Add New</Link>
                            </div>
                            <div className="card-content">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                            <tr>
                                                <th>Customer</th>
                                                <th>Hotel</th>
                                                <th>Roomtype</th>
                                                <th>Number Of Room</th>
                                                <th>Number Of Guest Adult</th>
                                                <th>Number Of Guest Child</th>
                                                <th>Check In Date</th>
                                                <th>Check Out Date</th>
                                                <th>Total Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data.map((d, key) =>
                                                <tr key={d.id}>
                                                    <td>{d.customer?.name}</td>
                                                    <td>{d.hotel?.hotel_name}</td>
                                                    <td>{d.roomtype?.bedtype}</td>
                                                    <td>{d.number_of_room}</td>
                                                    <td>{d.number_of_guest_adult}</td>
                                                    <td>{d.number_of_guest_child}</td>
                                                    <td>{d.check_in_date}</td>
                                                    <td>{d.check_out_date}</td>
                                                    <td>{d.total_amount}</td>

                                                    <td>
                                                        <Link to={`/hotel_booking/edit/${d.id}`} className='btn btn-secondary' >Edit</Link>
                                                        <button type='button' onClick={() => deleteData(d.id)} className='btn btn-warning'>Delete</button>
                                                        <button type='button' className='btn btn-primary'>Invoice</button>

                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    )
}

export default Hotel_Booking