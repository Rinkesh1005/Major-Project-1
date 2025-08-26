import { useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filters";
import { useSearchParams } from "react-router-dom";
import useFetch from "../useFetch";

const ProductListPage = ({
  cart,
  setCart,
  wishlist,
  setWishlist,
  searchQuery,
  setSearchQuery,
}) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [filters, setFilters] = useState({
    category: initialCategory,
    rating: 0,
    sortBy: "",
  });

  const { data, loading, error } = useFetch(
    "https://major-project-1-backend-theta.vercel.app/products"
  );

  const products = Array.isArray(data) ? data : [];

  const filteredProducts = products
    .filter((p) => {
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (filters.category && p.category !== filters.category) {
        return false;
      }
      if (p.rating < filters.rating) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "lowToHigh") return a.price - b.price;
      if (filters.sortBy === "highToLow") return b.price - a.price;
      return 0;
    });

  const onAddToCart = (productToAdd) => {
    const productWithId = {
      ...productToAdd,
      id: productToAdd.id || productToAdd._id,
    };
    const existingCartItem = cart.find((item) => item.id === productWithId.id);
    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.id === productWithId.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...productWithId, quantity: 1 }]);
    }
  };

  const onAddToWishlist = (productToAdd) => {
    const productWithId = {
      ...productToAdd,
      id: productToAdd.id || productToAdd._id,
    };
    const existingItem = wishlist.find((item) => item.id === productWithId.id);
    if (existingItem) {
      setWishlist(wishlist.filter((item) => item.id !== productWithId.id));
    } else {
      setWishlist([...wishlist, productWithId]);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // 🔹 Loading state with spinner after Header
  if (loading)
    return (
      <>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading products...</p>
        </div>
      </>
    );

  if (error || !Array.isArray(data))
    return (
      <>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-4">
          <div className="alert alert-danger text-center" role="alert">
            <h4>Error Loading Products</h4>
            <p>{error || "Invalid response from server"}</p>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <Filter filters={filters} setFilters={setFilters} />
          </div>
          <div className="col-md-9">
            <h2 className="py-3">
              Showing All Products ({filteredProducts.length} products)
            </h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredProducts.map((product) => {
                const productWithId = {
                  ...product,
                  id: product.id || product._id,
                };

                return (
                  <div key={productWithId.id} className="col mb-4">
                    <ProductCard
                      product={productWithId}
                      onAddToCart={onAddToCart}
                      onAddToWishlist={onAddToWishlist}
                      isWishlisted={isWishlisted(productWithId.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
