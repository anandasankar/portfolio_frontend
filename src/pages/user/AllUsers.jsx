import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/actions/userAction";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  return (
    <Layout>
      <div className="container-fluid px-2 px-md-4 mt-4">
        {/* Page Title */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <h3 className="fw-bold mb-0">All Users</h3>

          <span className="badge bg-primary fs-6 align-self-start align-self-md-center">
            Total: {users?.length || 0}
          </span>
        </div>

        {/* Card */}
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-2 p-md-3">
            {/* Loading */}
            {loading && (
              <div className="text-center my-4">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2 small">Loading users...</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="alert alert-danger text-center small">
                {error}
              </div>
            )}

            {/* Table */}
            {!loading && !error && (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light small">
                    <tr>
                      <th style={{ width: "5%" }}>#</th>
                      <th style={{ width: "20%" }}>Name</th>
                      <th style={{ width: "35%" }}>Email</th>
                      <th style={{ width: "15%" }}>Phone</th>
                      <th style={{ width: "15%" }} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="small">
                    {users?.length > 0 ? (
                      users.map((user, i) => (
                        <tr key={user?._id}>
                          {/* Serial */}
                          <td>{i + 1}</td>

                          {/* Profile + Name + Admin Badge */}
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              {/* Profile Image */}
                              <img
                                src={
                                  user?.image
                                    ? user.image
                                    : "https://ui-avatars.com/api/?name=" +
                                      user?.name +
                                      "&background=0d6efd&color=fff"
                                }
                                alt="profile"
                                className="rounded-circle border"
                                width="38"
                                height="38"
                              />

                              {/* Name + Badge */}
                              <div className="d-flex flex-column">
                                {/* Name */}
                                <span
                                  className="fw-semibold text-truncate"
                                  style={{ maxWidth: "140px" }}
                                >
                                  {user?.name || "NA"}
                                </span>

                                {/* Admin Badge */}
                                {user?.isAdmin && (
                                  <span className="badge bg-warning text-dark mt-1 align-self-start">
                                    Admin
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td
                            className="text-muted text-truncate"
                            style={{ maxWidth: "220px" }}
                          >
                            {user?.email}
                          </td>

                          {/* Phone */}
                          <td>
                            <span className="badge bg-light text-dark border">
                              {user?.phone || "NA"}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="text-center">
                            <Link
                              to={`/user/details/${user?._id}`}
                              className="btn btn-sm btn-outline-primary rounded-pill px-2 px-md-3"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No users found
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

export default AllUsers;
