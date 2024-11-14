import React, { useEffect, useState } from 'react';
import axios from '../../components/axios';
import AdminLayout from '../../layouts/AdminLayout';
import { Link } from 'react-router-dom';

function Flight() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        axios.get(`${process.env.REACT_APP_API_URL}/flight`).then(function (response) {
            setData(response.data.data);
        });
    }
    const deleteData = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/flight/${id}`).then(function (response) {
            getDatas();
        });
    }
    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>Flight</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Flight</a></li>
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
                                <h4 className="card-title">All Flight</h4>
                                <Link to={'/flight/add'} className='btn btn-primary float-right' >Add New</Link>
                            </div>
                            <div className="card-content">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                            <tr>
                                                <th>Airline</th>
                                                <th>Image</th>
                                                <th>Class</th>
                                                <th>Trip Type</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Departure Time</th>
                                                <th>Arrival Time</th>
                                                <th>Transit Time</th>
                                                <th>Complementary  Food</th>
                                                <th>Baggage Allowance</th>
                                                <th>Fare</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data.map((d, key) =>
                                                <tr key={d.id}>
                                                    <td>{d.airline?.name}</td>
                                                    <td>
                                                        {
                                                            d.image.split(',').map((src, i) => (
                                                                <img src={`${process.env.REACT_APP_BACKEND_URL}/flight/${src}`} alt="flight" />
                                                            ))
                                                        }


                                                    </td>
                                                    <td>{d.flightprice?.class}</td>
                                                    <td>{d.flightprice?.trip_type}</td>
                                                    <td>{d.zone?.name}</td>
                                                    <td>{d.zone?.name}</td>
                                                    <td>{d.departure_time}</td>
                                                    <td>{d.arrival_time}</td>
                                                    <td>{d.transit_time}</td>
                                                    <td>{d.is_complementary_food}</td>
                                                    <td>{d.baggage_allowance}</td>
                                                    <td>{d.flightprice?.fare}</td>

                                                    <td>
                                                        <Link to={`/flight/edit/${d.id}`} className='btn btn-secondary' >Edit</Link>
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

export default Flight