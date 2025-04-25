import React from "react";
import { Box } from "@mui/material";
import MainContent from "@/components/dashboard/MainContent";

const NAVIGATION_SIDEBAR_WIDTH = "150px";
const CART_SIDEBAR_WIDTH = "0px";

export default function LaundryPOSLayout() {
  return (
    <Box>
      <MainContent
        nav_width={NAVIGATION_SIDEBAR_WIDTH}
        cart_width={CART_SIDEBAR_WIDTH}
      />
    </Box>
  );
}
