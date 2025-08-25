import { useState } from "react";
import Header from "../components/Header";
import AddressCard from "../components/AddressCard";
import { toast } from "react-toastify";

const UserProfilePage = ({ searchQuery, setSearchQuery }) => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editAddressId, setEditAddressId] = useState(null);

  const handleAddOrUpdateAddress = (e) => {
    e.preventDefault();
    if (Object.values(newAddress).some((val) => val === "")) {
      toast.error("Please fill all address fields!");
      return;
    }

    if (editAddressId) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editAddressId
            ? { ...newAddress, id: editAddressId }
            : addr
        )
      );
      setEditAddressId(null);
      toast.success("Address updated!");
    } else {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
      toast.success("Address added!");
    }

    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
  };

  const handleRemoveAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const handleEditAddress = (address) => {
    setNewAddress({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      phone: address.phone,
    });
    setEditAddressId(address.id);
  };

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mt-4">
        <h2>My Profile</h2>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card p-4">
              <h4>User Details</h4>
              <p>
                <strong>Name:</strong> John Doe
              </p>
              <p>
                <strong>Email:</strong> john.doe@example.com
              </p>
              <p>
                <strong>Phone:</strong> 9876543210
              </p>
            </div>
          </div>
        </div>

        <h4 className="mt-5">Manage Addresses</h4>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card p-4">
              <h5>{editAddressId ? "Edit Address" : "Add New Address"}</h5>
              <form onSubmit={handleAddOrUpdateAddress}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Full Name"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Zip Code"
                  value={newAddress.zip}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zip: e.target.value })
                  }
                />
                <input
                  type="tel"
                  className="form-control mb-2"
                  placeholder="Phone"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                />
                <button type="submit" className="btn btn-primary w-100">
                  {editAddressId ? "Update Address" : "Add Address"}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 py-4">
            <h5>Your Addresses</h5>
            {addresses.length === 0 ? (
              <p>No addresses added yet.</p>
            ) : (
              addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onSelect={handleSelectAddress}
                  onRemove={handleRemoveAddress}
                  onEdit={() => handleEditAddress(address)}
                  isSelected={address.id === selectedAddressId}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
