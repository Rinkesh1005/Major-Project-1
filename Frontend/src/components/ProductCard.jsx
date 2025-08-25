import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { toast } from 'react-toastify';

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
    if (!addedToCart) {
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.info(`${product.name} removed from cart!`);
    }
  };

  const handleWishlist = () => {
    onAddToWishlist(product);
    if (!isWishlisted) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.error(`${product.name} removed from wishlist!`);
    }
  };

  return (
    <div className="card h-100 mb-4">
      <Link to={`/products/${product._id}`}>
        <div className="position-relative">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            style={{ height: "250px", objectFit: "cover" }}
          />
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-success">
              ⭐ {product.rating}
            </span>
          </div>
        </div>
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted mb-auto">
          ₹{product.price}{" "}
          <del className="text-danger">₹{product.originalPrice}</del>
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
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