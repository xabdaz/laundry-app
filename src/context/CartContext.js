"use client";

import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const CartContext = createContext();

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE_CART":
      return { ...state, items: action.payload };
    case "ADD_ITEM": {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: parseFloat(action.payload.qty) }
            : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "INCREMENT_QTY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case "DECREMENT_QTY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
          )
          .filter((item) => item.qty > 0),
      };
    case "CLEAR_CART":
      return initialState;
    case "ADD_ITEMS":
      return {
        items: state.items
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const hasHydrated = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage only on client side after mount
  useEffect(() => {
    setIsMounted(true);
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "HYDRATE_CART", payload: JSON.parse(storedCart) });
    }
    hasHydrated.current = true;
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (isMounted && hasHydrated.current) {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }, [state.items, isMounted]);

  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const addItems = (item) => dispatch({ type: "ADD_ITEMS", payload: item });
  const updateQty = (id, qty) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const incrementQty = (id) => dispatch({ type: "INCREMENT_QTY", payload: id });
  const decrementQty = (id) => dispatch({ type: "DECREMENT_QTY", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addItem,
        addItems,
        updateQty,
        removeItem,
        incrementQty,
        decrementQty,
        clearCart,
        isMounted, // expose mounted state if needed
      }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext must be used within CartProvider");
  return context;
};
