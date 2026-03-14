import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import products from "../Data/Products";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewDetails() {
  const { id } = useParams();
  const product = products.find(item => item.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  if (!product) {
    return <div className="ml-10 mt-10 text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 flex flex-col lg:flex-row gap-10">

      {/* PRODUCT IMAGE */}
      <div className="flex justify-center lg:justify-start">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 object-cover border rounded-lg"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col lg:flex-row flex-1 gap-8">

        {/* PRODUCT DETAILS */}
        <div className="flex-1">

          <span className="text-sm text-gray-500 uppercase">
            {product.category}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-1">
            Brand: <span className="font-medium">{product.brand}</span> | Size:{" "}
            <span className="font-medium">
              {Array.isArray(product.size)
                ? product.size.join(", ")
                : product.size}
            </span>
          </p>

          <p className="text-xl md:text-2xl font-semibold text-green-600 mt-3">
            ₹{product.price}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
              ⭐ {product.rating}
            </span>
            <span className="text-gray-600">
              ({product.reviews_count} reviews)
            </span>
          </div>

          {/* SIZE BUTTONS */}
          {product.sizes && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Size</p>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 rounded
                      ${selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white hover:bg-gray-100"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-gray-700 mt-4">
            {product.description}
          </p>

          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-2">About this item</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {product.about.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* ADD TO CART SIDE CARD */}
        <div className="w-full lg:w-64 border rounded-lg p-4 h-fit shadow">

          <p className="text-xl font-semibold text-green-600">
            ₹{product.price}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Inclusive of all taxes
          </p>

          <button
  onClick={() => {
    addToCart(
      product,
      Array.isArray(product.size) ? selectedSize : null
    );
    toast.success("Product added to cart 🛒");
  }}
  className="w-full mt-4 py-2 rounded font-semibold bg-yellow-400 hover:bg-yellow-500"
>
  Add to Cart
</button>

          <button
            onClick={() => {
              buyNow(product, selectedSize);
              navigate("/checkout");
            }}
            className="w-full bg-orange-600 text-white py-3 rounded mt-3 hover:bg-orange-700"
          >
            Buy Now
          </button>

          <p className="text-xs text-gray-600 mt-3">
            🚚 Free delivery available
          </p>
          <ToastContainer position="top-right" autoClose={2000} />

        </div>

      </div>
    </div>
  );
}

export default ViewDetails;