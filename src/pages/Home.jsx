import React from "react";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="container py-4">
        {/* Welcome Card */}
        <div className="card border-0 shadow-sm mb-4 bg-primary text-white rounded-4">
          <div className="card-body d-flex flex-column flex-md-row align-items-center gap-3">
            {/* Avatar */}
            <div
              className="rounded-circle bg-light text-primary d-flex align-items-center justify-content-center fw-bold"
              style={{ width: "55px", height: "55px" }}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* Text */}
            <div className="text-center text-md-start">
              <h5 className="mb-1">Welcome back, {user?.name || "User"} 👋</h5>

              <small className="opacity-75">
                Manage your hospital system easily
              </small>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row g-3">
          {/* Users */}
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center rounded-4">
              <div className="card-body">
                <h6 className="text-muted">Total Users</h6>

                <h3 className="fw-bold mt-2">--</h3>

                <small className="text-muted">Coming soon</small>
              </div>
            </div>
          </div>

          {/* Doctors */}
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center rounded-4">
              <div className="card-body">
                <h6 className="text-muted">Total Doctors</h6>

                <h3 className="fw-bold mt-2">--</h3>

                <small className="text-muted">Coming soon</small>
              </div>
            </div>
          </div>

          {/* Appointments */}
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center rounded-4">
              <div className="card-body">
                <h6 className="text-muted">Appointments</h6>

                <h3 className="fw-bold mt-2">--</h3>

                <small className="text-muted">Coming soon</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
