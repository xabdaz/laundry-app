"use client";

import React from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  List,
  TextField,
} from "@mui/material";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosCloseCircleOutline, IoIosArrowBack } from "react-icons/io";
import { useCartContext } from "@/context/CartContext";
import { useGeneralContext } from "@/context/GeneralContext";
import { formatRupiah } from "@/utils/helper";

export default function CartSidebar({ nav_width, cart_width }) {
  const { cart, removeItem, incrementQty, decrementQty, updateQty } =
    useCartContext();
  const { payloadOrder, setPayloadOrder } = useGeneralContext();

  return (
    <Box
      sx={{
        marginLeft: nav_width,
        marginRight: cart_width,
        overflow: "hidden",
        bgcolor: "#FAFAFA",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
      {/* Header */}
      <Box
        position={"sticky"}
        top={0}
        bgcolor="#FAFAFA"
        display="flex"
        justifyContent="space-start"
        gap={1.5}
        alignItems="center"
        p={2}
        borderBottom="1px solid #e0e0e0">
        <IoIosArrowBack
          size={24}
          color="#000000"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.history.back();
          }}
        />
        <Typography color="#000000" fontSize={20} fontWeight={500}>
          Checkout
        </Typography>
      </Box>

      {/* Customer Info */}
      <Box px={2} mt={2} mb={1} borderBottom="1px solid #eee">
        <Stack spacing={2}>
          <TextField
            label="Nama Pelanggan"
            fullWidth
            value={payloadOrder?.customer_name || ""}
            onChange={(e) =>
              setPayloadOrder({
                ...payloadOrder,
                customer_name: e.target.value,
              })
            }
          />
          <TextField
            label="No HP"
            type="tel"
            inputMode="numeric"
            fullWidth
            value={payloadOrder?.phone_number || ""}
            onChange={(e) =>
              setPayloadOrder({
                ...payloadOrder,
                phone_number: e.target.value,
              })
            }
          />
        </Stack>
      </Box>

      {/* Scrollable Cart */}
      <Box
        flex={1}
        overflow="auto"
        px={2}
        py={1}
        display="flex"
        flexDirection="column">
        <List>
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.06)",
                mb: 2,
              }}>
              {/* Image */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  flexShrink: 0,
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "#f4f4f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <img
                  src={`/${item.image}`}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Info + Controls */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                {/* Name + Price */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start">
                  <Typography fontSize={15} fontWeight={600} color="#000">
                    {item.name}
                  </Typography>
                  <Typography fontWeight={600} color="#000">
                    {item.qty ? formatRupiah(item.price * item.qty) : 0}
                  </Typography>
                </Box>

                {/* Controls */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={1}>
                  <Stack direction="row" spacing={4} alignItems="center">
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
                        ":hover": { bgcolor: "#001f3f" },
                      }}
                      onClick={() => incrementQty(item.id)}>
                      <FiPlus />
                    </IconButton>
                  </Stack>

                  <IconButton
                    onClick={() => removeItem(item.id)}
                    sx={{ color: "#999" }}>
                    <IoIosCloseCircleOutline />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}

          {cart.length === 0 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
              gap={2}>
              <Typography
                color="#959595"
                fontSize={14}
                fontWeight={600}
                textAlign={"center"}>
                Wah, keranjangmu masih kosong. Silahkan lakukan pemesanan!
              </Typography>
            </Box>
          )}
        </List>
      </Box>
    </Box>
  );
}
