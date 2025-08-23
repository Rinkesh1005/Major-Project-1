const Filter = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: e.target.value,
    }));
  };

  const handleRatingChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: parseInt(e.target.value),
    }));
  };

  const handleSortChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: e.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({ category: "", rating: 0, sortBy: "" });
  };

  return (
    <div className="bg-light p-3 rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Filters</h4>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>

      <div className="mb-3">
        <h5>Category</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="categoryFilter"
            value=""
            checked={filters.category === ""}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label">All</label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="categoryFilter"
            value="Men"
            checked={filters.category === "Men"}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label">Men</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="categoryFilter"
            value="Women"
            checked={filters.category === "Women"}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label">Women</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="categoryFilter"
            value="Kids"
            checked={filters.category === "Kids"}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label">Kids</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="categoryFilter"
            value="Electronics"
            checked={filters.category === "Electronics"}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label">Electronics</label>
        </div>
      </div>

      <div className="mb-3">
        <h5>Rating</h5>
        <input
          type="range"
          className="form-range"
          min="0"
          max="5"
          step="1"
          value={filters.rating}
          onChange={handleRatingChange}
        />
        <span>{filters.rating} Stars & above</span>
      </div>

      <div className="mb-3">
        <h5>Sort by Price</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="priceSort"
            value="lowToHigh"
            checked={filters.sortBy === "lowToHigh"}
            onChange={handleSortChange}
          />
          <label className="form-check-label">Price: Low to High</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="priceSort"
            value="highToLow"
            checked={filters.sortBy === "highToLow"}
            onChange={handleSortChange}
          />
          <label className="form-check-label">Price: High to Low</label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
