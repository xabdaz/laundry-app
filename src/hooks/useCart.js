import { useCartContext } from "../context/CartContext";

export const useCart = () => {
  const { cart, addItem, removeItem, incrementQty, decrementQty, clearCart } =
    useCartContext();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

  return {
    cart,
    totalQty,
    totalPrice,
    addItem,
    removeItem,
    incrementQty,
    decrementQty,
    clearCart,
  };
};
