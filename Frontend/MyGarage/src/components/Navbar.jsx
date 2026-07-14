import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🏍 MyGarage
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link className="nav-link" to="/garage">
                Garage
              </Link>

              <Link className="nav-link" to="/profile">
                Profilo
              </Link>

              <span className="nav-link text-light">
                Ciao {user.firstName}
              </span>

              <button
                className="btn btn-outline-light ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Registrati
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;