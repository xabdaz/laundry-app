"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import MainContent from "@/components/status/MainContent";
import CartSidebar from "@/components/status/CartSidebar";

const NAVIGATION_SIDEBAR_WIDTH = "150px";
const CART_SIDEBAR_WIDTH = "380px";

export default function LaundryPOSLayout() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  return (
    <Box>
      <MainContent
        nav_width={NAVIGATION_SIDEBAR_WIDTH}
        cart_width={selectedOrder ? CART_SIDEBAR_WIDTH : "0px"}
        setShowCartSidebar={setSelectedOrder} // kirim fungsi setter
        shouldRefresh={shouldRefresh} // new
        setShouldRefresh={setShouldRefresh} // new
      />

      {selectedOrder && (
        <CartSidebar
        width={CART_SIDEBAR_WIDTH}
        order={selectedOrder}
        transactionDetail={selectedOrder}
        setTransactionDetail={setSelectedOrder}
        setShouldRefresh={setShouldRefresh} // new
      />
      )}
    </Box>
  );
}
