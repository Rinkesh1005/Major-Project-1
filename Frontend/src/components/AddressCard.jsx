const AddressCard = ({ address, onSelect, onRemove, onEdit, isSelected }) => {
  return (
    <div className={`card mb-3 ${isSelected ? "border-primary" : ""}`}>
      <div className="card-body">
        <h5 className="card-title">{address.name}</h5>
        <p className="card-text mb-1">
          {address.street}, {address.city}
        </p>
        <p className="card-text mb-1">
          {address.state} - {address.zip}
        </p>
        <p className="card-text mb-1">Phone: {address.phone}</p>
        <div className="mt-3">
          <button
            className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-outline-primary"} me-2`}
            onClick={() => onSelect(address.id)}
          >
            {isSelected ? "Selected" : "Select"}
          </button>
          <button
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => onEdit(address)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onRemove(address.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;