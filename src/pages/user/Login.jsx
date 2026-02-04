import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { reset } from "../../redux/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getUser } from "../../redux/actions/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth,
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful");
      dispatch(getUser());
      dispatch(reset());
      navigate("/home");
    }

    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      {/* Small Card */}
      <div
        className="card shadow-sm border-0"
        style={{ width: "360px", borderRadius: "12px" }}
      >
        <div className="card-body p-4">
          {/* Title */}
          <h4 className="text-center fw-bold mb-1">Admin Login</h4>
          <p className="text-center text-muted small mb-4">
            Please login to continue
          </p>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label small fw-semibold">Password</label>

              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control pe-5"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />

                {/* Eye Icon */}
                {password && (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#6c757d",
                      fontSize: "18px",
                      userSelect: "none",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
