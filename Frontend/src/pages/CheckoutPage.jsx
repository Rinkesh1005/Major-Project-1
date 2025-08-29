import { useState, useEffect } from "react";
// import Header from "../components/Header";
import AddressCard from "../components/AddressCard";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPage = ({ searchQuery, setSearchQuery, cart, setCart }) => {
  const location = useLocation();
  const { totalAmount = 0 } = location.state || {};

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("addresses");
    if (saved) return JSON.parse(saved);
    const defaultAddresses = [
      {
        id: 1,
        name: "Rahul Sharma",
        street: "123 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        zip: "400001",
        phone: "9876543210",
      },
      {
        id: 2,
        name: "Anita Verma",
        street: "45 Nehru Nagar",
        city: "Delhi",
        state: "Delhi",
        zip: "110001",
        phone: "9123456789",
      },
    ];
    localStorage.setItem("addresses", JSON.stringify(defaultAddresses));
    return defaultAddresses;
  });

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast.error("Please select an address before placing the order.");
      return;
    }
    setOrderPlaced(true);
    setCart([]);
    localStorage.removeItem("cart");
    toast.success("Order placed successfully!");
  };

  const handleSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handleRemove = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
    toast.info("Address removed successfully!");
  };

  const handleEdit = (address) => {
    setEditingAddress({ ...address });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (Object.values(editingAddress).some((val) => val === "")) {
      toast.error("Please fill all address fields!");
      return;
    }
    const updatedAddresses = addresses.map((addr) =>
      addr.id === editingAddress.id ? editingAddress : addr
    );
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    toast.success("Address updated successfully!");
    setIsEditModalOpen(false);
    setEditingAddress(null);
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  if (orderPlaced) {
    return (
      <>
        {/* <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
        <div className="container mt-4 mb-5 text-center">
          <div className="alert alert-success mt-5" role="alert">
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase.</p>
            <p>
              <strong>Delivered to:</strong> {selectedAddress?.street},{" "}
              {selectedAddress?.city}
            </p>
          </div>

          <div className="card mt-4 text-start">
            <div className="card-body">
              <h4>Order Details</h4>
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong> <br />
                      <small>Quantity: {item.quantity}</small>
                      {item.selectedSize && (
                        <small> | Size: {item.selectedSize}</small>
                      )}
                    </div>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <h5>Total Amount: ₹{totalAmount}</h5>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-5 mb-5 text-center">
          <div className="alert alert-warning" role="alert">
            <h4>No Orders Found</h4>
            <p>Your cart is empty. Please add items before checkout.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}  /> */}
      <div className="container mt-4 mb-5">
        <h2 className="mb-4">Checkout</h2>
        <div className="row mt-4">
          <div className="col-md-8">
            <h4>Select Delivery Address</h4>
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                isSelected={addr.id === selectedAddressId}
                onSelect={handleSelect}
                onRemove={handleRemove}
                onEdit={handleEdit}
              />
            ))}

            <div className="mb-4">
              <h4 className="mt-4 mb-3">Order Summary</h4>
              <ul className="list-group">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong> <br />
                      <small>Quantity: {item.quantity}</small>
                      {item.selectedSize && (
                        <small> | Size: {item.selectedSize}</small>
                      )}
                    </div>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-4 mt-5">
            <div className="card">
              <div className="card-body">
                <h5>Price Details</h5>
                <hr />
                <p>Total Amount: ₹{totalAmount}</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && editingAddress && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSaveEdit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Address</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsEditModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    value={editingAddress.name}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        name: e.target.value,
                      })
                    }
                    placeholder="Name"
                  />
                  <input
                    className="form-control mb-2"
                    value={editingAddress.street}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        street: e.target.value,
                      })
                    }
                    placeholder="Street"
                  />
                  <input
                    className="form-control mb-2"
                    value={editingAddress.city}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        city: e.target.value,
                      })
                    }
                    placeholder="City"
                  />
                  <input
                    className="form-control mb-2"
                    value={editingAddress.state}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        state: e.target.value,
                      })
                    }
                    placeholder="State"
                  />
                  <input
                    className="form-control mb-2"
                    value={editingAddress.zip}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        zip: e.target.value,
                      })
                    }
                    placeholder="Zip Code"
                  />
                  <input
                    className="form-control mb-2"
                    value={editingAddress.phone}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Phone"
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
