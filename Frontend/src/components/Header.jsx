import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = ({ searchQuery, setSearchQuery, showSearch = true, cart = [], wishlist = [] }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-4 mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">MyShoppingSite</Link>

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

        <div className="collapse navbar-collapse" id="navbarContent">
          {showSearch && (
            <div className="d-flex mx-auto my-2 my-lg-0 w-100 w-lg-50">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          <div className="d-flex align-items-center ms-auto mt-2 mt-lg-0">

            <Link to="/" className="btn btn-outline-secondary position-relative me-2">
              <i className="bi bi-house me-1"></i>
              <span className="d-none d-lg-inline">Home</span>
            </Link>

            <Link to="/products" className="btn btn-outline-secondary position-relative me-2">
              <i className="bi bi-shop me-1"></i>
              <span className="d-none d-lg-inline">Products</span>
            </Link>

            <Link to="/wishlist" className="btn btn-outline-secondary position-relative me-2">
              <i className="bi bi-heart me-1"></i>
              <span className="d-none d-lg-inline">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="btn btn-outline-secondary position-relative me-2">
              <i className="bi bi-cart me-1"></i>
              <span className="d-none d-lg-inline">Cart</span>
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to="/profile" className="btn btn-outline-secondary">
              <i className="bi bi-person me-1"></i>
              <span className="d-none d-lg-inline">Profile</span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
