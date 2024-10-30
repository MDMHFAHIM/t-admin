import React, { useEffect, useState } from 'react';
import axios from '../../components/axios';
import AdminLayout from '../../layouts/AdminLayout';
import { Link } from 'react-router-dom';
import { useCart } from "react-use-cart";

function AllProducts() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addItem } = useCart();

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/addproduct/`);
            setData(response.data.data);
        } catch (err) {
            setError("Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    };

  

    return (
        <AdminLayout>
            <div className="product-view">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                {data.length > 0 ? (
                                    data.map((d) => (
                                        <div className="col-md-4" key={d.id}>
                                            <div className="product-item">
                                                <div className="product-title">
                                                    <a href="#">{d.productname}</a>
                                                    <div className="ratting">
                                                        {[...Array(5)].map((_, index) => (
                                                            <i key={index} className="fa fa-star"></i>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="product-image">
                                                    <a href="product-detail.html">
                                                        {d.photo.split(',').map((src, i) => (
                                                            <img
                                                                key={i}
                                                                src={`${process.env.REACT_APP_BACKEND_URL}/addproduct/${src}`}
                                                                alt="Product"
                                                                width="100%"
                                                                style={{ display: i === 0 ? 'block' : 'none' }}
                                                            />
                                                        ))}
                                                    </a>
                                                    <div className="product-action">
                                                        <button type='button' className="btn btn-link" onClick={() => { addItem(d) }}><i className="fa fa-cart-plus"></i></button>
                                                        <button type='button' className="btn btn-link"><i className="fa fa-heart"></i></button>
                                                        <button type='button' className="btn btn-link"><i className="fa fa-search"></i></button>
                                                        {/* <button onClick={() => deleteData(d.id)}><i className="fa fa-trash"></i></button> */}
                                                    </div>
                                                </div>
                                                <div className="product-price">
                                                    <h3><span>৳</span>{d.price || 99}</h3>
                                                    <a className="btn" href="#"><i className="fa fa-shopping-cart"></i> Buy Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No products available</div>
                                )}
                            </div>
                            {/* Pagination and other components here */}
                            <div className="col-md-12">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" tabindex="-1">Previous</a>
                                        </li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {/* Sidebar and other layout elements */}
                        <div className="col-lg-4 sidebar">
                            <div className="sidebar-widget category">
                                <h2 className="title">Category</h2>
                                <nav className="navbar bg-light">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="fa fa-female"></i>Fashion & Beauty</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="fa fa-child"></i>Kids & Babies Clothes</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="fa fa-tshirt"></i>Men & Women Clothes</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="fa fa-mobile-alt"></i>Gadgets & Accessories</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="fa fa-microchip"></i>Electronics & Accessories</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>


                            <div className="sidebar-widget brands">
                                <h2 className="title">Our Brands</h2>
                                <ul>
                                    <li><a href="#">Nulla </a><span>(45)</span></li>
                                    <li><a href="#">Curabitur </a><span>(34)</span></li>
                                    <li><a href="#">Nunc </a><span>(67)</span></li>
                                    <li><a href="#">Ullamcorper</a><span>(74)</span></li>
                                    <li><a href="#">Fusce </a><span>(89)</span></li>
                                    <li><a href="#">Sagittis</a><span>(28)</span></li>
                                </ul>
                            </div>

                            <div className="sidebar-widget tag">
                                <h2 className="title">Tags Cloud</h2>
                                <a href="#">Lorem ipsum</a>
                                <a href="#">Vivamus</a>
                                <a href="#">Phasellus</a>
                                <a href="#">pulvinar</a>
                                <a href="#">Curabitur</a>
                                <a href="#">Fusce</a>
                                <a href="#">Sem quis</a>
                                <a href="#">Mollis metus</a>
                                <a href="#">Sit amet</a>
                                <a href="#">Vel posuere</a>
                                <a href="#">orci luctus</a>
                                <a href="#">Nam lorem</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AllProducts;
