import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product, selectedSize = null) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item =>
          item.id === product.id &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id &&
          item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          selectedSize,
          quantity: 1
        }
      ];
    });
  };

  // BUY NOW
const buyNow = (product, selectedSize = null) => {
  const item = {
    ...product,
    selectedSize,
    quantity: 1,
  };

  setCart([item]); // 👈 replaces entire cart
  localStorage.setItem("cart", JSON.stringify([item]));
};


  const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
};

  // INCREASE QTY
  const increaseQty = (id, size) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE QTY
  const decreaseQty = (id, size) => {
    setCart(cart =>
      cart
        .map(item =>
          item.id === id && item.selectedSize === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        clearCart,
        buyNow,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
