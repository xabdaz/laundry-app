import React from "react";
import { Box } from "@mui/material";
import CartSidebar from "@/components/cashier/CartSidebar";
import MainContent from "@/components/cashier/MainContent";
import { getEtalase } from "@/services/pos";

const NAVIGATION_SIDEBAR_WIDTH = "150px";
const CART_SIDEBAR_WIDTH = "380px";

export default async function LaundryPOSLayout() {
  
  return (
    <Box>
      <MainContent
        nav_width={NAVIGATION_SIDEBAR_WIDTH}
        cart_width={CART_SIDEBAR_WIDTH}
      />

      <CartSidebar width={CART_SIDEBAR_WIDTH} />
    </Box>
  );
}
