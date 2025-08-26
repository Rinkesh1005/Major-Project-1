import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { toast } from "react-toastify";

const ProductDetailPage = ({
  cart,
  setCart,
  wishlist,
  setWishlist,
  searchQuery,
  setSearchQuery,
}) => {
  const { id } = useParams();

  const {
    data: product,
    loading,
    error,
  } = useFetch(`https://major-project-1-backend-rho.vercel.app/products/${id}`);

  if (loading)
    return (
      <>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-4">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading product details...</p>
          </div>
        </div>
      </>
    );

  if (error)
    return (
      <>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-4">
          <div className="alert alert-danger text-center" role="alert">
            <h4>Error Loading Product</h4>
            <p>Error: {error}</p>
            <p>Please try refreshing the page or go back to products.</p>
          </div>
        </div>
      </>
    );

  if (!product) {
    return (
      <>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-4">
          <div className="alert alert-warning text-center" role="alert">
            <h2>Product not found.</h2>
            <p>The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </>
    );
  }

  const finalProduct = { ...product, id: product.id || product._id };

  const isInCart = cart.some((item) => item.id === finalProduct.id);
  const isInWishlist = wishlist.some((item) => item.id === finalProduct.id);

  const handleCart = () => {
    if (isInCart) {
      setCart(cart.filter((item) => item.id !== finalProduct.id));
      toast.error(`${product.name} removed from cart!`);
    } else {
      setCart([...cart, { ...finalProduct, quantity: 1 }]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== finalProduct.id));
      toast.error(`${product.name} removed from wishlist!`);
    } else {
      setWishlist([...wishlist, finalProduct]);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              className="img-fluid rounded shadow"
              alt={product.name}
              style={{ maxHeight: "500px", width: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">{product.name}</h2>
            <div className="mb-3">
              <h4 className="text-primary d-inline">
                ₹{product.price}{" "}
                {product.originalPrice && (
                  <del className="text-muted fs-6">
                    ₹{product.originalPrice}
                  </del>
                )}
              </h4>
            </div>
            {product.discount && (
              <p className="text-success fw-bold">{product.discount}</p>
            )}
            {product.rating && (
              <p className="mb-3">
                <span className="badge bg-warning text-dark">
                  ⭐ {product.rating} / 5
                </span>
              </p>
            )}
            <hr />
            {product.description && (
              <div className="mb-4">
                <h5>Product Description</h5>
                <p>{product.description}</p>
                <ul>
                  <li>High quality guaranteed</li>
                  <li>7 days easy return policy</li>
                  <li>Cash on delivery available</li>
                </ul>
              </div>
            )}
            {product.sizes && product.sizes.length > 0 && (
              <div className="d-flex align-items-center mb-3">
                <label className="me-2">Size:</label>
                <select className="form-select w-auto">
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="d-flex gap-2">
              <button
                className={`btn ${isInCart ? "btn-success" : "btn-primary"}`}
                onClick={handleCart}
              >
                {isInCart ? "Cart Added ✅" : "Add to Cart"}
              </button>
              <button
                className={`btn ${
                  isInWishlist ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={handleWishlist}
              >
                {isInWishlist ? "❤️ Wishlisted" : "🤍 Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
