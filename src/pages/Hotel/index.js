import React, { useEffect, useState } from 'react';
import axios from '../../components/axios';
import AdminLayout from '../../layouts/AdminLayout';
import { Link } from 'react-router-dom';

function Hotel() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = async (e) => {
        let res = await axios.get(`/hotel`)
        setData(res.data.data);

    }
    const deleteData = async (id) => {
        let res = await axios.delete(`/hotel/${id}`)
        getDatas();

    }
    return (
        <AdminLayout>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>Hotel</h3>
                        </div>
                        <div className="col-12 col-md-6 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
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
                                <h4 className="card-title">All Hotel</h4>
                                <Link to={'/hotel/add'} className='btn btn-primary float-right' >Add New</Link>
                            </div>
                            <div className="card-content">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                            <tr>
                                                <th>Zone</th>
                                                <th>Catagory</th>
                                                <th>Roomtype</th>
                                                <th>Image</th>
                                                <th>Hotel</th>
                                                <th>Rating</th>
                                                <th>Complementary Breakfast</th>
                                                <th>Latitude</th>
                                                <th>Longitude</th>
                                                <th>Hotel Details</th>
                                                <th>Facilities</th>
                                                <th>Check in</th>
                                                <th>Check out</th>
                                                <th>Fare</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data.map((d, key) =>
                                                <tr key={d.id}>
                                                    <td>{d.zone?.name}</td>
                                                    <td>{d.catagory?.name}</td>
                                                    <td>{d.roomtype?.bedtype}</td>
                                                    <td>
                                                        {
                                                            d?.image?.split(',').map((src, i) => (
                                                                <img src={`${process.env.REACT_APP_BACKEND_URL}/hotel/${src}`} alt="hotel" />
                                                            ))
                                                        }


                                                    </td>
                                                    <td>{d.hotel_name}</td>
                                                    <td>{d.rating}</td>
                                                    <td>{d.is_complementary_breakfast}</td>
                                                    <td>{d.latitude}</td>
                                                    <td>{d.longitude}</td>
                                                    <td>{d.hotel_details}</td>
                                                    <td>{d.facilities}</td>
                                                    <td>{d.checkin}</td>
                                                    <td>{d.checkout}</td>
                                                    <td>{d.roomtype?.roomfare}</td>

                                                    <td>
                                                        <Link to={`/hotel/edit/${d.id}`} className='btn btn-secondary' >Edit</Link>
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

export default Hotel