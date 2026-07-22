import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🏍 MotoroHub
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/community">
            Community
          </Link>
          {isAuthenticated ? (
            <>

              <div className="dropdown ms-3">

                <button
                  className="btn btn-dark dropdown-toggle d-flex align-items-center border-0"
                  data-bs-toggle="dropdown"
                >

                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    width="38"
                    height="38"
                    className="rounded-circle me-2"
                    style={{ objectFit: "cover" }}
                  />

                  <span>
                    Ciao {user.firstName}
                  </span>

                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/profile"
                    >
                      👤 Profilo
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/garage"
                    >
                      🏍 Garage
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/favorites"
                    >
                      ❤️ Preferiti
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

              </div>
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