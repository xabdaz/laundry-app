import React from "react";
import { Box } from "@mui/material";
import CheckoutSidebar from "@/components/cashier/CheckoutSidebar";
import CheckoutContent from "@/components/cashier/CheckoutContent";
import MainContent from "@/components/dashboard/MainContent";

const NAVIGATION_SIDEBAR_WIDTH = "150px";
const CART_SIDEBAR_WIDTH = "0";

export default function LaundryPOSLayout() {
  return (
    <Box>
      {/* Main Content (scrollabe) */}
      <MainContent
        nav_width={NAVIGATION_SIDEBAR_WIDTH}
        cart_width={CART_SIDEBAR_WIDTH}
      />
    </Box>
  );
}
