import Header from "../components/Header";
import { toast } from "react-toastify";

const WishlistPage = ({
  wishlist,
  setWishlist,
  cart,
  setCart,
  searchQuery,
  // setSearchQuery,
}) => {
  const removeFromWishlist = (productId) => {
    const item = wishlist.find((item) => item.id === productId);
    setWishlist(wishlist.filter((item) => item.id !== productId));
    toast.error(`${item.name} removed from wishlist!`);
  };

  const moveToCart = (productToAdd) => {
    const existingCartItem = cart.find((item) => item.id === productToAdd.id);
    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }
    removeFromWishlist(productToAdd.id);
    toast.success(`${productToAdd.name} moved to cart!`);
  };

  const filteredWishlist = wishlist.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cart={cart}
        wishlist={wishlist}
      /> */}
      <div className="container mt-4 mb-5">
        <h2 className="mb-4">My Wishlist ({filteredWishlist.length} items)</h2>
        <div className="row mt-4">
          {filteredWishlist.length === 0 ? (
            <div className="col-12">
              <p className="lead">Your wishlist is empty.</p>
            </div>
          ) : (
            filteredWishlist.map((item) => (
              <div key={item._id || item.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      height: "250px",
                      objectFit: "contain",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-primary fw-bold">
                      ₹{item.price}
                    </p>
                    {item.rating && (
                      <p className="card-text">
                        <small className="text-muted">⭐ {item.rating}</small>
                      </p>
                    )}
                    {item.selectedSize && (
                      <p className="card-text">
                        <small>Size: {item.selectedSize}</small>
                      </p>
                    )}
                    <div className="mt-auto d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => moveToCart(item)}
                      >
                        Move to Cart
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
