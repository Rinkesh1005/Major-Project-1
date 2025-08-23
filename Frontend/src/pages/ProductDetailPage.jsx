import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";

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
  } = useFetch(`http://localhost:3000/products/${id}`);

  if (loading) return <p className="container py-2">Loading products...</p>;
  if (error) return <p className="container py-2">Error loading products: {error}</p>;

  if (!product) {
    return (
      <>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-4">
          <h2 className="text-center">Product not found.</h2>
        </div>
      </>
    );
  }

  // Ensure 'id' property present (if only _id comes from API)
  const finalProduct = { ...product, id: product.id || product._id };

  const isInCart = cart.some((item) => item.id === finalProduct.id);
  const isInWishlist = wishlist.some((item) => item.id === finalProduct.id);

  const handleCart = () => {
    if (isInCart) {
      setCart(cart.filter((item) => item.id !== finalProduct.id));
    } else {
      setCart([...cart, { ...finalProduct, quantity: 1 }]);
    }
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== finalProduct.id));
    } else {
      setWishlist([...wishlist, finalProduct]);
    }
  };

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} className="img-fluid" alt={product.name} />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <h4>
              ₹{product.price}{" "}
              <del className="text-muted">₹{product.originalPrice}</del>
            </h4>
            <p className="text-success">{product.discount}</p>
            <p>Rating: {product.rating} / 5</p>
            <hr />
            <p>{product.description}</p>
            <div className="d-flex align-items-center mb-3">
              <label className="me-2">Size:</label>
              <select className="form-select w-auto">
                {product.sizes?.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex gap-2">
              <button
                className={`btn ${isInCart ? "btn-success" : "btn-primary"}`}
                onClick={handleCart}
              >
                {isInCart ? "Cart Added ✅" : "Add to Cart"}
              </button>
              <button
                className={`btn ${isInWishlist ? "btn-danger" : "btn-outline-danger"}`}
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
