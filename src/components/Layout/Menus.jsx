import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";

const Menus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logout successful");
      navigate("/");
    } catch (error) {
      toast.error(error || "Logout failed");
    }
  };
  return (
    <div className="sidebar d-flex flex-column justify-content-center">
      <ul>
        <h2>Admin Panel</h2>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/home"}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/all-users"}>
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/all-doctors"}>
            Doctors
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/all-appointments"}>
            Appointments
          </NavLink>
        </li>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Menus;
