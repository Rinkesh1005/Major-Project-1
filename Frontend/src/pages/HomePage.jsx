import { Link } from "react-router-dom";
import Header from "../components/Header";

const HomePage = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <Header
        showSearch={false}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="container mt-4">
        <div className="text-center mb-5">
          <h1>Welcome to MyShoppingSite</h1>
          <p>Your one-stop shop for all your needs.</p>
        </div>

        <div className="row g-4">
          <div className="col-md-3">
            <Link to="/products?category=Men" className="text-decoration-none">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Men</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link
              to="/products?category=Women"
              className="text-decoration-none"
            >
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Women</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/products?category=Kids" className="text-decoration-none">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Kids</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link
              to="/products?category=Electronics"
              className="text-decoration-none"
            >
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Electronics</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-5">
          <h3>New Arrivals</h3>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Summer Collection</h5>
                  <p>
                    Check out our latest collection to stay warm in style this
                    season.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">New Collection</h5>
                  <p>Stay updated with our latest products.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
