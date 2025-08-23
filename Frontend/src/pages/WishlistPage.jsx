import Header from "../components/Header";

const WishlistPage = ({
  wishlist,
  setWishlist,
  cart,
  setCart,
  searchQuery,
  setSearchQuery,
}) => {
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
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
  };

  const filteredWishlist = wishlist.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mt-4">
        <h2>My Wishlist ({filteredWishlist.length} items)</h2>
        <div className="row mt-4">
          {filteredWishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            filteredWishlist.map((item) => (
              <div key={item._id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">₹{item.price}</p>
                    <button
                      className="btn btn-primary btn-sm me-2"
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
