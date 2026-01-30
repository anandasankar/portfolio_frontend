import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/user/Login";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import AllUsers from "./pages/user/AllUsers";
import AllDoctors from "./pages/doctors/AllDoctors";
import DoctorDetails from "./pages/doctors/DoctorDetails";
import AppointmentDetails from "./pages/Appointments/AppointmentDetails";
import AllAppointments from "./pages/Appointments/AllAppointments";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/actions/authActions";
import UserDetails from "./pages/user/UserDetails";

function App() {
  const dispatch = useDispatch();
  const { hasCheckedAuth } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/" && !hasCheckedAuth) {
      dispatch(getUser());
    }
  }, [dispatch, hasCheckedAuth, location.pathname]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/user/details/:id" element={<UserDetails />} />
        <Route path="/all-doctors" element={<AllDoctors />} />
        <Route path="/doctor-details/:id" element={<DoctorDetails />} />
        <Route path="/all-appointments" element={<AllAppointments />} />
        <Route
          path="/appointment-details/:id"
          element={<AppointmentDetails />}
        />
      </Routes>
    </>
  );
}

export default App;
