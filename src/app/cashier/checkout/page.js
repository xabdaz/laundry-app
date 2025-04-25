import React from "react";
import { Box } from "@mui/material";
import CheckoutSidebar from "@/components/cashier/CheckoutSidebar";
import CheckoutContent from "@/components/cashier/CheckoutContent";

const NAVIGATION_SIDEBAR_WIDTH = "150px";
const CART_SIDEBAR_WIDTH = "380px";

export default function LaundryPOSLayout() {
  return (
    <Box>
      {/* Main Content (scrollabe) */}
      <CheckoutContent
        nav_width={NAVIGATION_SIDEBAR_WIDTH}
        cart_width={CART_SIDEBAR_WIDTH}
      />

      {/* Payment Sidebar */}
      <CheckoutSidebar
        nav_width={NAVIGATION_SIDEBAR_WIDTH}
        cart_width={CART_SIDEBAR_WIDTH}
      />
    </Box>
  );
}
