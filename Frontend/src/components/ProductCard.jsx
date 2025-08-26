import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(""); // Added for size selection

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      toast.error("Please select a size before adding to cart!");
      return;
    }
    onAddToCart({ ...product, selectedSize });
    setAddedToCart(!addedToCart);
    if (!addedToCart) {
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.info(`${product.name} removed from cart!`);
    }
  };

  const handleWishlist = () => {
    onAddToWishlist({ ...product, selectedSize });
    if (!isWishlisted) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.error(`${product.name} removed from wishlist!`);
    }
  };

  return (
    <div className="card h-100 mb-4">
      <Link to={`/products/${product.id || product._id}`}>
        <div className="position-relative">
          <img
            src={product.image || "https://via.placeholder.com/250x250?text=No+Image"}
            className="card-img-top img-fluid"
            alt={product.name}
            style={{
              height: "250px",
              objectFit: "contain", 
              backgroundColor: "#f8f9fa", 
            }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/250x250?text=Image+Not+Found";
            }}
          />
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-success">
              ⭐ {product.rating || "N/A"}
            </span>
          </div>
        </div>
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted mb-2">
          ₹{product.price}{" "}
          {product.originalPrice && (
            <del className="text-danger">₹{product.originalPrice}</del>
          )}
        </p>
        {product.sizes && product.sizes.length > 0 && (
          <div className="d-flex align-items-center mb-3">
            <label className="me-2">Size:</label>
            <select
              className="form-select w-auto"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <button
            className={`btn ${addedToCart ? "btn-success" : "btn-primary"}`}
            onClick={handleAddToCart}
          >
            {addedToCart ? "Cart Added ✅" : "Add to Cart"}
          </button>
          <button
            className={`btn ${
              isWishlisted ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={handleWishlist}
          >
            {isWishlisted ? "❤️ Wishlisted" : "🤍 Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;