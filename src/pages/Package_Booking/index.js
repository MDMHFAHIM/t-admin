import React, { useEffect, useState } from 'react';
import axios from '../../components/axios';
import AdminLayout from '../../layouts/AdminLayout';
import { Link } from 'react-router-dom';

function Package_Booking() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/package_booking`).then(function (response) {
            setData(response.data.data);
        });
    }
    const deleteData = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/package_booking/${id}`).then(function (response) {
            getDatas();
        });
    }
    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>Package_Booking</h3>
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

                <div className="row" id="table-bordered">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">All Package_Booking</h4>
                                <Link to={'/package_booking/add'} className='btn btn-primary float-right' >Add New</Link>
                            </div>
                            <div className="card-content">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                            <tr>
                                                <th>Customer_Id</th>
                                                <th>Package_Id</th>
                                                <th>Number_Of_Guest_Adult</th>
                                                <th>Number_Of_Guest_Child</th>
                                                <th>Check_In_Date</th>
                                                <th>Check_Out_Date</th>
                                                <th>Total_Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data.map((d, key) =>
                                                <tr key={d.id}>
                                                    <td className="text-bold-500">{d.customer?.name}</td>
                                                    <td>{d.package?.name}</td>
                                                    <td>{d.number_of_guest_adult}</td>
                                                    <td>{d.number_of_guest_child}</td>
                                                    <td>{d.check_in_date}</td>
                                                    <td>{d.check_out_date}</td>
                                                    <td>{d.total_amount}</td>
                                                    <td>
                                                        <Link to={`/package_booking/edit/${d.id}`} className='btn btn-secondary' >Edit</Link>
                                                        <button type='button' onClick={() => deleteData(d.id)} className='btn btn-warning'>Delete</button>
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

export default Package_Booking