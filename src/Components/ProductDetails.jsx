import React, { useEffect, useState } from "react";
import products from "../Data/Products";
import { Link, useSearchParams } from "react-router-dom";

function ProductDetails() {

  const PRODUCTS_PER_PAGE = 9;

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortPrice, setSortPrice] = useState("");

  let filteredProducts = products;

  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  if (selectedRating > 0) {
    filteredProducts = filteredProducts.filter(
      (p) => p.rating >= selectedRating
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  if (sortPrice === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortPrice === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const changePage = (page) => {
    setSearchParams({ page });
  };

  useEffect(() => {
    setSearchParams({ page: 1 });
  }, [selectedCategory, selectedRating, priceRange, sortPrice]);

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 2) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row">

      {/* 🔥 LEFT SIDEBAR */}
      <div className="w-full md:w-64 p-6 border-b md:border-r">

        <h3 className="font-bold mb-3">Category</h3>

        {["Men's Fashion", "Womens's Fashion", "Mobile", "Kitchen", "Electronics", "Beauty", "Sports", "Toys"].map(cat => (
          <label key={cat} className="block mb-1">
            <input
              type="radio"
              checked={selectedCategory === cat}
              onChange={() => setSelectedCategory(cat)}
            />{" "}
            {cat}
          </label>
        ))}

        <button
          className="text-blue-500 text-sm mt-1 cursor-pointer"
          onClick={() => setSelectedCategory("All")}
        >
          Clear
        </button>

        <h3 className="font-bold mt-5 mb-2">Rating</h3>

        {[4, 3, 2].map((r) => (
          <label key={r} className="block">
            <input
              type="radio"
              name="rating"
              checked={selectedRating === r}
              onChange={() => setSelectedRating(r)}
            />{" "}
            {r} ★ & above
          </label>
        ))}

        <button
          onClick={() => setSelectedRating(0)}
          className="text-blue-500 text-sm mt-1 cursor-pointer"
        >
          Clear Rating
        </button>

        <h3 className="font-bold mt-5 mb-2">Price</h3>

        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            className="w-20 border px-2 py-1 rounded"
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />

          <span>-</span>

          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            className="w-20 border px-2 py-1 rounded"
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>

        <input
          type="range"
          min="0"
          max="100000"
          value={priceRange[1]}
          className="w-full mt-2"
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />

        <p className="text-sm mt-1 text-gray-600">
          ₹{priceRange[0]} – ₹{priceRange[1]}
        </p>

        <button
          onClick={() => setPriceRange([0, 100000])}
          className="text-blue-500 text-sm mt-1"
        >
          Clear Price
        </button>

        <h3 className="font-bold mt-5 mb-2">Sort By Price</h3>

        <select
          className="border p-2 w-full"
          onChange={(e) => setSortPrice(e.target.value)}
        >
          <option value="">None</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>

      </div>

      {/* 🔥 RIGHT PRODUCTS */}
      <div className="flex-1">

        <div className="font-bold ml-4 md:ml-10 mt-8 text-2xl md:text-3xl">
          Products
        </div>

        <div className="mx-4 md:ml-10 md:mr-10 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 mb-10">

          {currentProducts.length === 0 ? (
            <p className="col-span-full text-center text-red-500 text-2xl font-bold">
              No products found 😕
            </p>
          ) : (
            currentProducts.map(product => (
              <div
                key={product.id}
                className="border-2 rounded-2xl p-4 flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-40 object-cover"
                />

                <h2 className="mt-3 font-semibold text-center">
                  {product.name}
                </h2>

                <p className="text-green-600 font-bold">
                  ₹{product.price}
                </p>

                <Link to={`/product/${product.id}`}>
                  <button className="mt-3 bg-black text-white px-4 py-1 rounded cursor-pointer hover:bg-gray-800">
                    View Details
                  </button>
                </Link>
              </div>
            ))
          )}

        </div>

        {/* PAGINATION */}

        <div className="flex flex-wrap justify-center items-center gap-2 mb-20 px-4">

          <button
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
            className="px-4 py-2 border rounded"
          >
            Prev
          </button>

          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span key={index}>...</span>
            ) : (
              <button
                key={index}
                onClick={() => changePage(page)}
                className={`px-4 py-2 border rounded ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
            className="px-4 py-2 border rounded"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;