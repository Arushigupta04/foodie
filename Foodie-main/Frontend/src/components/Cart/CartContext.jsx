import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['cart']);
  const [cartItems, setCartItems] = useState(cookies.cart || []);

  useEffect(() => {
    setCookie('cart', cartItems, { path: '/' });
  }, [cartItems, setCookie]);

  const addItemToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      };
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
  };

  const increaseItemQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseItemQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
