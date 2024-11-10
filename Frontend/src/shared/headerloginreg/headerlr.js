import "./headerlr.css";
import image from "../../assests/icons/computer-icons-bidding-auction-business-service-bid.jpg";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, removeAuthToken } from "../../core/services/auth";

export const Headerlr = () => {
  const { token, user } = getAuthToken();
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 h-10">
        <a className="navbar-brands">
          <img src={image} alt="error" style={{ width: 30, height: 30, marginRight: 10 }} />
          AMS MONSH
        </a>
        <ul className="navbar-nav mr-auto">
          {user && user.role === "Admin" && (
            <li className="nav-items">
              <Link to={"/admin-home"} className="nav-link">
                Home
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          {!token && (
            <>
              <li className="nav-items">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-items">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
          {token && (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                removeAuthToken();
                navigate("/login");
              }}
              className="nav-items"
            >
              <a className="nav-link">Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};
