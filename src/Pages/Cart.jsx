import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, increaseQty, decreaseQty, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <h2 className="text-center mt-10 text-xl">
        Your cart is empty 🛒
      </h2>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map(item => (
        <div
          key={`${item.id}-${item.selectedSize}`}
          className="flex gap-4 items-center border-b py-4"
        >
          {/* PRODUCT IMAGE */}
          <img
            src={item.image}
            alt={item.title}
            className="w-24 h-24 object-cover rounded"
          />

          {/* PRODUCT INFO */}
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{item.title}</h2>

            {item.selectedSize && (
              <p className="text-sm text-gray-500">
                Size: {item.selectedSize}
              </p>
            )}

            <p className="text-sm font-medium">₹{item.price}</p>
          </div>

          {/* QUANTITY CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQty(item.id, item.selectedSize)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              -
            </button>

            <span className="font-semibold">{item.quantity}</span>

            <button
              onClick={() => increaseQty(item.id, item.selectedSize)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              +
            </button>
          </div>

          {/* ITEM TOTAL */}
          <div className="font-semibold w-20 text-right">
            ₹{item.price * item.quantity}
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-bold">Total:</h2>
        <h2 className="text-xl font-bold">₹{totalPrice}</h2>
      </div>

      {/* CHECKOUT BUTTON */}
      <Link to={"/checkout"}>
      <button
        className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded font-semibold text-lg"
      >
        Proceed to Checkout
      </button>
      </Link>
    </div>
  );
}

export default Cart;
