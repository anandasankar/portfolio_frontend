import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserById } from "../../redux/actions/userAction";
import {
  getUserAppointments,
  updateAppointmentStatus,
} from "../../redux/actions/appointmentAction";
import toast from "react-hot-toast";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);

  const {
    appointments,
    loading: appointmentLoading,
    updating,
    error: appointmentError,
  } = useSelector((state) => state.appointment);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
      dispatch(getUserAppointments(id));
    }
  }, [dispatch, id]);

  const handleStatusChange = async (appointmentId, status) => {
    if (!appointmentId || !status) return;

    const res = await dispatch(
      updateAppointmentStatus({
        appointmentId,
        status,
      }),
    );
    if (res?.meta?.requestStatus === "fulfilled") {
      toast.success(`Appointment ${status} successfully`);
      dispatch(getUserAppointments(id));
    } else {
      toast.error("Failed to update appointment");
    }
  };

  return (
    <Layout>
      <div className="container-fluid px-2 px-md-4 mt-4">
        {/* Header */}
        <h3 className="fw-bold mb-4">👤 User Profile</h3>

        {/* ================= USER PROFILE ================= */}

        {userLoading && <p className="text-center">Loading user...</p>}

        {userError && <p className="text-danger text-center">{userError}</p>}

        {!userLoading && !userError && !user && (
          <p className="text-muted text-center">User not found</p>
        )}

        {!userLoading && user && (
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                {/* Image */}
                <div className="col-12 col-md-3 text-center mb-3 mb-md-0">
                  <img
                    src={
                      user?.image ||
                      `https://ui-avatars.com/api/?name=${user?.name}`
                    }
                    alt="profile"
                    className="rounded-circle border"
                    width="120"
                    height="120"
                  />
                </div>

                {/* Info */}
                <div className="col-12 col-md-9">
                  <h4 className="fw-bold mb-1">
                    {user?.name}

                    {user?.isAdmin && (
                      <span className="badge bg-warning text-dark ms-2">
                        Admin
                      </span>
                    )}
                  </h4>

                  <p className="text-muted mb-2">{user?.email}</p>

                  <div className="row small">
                    <div className="col-12 col-md-6 mb-2">
                      <b>Phone:</b> {user?.phone || "NA"}
                    </div>

                    <div className="col-12 col-md-6 mb-2">
                      <b>Gender:</b> {user?.gender || "NA"}
                    </div>

                    <div className="col-12 col-md-6 mb-2">
                      <b>DOB:</b> {user?.dob ? user.dob.slice(0, 10) : "NA"}
                    </div>

                    <div className="col-12 col-md-6 mb-2">
                      <b>Address:</b> {user?.address || "NA"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= APPOINTMENTS ================= */}

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">📅 Appointments</h5>

              <span className="badge bg-primary">
                Total: {appointments?.length || 0}
              </span>
            </div>

            {/* Errors */}
            {appointmentError && (
              <p className="text-danger text-center">{appointmentError}</p>
            )}

            {/* Loading */}
            {appointmentLoading ? (
              <p className="text-center">Loading appointments...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light small">
                    <tr>
                      <th>#</th>
                      <th>Date & Time</th>
                      <th>Doctor ID</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="small">
                    {appointments?.length > 0 ? (
                      appointments.map((item, index) => (
                        <tr key={item?._id}>
                          <td>{index + 1}</td>

                          <td>{new Date(item?.slotTime).toLocaleString()}</td>

                          <td
                            className="text-truncate"
                            style={{ maxWidth: "160px" }}
                          >
                            {item?.doctorId}
                          </td>

                          <td>₹ {item?.amount}</td>

                          {/* Status */}
                          <td>
                            {item?.status === "pending" && (
                              <span className="badge bg-warning text-dark">
                                Pending
                              </span>
                            )}

                            {item?.status === "confirmed" && (
                              <span className="badge bg-success">
                                Confirmed
                              </span>
                            )}

                            {item?.status === "cancelled" && (
                              <span className="badge bg-danger">Cancelled</span>
                            )}
                          </td>
                          {/* Payment */}
                          <td>
                            {item?.isPaid ? (
                              <span className="badge bg-success">Paid</span>
                            ) : (
                              <span className="badge bg-secondary">Cash</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="text-center">
                            {item?.status === "pending" ? (
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-outline-success"
                                  disabled={updating}
                                  onClick={() =>
                                    handleStatusChange(item?._id, "confirmed")
                                  }
                                >
                                  ✔
                                </button>

                                <button
                                  className="btn btn-outline-danger"
                                  disabled={updating}
                                  onClick={() =>
                                    handleStatusChange(item?._id, "cancelled")
                                  }
                                >
                                  ✖
                                </button>
                              </div>
                            ) : (
                              <span className="text-muted">No Action</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                          No appointments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetails;
