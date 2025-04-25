"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [navbar, setNavbar] = useState(null);
  const [payloadOrder, setPayloadOrder] = useState({});

  // Hydrate from localStorage after mount
  useEffect(() => {
    const storedNavbar = localStorage.getItem("navbar");
    const storedPayloadOrder = localStorage.getItem("payloadOrder");

    setNavbar(storedNavbar ? JSON.parse(storedNavbar) : "home");
    setPayloadOrder(storedPayloadOrder ? JSON.parse(storedPayloadOrder) : {});
  }, []);

  // Save to localStorage when navbar changes
  useEffect(() => {
    if (navbar !== null) {
      localStorage.setItem("navbar", JSON.stringify(navbar));
    }
  }, [navbar]);

  // Save to localStorage when payloadOrder changes
  useEffect(() => {
    if (payloadOrder !== null) {
      localStorage.setItem("payloadOrder", JSON.stringify(payloadOrder));
    }
  }, [payloadOrder]);

  const clearPayloadOrder = () => {
    setPayloadOrder({});
    localStorage.removeItem("payloadOrder");
  };

  // Prevent rendering until navbar is loaded
  if (navbar === null) return null;

  return (
    <GeneralContext.Provider
      value={{
        navbar,
        setNavbar,
        payloadOrder,
        setPayloadOrder,
        clearPayloadOrder,
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context)
    throw new Error("useGeneralContext must be used within GeneralProvider");
  return context;
};
