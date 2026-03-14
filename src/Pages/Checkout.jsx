import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const { cart, totalPrice, clearCart  } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const placeOrder = () => {
    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please fill all details");
      return;
    }
    
    clearCart();
    navigate("/success");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT: SHIPPING DETAILS */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-2 rounded mb-3"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-3"
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 rounded mb-3"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Address"
            className="w-full border p-2 rounded mb-3"
            rows="4"
            onChange={handleChange}
          />

          <button
            onClick={placeOrder}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex justify-between border-b py-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.selectedSize && (
                      <p className="text-sm text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}

              <div className="flex justify-between mt-6 text-lg font-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
