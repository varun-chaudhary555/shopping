import React, { useState, useEffect } from "react";
import products from "../Data/Products";
import { Link, useSearchParams } from "react-router-dom";

function Womensfashion() {

  const womensProducts = products.filter(
    (product) => product.category === "Women's Fashion"
  );

  /* ================= FILTER STATES ================= */
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const [sortOrder, setSortOrder] = useState("");

  /* ================= APPLY FILTERS ================= */
  let filteredProducts = womensProducts;

  if (selectedSize) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        Array.isArray(p.size)
          ? p.size.includes(selectedSize)
          : p.size === selectedSize
    );
  }

  if (selectedBrand) {
    filteredProducts = filteredProducts.filter(
      (p) => p.brand === selectedBrand
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

  /* ================= SORT ================= */
  if (sortOrder === "low-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOrder === "high-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  /* ================= PAGINATION ================= */
  const PRODUCTS_PER_PAGE = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const changePage = (page) => {
    setSearchParams({ page });
  };

  useEffect(() => {
    setSearchParams({ page: 1 });
  }, [selectedSize, selectedBrand, selectedRating, priceRange, sortOrder]);

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

  const brands = [
    ...new Set(womensProducts.map((p) => p.brand).filter(Boolean)),
  ].slice(0, 8);

  return (
    <div className="px-4 md:px-10">

      <div className="font-bold flex justify-center mt-8 text-2xl md:text-3xl">
        Women's Fashion
      </div>

      <div className="text-xl md:text-2xl font-bold mt-6">
        Filter
      </div>

      <div className="flex flex-col md:flex-row">

        {/* ================= FILTER SIDEBAR ================= */}
        <div className="w-full md:w-64 mt-6 border p-4 rounded h-fit">

          <h3 className="font-bold mb-2">Sort By Price</h3>
          <select
            className="w-full border p-2 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">None</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>

          {/* SIZE */}
          <h3 className="font-bold mt-5 mb-2">Size</h3>
          {["S", "M", "L", "XL"].map((s) => (
            <label key={s} className="block">
              <input
                type="radio"
                name="size"
                checked={selectedSize === s}
                onChange={() => setSelectedSize(s)}
              />{" "}
              {s}
            </label>
          ))}
          <button
            onClick={() => setSelectedSize("")}
            className="text-blue-500 text-sm mt-1"
          >
            Clear Size
          </button>

          {/* BRAND */}
          <h3 className="font-bold mt-5 mb-2">Brand</h3>
          {brands.map((brand) => (
            <label key={brand} className="block">
              <input
                type="radio"
                name="brand"
                checked={selectedBrand === brand}
                onChange={() => setSelectedBrand(brand)}
              />{" "}
              {brand}
            </label>
          ))}
          <button
            onClick={() => setSelectedBrand("")}
            className="text-blue-500 text-sm mt-1"
          >
            Clear Brand
          </button>

          {/* RATING */}
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
            className="text-blue-500 text-sm mt-1"
          >
            Clear Rating
          </button>

          {/* PRICE */}
          <h3 className="font-bold mt-5 mb-2">Price</h3>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-20 border px-2 py-1 rounded"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
            />
            <input
              type="number"
              className="w-20 border px-2 py-1 rounded"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>
          <button
            onClick={() => setPriceRange([0, 100000])}
            className="text-blue-500 text-sm mt-1"
          >
            Clear Price
          </button>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="flex-1 mt-8 md:ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

          {currentProducts.length === 0 ? (
            <p className="col-span-full text-center text-red-500 text-2xl font-bold">
              No products found 😕
            </p>
          ) : (
            currentProducts.map((product) => (
              <div
                key={product.id}
                className="border-2 rounded-2xl p-4 flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-40 object-cover"
                />
                <h2 className="mt-3 font-semibold text-center">{product.name}</h2>
                <p className="text-green-600 font-bold">₹{product.price}</p>

                <Link to={`/product/${product.id}`}>
                  <button className="mt-3 bg-black text-white px-4 py-1 rounded hover:bg-gray-800">
                    View Details
                  </button>
                </Link>
              </div>
            ))
          )}

        </div>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-20">
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
                currentPage === page ? "bg-black text-white" : ""
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
  );
}

export default Womensfashion;