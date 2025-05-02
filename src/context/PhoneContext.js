"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Mock fetch function (replace with actual API later)
const fetchPhoneNumbers = async () => {
  // Simulasi delay + mock data
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { 
            nama_customer: "Boy",
            nomor: "08221231231231" 
        },
        { 
            nama_customer: "Boy",
            nomor: "082231231231" 
        },
      ]);
    }, 1000)
  );
};

const PhoneContext = createContext();

export function PhoneProvider({ children }) {
  const [phones, setPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPhones = async () => {
    console.log("udh hit duluan contact")
    try {
      setIsLoading(true);
      const data = await fetchPhoneNumbers();
      setPhones(data);
    } catch (err) {
      setError(err.message || "Failed to load phone numbers");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PhoneContext.Provider value={{ phones, isLoading, error, refresh: getPhones }}>
      {children}
    </PhoneContext.Provider>
  );
}

export const usePhoneContext = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error("usePhoneContext must be used within a PhoneProvider");
  }
  return context;
};
