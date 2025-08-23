import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
}) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedToCart(!addedToCart);
  };

  const handleWishlist = () => {
    onAddToWishlist(product);
  };

  return (
    <div className="card h-100">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: "250px", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">
          ₹{product.price}{" "}
          <del className="text-danger">₹{product.originalPrice}</del>
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <button className={`btn btn-primary ${addedToCart ? "btn-success" : "btn-primary"}`} onClick={handleAddToCart}>
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
