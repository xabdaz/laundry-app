"use client";

import { CartProvider } from "@/context/CartContext";
import { GeneralProvider } from "@/context/GeneralContext";

import { Box } from "@mui/material";

export function Providers({ children }) {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        bgcolor: "#FAFAFA",
      }}>
      <GeneralProvider>
        <CartProvider>{children}</CartProvider>
      </GeneralProvider>
    </Box>
  );
}
