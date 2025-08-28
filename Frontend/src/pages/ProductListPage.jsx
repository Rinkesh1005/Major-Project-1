import { useState } from "react";
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
  // setSearchQuery,
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
      if (filters.category) {
        const categories = filters.category.split(",").filter(Boolean);
        if (categories.length > 0 && !categories.includes(p.category)) {
          return false;
        }
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

  if (loading)
    return (
      <div className="container mt-4 mb-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading products...</p>
      </div>
    );

  if (error || !Array.isArray(data))
    return (
      <div className="container mt-4 mb-5">
        <div className="alert alert-danger text-center" role="alert">
          <h4>Error Loading Products</h4>
          <p>{error || "Invalid response from server"}</p>
        </div>
      </div>
    );

  return (
    <div className="container mt-3 mb-5">
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
  );
};

export default ProductListPage;
