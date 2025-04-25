"use client";

import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  List,
  TextField,
} from "@mui/material";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useCartContext } from "@/context/CartContext";
import Lottie from "lottie-react";
import emptyCartAnimation from "../../../public/animation/empty-cart.json";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/utils/helper";

export default function CartSidebar({ width }) {
  const { cart, removeItem, incrementQty, decrementQty, clearCart, updateQty } =
    useCartContext();
  const route = useRouter();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    console.log("Checkout clicked", cart);
    route.push("/cashier/checkout");
  };

  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      {/* Order Summary */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: width,
          height: "100%",
          bgcolor: "white",
          borderLeft: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderBottom="1px solid #e0e0e0">
          <Typography color="#000000" fontSize={20} fontWeight={500}>
            Pesanan
          </Typography>
          <IconButton color="error" onClick={clearCart}>
            <FiTrash2 />
          </IconButton>
        </Box>

        <Box flex={1} overflow="auto" p={2}>
          <List>
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  mb: 2,
                  p: 1,
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}>
                <Box
                  width={"100%"}
                  display="flex"
                  gap={1}
                  alignItems="center"
                  height={50}
                  justifyContent="space-between">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "contain",
                      backgroundColor: "white",
                    }}
                  />
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={"100%"}>
                    <Typography fontSize={14} fontWeight={600} color="#000">
                      {item.name}
                    </Typography>
                    <Typography fontWeight={600} color="#000">
                      {item.qty ? formatRupiah(item.price * item.qty) : 0}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  width={"100%"}
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop={1}>
                  <IconButton size="small" sx={{ opacity: "0%" }}>
                    <IoIosCloseCircleOutline />
                  </IconButton>
                  <Stack direction="row" spacing={2.5} alignItems="center">
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: "#001f3f",
                        color: "#fff",
                        ":hover": { bgcolor: "#001f3f", color: "#fff" },
                      }}
                      onClick={() => {
                        if (item.qty > 1 && item.qty < 2) {
                          removeItem(item.id);
                        } else {
                          decrementQty(item.id);
                        }
                      }}>
                      <FiMinus />
                    </IconButton>

                    <TextField
                      type="number"
                      value={item.qty || ""}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value) && value >= 1) {
                          updateQty(item.id, value);
                        }
                      }}
                      InputProps={{
                        step: "0.1",
                        min: "1",
                        pattern: "^[0-9]*[.,]?[0-9]*$",
                        endAdornment: (
                          <Typography
                            sx={{ ml: 0.5, userSelect: "none" }}
                            fontSize={14}
                            color="#888">
                            kg
                          </Typography>
                        ),
                        sx: {
                          width: 90,
                          bgcolor: "#f9f9f9",
                          borderRadius: 1,
                          fontSize: 14,
                          "&:focus-within": {
                            borderColor: "#001f3f",
                            boxShadow: "0 0 0 2px rgba(0, 31, 63, 0.2)",
                          },
                        },
                      }}
                      size="small"
                    />

                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: "#001f3f",
                        color: "#fff",
                        ":hover": { bgcolor: "#001f3f", color: "#fff" },
                      }}
                      onClick={() => incrementQty(item.id)}>
                      <FiPlus />
                    </IconButton>
                  </Stack>
                  <IconButton onClick={() => removeItem(item.id)}>
                    <IoIosCloseCircleOutline />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </List>

          {cart.length === 0 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
              gap={2}>
              <Lottie
                animationData={emptyCartAnimation}
                style={{ width: 200, height: 200 }}
              />
              <Typography
                color="#959595"
                fontSize={14}
                fontWeight={600}
                textAlign={"center"}>
                Wah, keranjangmu masih kosong. Silahkan lakukan pemesanan!
              </Typography>
            </Box>
          )}
        </Box>

        <Divider />
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            fontWeight="bold"
            mb={2}>
            <Typography
              variant="subtitle1"
              color="#000"
              fontWeight={600}
              fontSize={20}>
              Total
            </Typography>
            <Typography
              variant="subtitle1"
              color="#000"
              fontWeight={600}
              fontSize={20}>
              {formatRupiah(calculateTotal())}
            </Typography>
          </Box>
          <Stack spacing={1}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: "#003049",
                height: "50px",
                fontWeight: "600",
                textTransform: "capitalize",
                fontSize: "16px",
              }}
              onClick={handleCheckout}
              disabled={cart.length === 0}>
              Lanjutkan
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
