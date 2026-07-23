import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/navbar.css"

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg motorohub-navbar">
      <div className="container">

        <Link className="navbar-brand motorohub-logo" to="/">
          Motoro<span>Hub</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link motorohub-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link motorohub-link" to="/community">
                Community
              </Link>
            </li>

            {isAuthenticated ? (

              <li className="nav-item dropdown ms-lg-3">

                <button
                  className="dropdown-toggle profile-button d-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    width="40"
                    height="40"
                    className="rounded-circle me-2"
                    style={{ objectFit: "cover" }}
                  />

                  <span>
                    Ciao {user.firstName}
                  </span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li>
                    <Link className="dropdown-item" to="/profile">
                      👤 Profilo
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/garage">
                      🏍 Garage
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/favorites">
                      ❤️ Preferiti ({favorites.length})
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </li>

                </ul>

              </li>

            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link motorohub-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link motorohub-link" to="/register">
                    Registrati
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;