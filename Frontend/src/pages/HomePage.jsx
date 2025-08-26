import { Link } from "react-router-dom";
import Header from "../components/Header";

const HomePage = ({ searchQuery, setSearchQuery }) => {
  const categoryImages = {
    Men: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Women: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW58ZW58MHx8MHx8fDA%3D",
    Kids: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
    Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <>
      <Header
        showSearch={false}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="container mt-4 mb-5">
        <div className="text-center mb-5">
          <img
            src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1495&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero Banner"
            className="img-fluid rounded mb-4"
            style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
          />
          <h1>Welcome to MyShoppingSite</h1>
          <p>Your one-stop shop for all your needs.</p>
        </div>

        <div className="row g-4">
          {["Men", "Women", "Kids", "Electronics"].map((category) => (
            <div key={category} className="col-md-3">
              <Link to={`/products?category=${category}`} className="text-decoration-none">
                <div className="card text-center">
                  <img
                    src={categoryImages[category]}
                    alt={category}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{category}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h3>New Arrivals</h3>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card">
                <img
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3"
                  alt="Summer Collection"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
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
                <img
                  src="https://images.unsplash.com/photo-1565211604822-2641d0b081a6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="New Collection"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
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
