import React from 'react';
import Header from './include/header';
import Sidebar from './include/sidebar';
import Footer from './include/footer';
import './assets_admin/vendors/iconfonts/font-awesome/css/all.min.css';
import './assets_admin/vendors/css/vendor.bundle.base.css';
import './assets_admin/vendors/css/vendor.bundle.addons.css';

function AdminLayout({ children }) {
  return (
    <div className="container-scroller">
      {/*- partial:partials/_navbar.html -*/}
      <Header />
      {/*- partial -*/}
      <div className="container-fluid page-body-wrapper">
        {/*- partial:partials/_settings-panel.html -*/}
        {/*- partial -*/}
        {/*- partial:partials/_sidebar.html -*/}
        <Sidebar />
        {/*- partial -*/}
        <div className="main-panel">
          <main>{children}</main>
          {/*- content-wrapper ends -*/}
          {/*- partial:partials/_footer.html -*/}
          <Footer />
          {/*- partial -*/}
        </div>
        {/*- main-panel ends -*/}
      </div>
      {/*- page-body-wrapper ends -*/}
    </div>
  )
}

export default AdminLayout