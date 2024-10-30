import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'

function Dashboard() {
    return (
        <AdminLayout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">
                        Dashboard
                    </h3>
                </div>
                <div className="row grid-margin">
                    <div className="col-12">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                                    <div className="statistics-item">
                                        <p>
                                            <i className="icon-sm fa fa-user mr-2"></i>
                                            New users
                                        </p>
                                        <h2>54000</h2>
                                        <label className="badge badge-outline-success badge-pill">2.7% increase</label>
                                    </div>
                                    <div className="statistics-item">
                                        <p>
                                            <i className="icon-sm fas fa-hourglass-half mr-2"></i>
                                            Avg Time
                                        </p>
                                        <h2>123.50</h2>
                                        <label className="badge badge-outline-danger badge-pill">30% decrease</label>
                                    </div>
                                    <div className="statistics-item">
                                        <p>
                                            <i className="icon-sm fas fa-cloud-download-alt mr-2"></i>
                                            Downloads
                                        </p>
                                        <h2>3500</h2>
                                        <label className="badge badge-outline-success badge-pill">12% increase</label>
                                    </div>
                                    <div className="statistics-item">
                                        <p>
                                            <i className="icon-sm fas fa-check-circle mr-2"></i>
                                            Update
                                        </p>
                                        <h2>7500</h2>
                                        <label className="badge badge-outline-success badge-pill">57% increase</label>
                                    </div>
                                    <div className="statistics-item">
                                        <p>
                                            <i className="icon-sm fas fa-chart-line mr-2"></i>
                                            Sales
                                        </p>
                                        <h2>9000</h2>
                                        <label className="badge badge-outline-success badge-pill">10% increase</label>
                                    </div>
                                    <div className="statistics-item">
                                        <p>
                                            <i className="icon-sm fas fa-circle-notch mr-2"></i>
                                            Pending
                                        </p>
                                        <h2>7500</h2>
                                        <label className="badge badge-outline-danger badge-pill">16% decrease</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    )
}

export default Dashboard