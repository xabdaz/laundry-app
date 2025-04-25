import React from "react";
import { Box } from "@mui/material";
import CartSidebar from "@/components/cashier/CartSidebar";
import MainContent from "@/components/cashier/MainContent";

const NAVIGATION_SIDEBAR_WIDTH = "150px";
const CART_SIDEBAR_WIDTH = "380px";

export default function LaundryPOSLayout() {
  return (
    <Box>
      {/* Main Content (scrollabe) */}
      <MainContent
        nav_width={NAVIGATION_SIDEBAR_WIDTH}
        cart_width={CART_SIDEBAR_WIDTH}
      />

      {/* Order Summary */}
      <CartSidebar width={CART_SIDEBAR_WIDTH} />
    </Box>
  );
}
