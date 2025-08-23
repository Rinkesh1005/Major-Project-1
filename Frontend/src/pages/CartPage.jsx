import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const CartPage = ({
  cart,
  setCart,
  wishlist,
  setWishlist,
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();

  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const moveToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
    removeFromCart(product.id);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const filteredCart = cart.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mt-4">
        <h2>My Cart ({filteredCart.length} items)</h2>
        <div className="row mt-4">
          <div className="col-lg-8">
            {filteredCart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              filteredCart.map((item) => (
                <div key={item.id} className="card mb-3 shadow-sm">
                  <div className="card-body d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100px", marginRight: "20px" }}
                    />
                    <div className="flex-grow-1">
                      <h5>{item.name}</h5>
                      <p className="text-primary fw-bold">₹{item.price}</p>
                      <div className="d-flex align-items-center mb-2">
                        <label className="me-2">Quantity:</label>
                        <button
                          className="btn btn-sm btn-outline-secondary me-1"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary ms-1"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <div className="d-flex gap-2 mt-2">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove from Cart
                        </button>
                        <button
                          className="btn btn-warning btn-sm text-white"
                          onClick={() => moveToWishlist(item)}
                        >
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {filteredCart.length > 0 && (
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>PRICE DETAILS</h5>
                  <hr />
                  <p>
                    Price ({filteredCart.length} item): ₹{getTotal()}
                  </p>
                  <p className="text-success">Discount: -₹500</p>
                  <p>Delivery Charges: ₹499</p>
                  <hr />
                  <h5>TOTAL AMOUNT: ₹{getTotal() - 500 + 499}</h5>
                  <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          cart: filteredCart,
                          totalAmount: getTotal() - 500 + 499,
                        },
                      })
                    }
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
