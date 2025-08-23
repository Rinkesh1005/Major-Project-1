import { useState } from "react";
import Header from "../components/Header";
import AddressCard from "../components/AddressCard";

const initialAddresses = [
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

const CheckoutPage = ({ searchQuery, setSearchQuery, cart, totalAmount }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addresses, setAddresses] = useState(initialAddresses);

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      alert("Please select an address before placing the order.");
      return;
    }
    setOrderPlaced(true);
  };

  const handleSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handleRemove = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  const handleEdit = (id) => {
  const newCity = prompt("Enter new city:");
  if (!newCity) return;

  const updated = addresses.map((addr) =>
    addr.id === id ? { ...addr, city: newCity } : addr
  );
  setAddresses(updated);
};

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  if (orderPlaced) {
    return (
      <>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-4 text-center">
          <div className="alert alert-success mt-5" role="alert">
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase.</p>
            <p>
              <strong>Delivered to:</strong> {selectedAddress?.street},{" "}
              {selectedAddress?.city}
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-5 text-center">
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
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mt-4">
        <h2>Checkout</h2>
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

            <h4 className="mt-4">Order Summary</h4>
            <ul className="list-group">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.name}</strong> <br />
                    <small>Quantity: {item.quantity}</small>
                  </div>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4 mt-4">
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
    </>
  );
};

export default CheckoutPage;
