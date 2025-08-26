import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = ({ searchQuery, setSearchQuery, showSearch = true }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-4 mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          MyShoppingSite
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
            <Link to="/" className="btn btn-outline-secondary me-2">
              Home
            </Link>
            <Link to="/products" className="btn btn-outline-secondary me-2">
              Product
            </Link>
            <Link to="/wishlist" className="btn btn-outline-secondary me-2">
              Wishlist
            </Link>
            <Link to="/cart" className="btn btn-outline-secondary me-2">
              Cart
            </Link>
            <Link to="/profile" className="btn btn-outline-secondary">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
