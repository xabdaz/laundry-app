"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { postCheckout } from '@/services/pos';

import { FaAngleRight } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa6";
import { BsCash } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";

import { useCartContext } from "@/context/CartContext";
import { formatRupiah } from "@/utils/helper";
import { useRouter } from "next/navigation";
import SuccessPayment from "../modal/SuccessPayment";
import { useGeneralContext } from "@/context/GeneralContext";
import { getEtalase } from "@/services/pos";

import CurrencyInput from "../CurrencyInput";


export default function CheckoutSidebar({ nav_width, cart_width }) {
  const { cart, clearCart } = useCartContext();
  const { payloadOrder, setPayloadOrder, clearPayloadOrder, setNavbar } =
    useGeneralContext();
  const route = useRouter();

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [selectedCard, setSelectedCard] = useState("MasterCard");
  const [cardInfo, setCardInfo] = useState({});

  // Update payloadOrder whenever cart or payment details change
  useEffect(() => {
    setPayloadOrder((prev) => ({
      ...prev,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.qty,
        price_delivery_perKg: item.price_delivery_perKg
      })),
      total_amount: calculateTotal(),
      payment_method: paymentMethod,
      payment_details:
        paymentMethod === "Card"
          ? {
              card_type: selectedCard,
              ...cardInfo,
            }
          : paymentMethod === "Cash"
          ? {
              cash_amount: prev.payment_details?.cash_amount || 0,
            }
          : {
              qris: true,
            },
    }));
  }, [cart, paymentMethod, selectedCard, cardInfo]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price + item.price_delivery_perKg) * item.qty, 0);
  };

  const handleCardInfoChange = (field, value) => {
    setCardInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckout = async () => {
    try {
      console.log("Payment Method:", payloadOrder.payment_method);
      const now = new Date();
      const isoString = now.toISOString();
      const payload = {
        customer_name: `${payloadOrder.customer_name}`,
        phone_number: `${payloadOrder.phone_number}`,
        date_in: isoString,
        date_out: "2025-04-27T18:00:00Z",
        delivery_method: "delivery",
        delivery_fee: 0,
        total_price: payloadOrder.total_amount,
        status: "Pending",
        created_by: "admin",
        payment: {
          method: `${payloadOrder.payment_method}`
        },
        transaction_items: payloadOrder.items.map((item) => ({
          laundry_variant_id: item.id,
          price_per_unit: item.price,
          estimated_finish_date: "2025-04-27T12:00:00Z",
          quantity: item.quantity,
          price_delivery_perkg: item.price_delivery_perKg,
          status: "belum_diproses",
          subtotal: ((item.quantity) * (item.price+item.price_delivery_perKg))
        }))
      };

      const checkout = await postCheckout(payload);
      console.log("Profile dari API:", checkout);

      console.log("Request dari API:", payload);
  
      // Setelah berhasil dapat response, lanjut checkout
      setOpenSuccessModal(true);
  
      setTimeout(() => {
        route.push("/status");
        setNavbar("status");
        clearCart();
        clearPayloadOrder();
      }, 2200);
  
    } catch (error) {
      console.error("Gagal hit API:", error);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Checkout payload:", payloadOrder);
      const now = new Date();
      const isoString = now.toISOString();
      const payload = {
        customer_name: `${payloadOrder.customer_name}`,
        phone_number: `${payloadOrder.phone_number}`,
        date_in: isoString,
        date_out: "2025-04-27T18:00:00Z",
        delivery_method: "delivery",
        delivery_fee: 0,
        total_price: payloadOrder.total_amount,
        status: "Pending",
        created_by: "admin",
        transaction_items: payloadOrder.items.map((item) => ({
          laundry_variant_id: item.id,
          price_per_unit: item.price,
          estimated_finish_date: "2025-04-27T12:00:00Z",
          quantity: item.quantity,
          price_delivery_perkg: item.price_delivery_perKg,
          status: "belum_diproses",
          subtotal: ((item.quantity) * (item.price+item.price_delivery_perKg))
        }))
      };

      const checkout = await postCheckout(payload);
      console.log("Profile dari API:", checkout);

      console.log("Request dari API:", payload);
  
      // Setelah berhasil dapat response, lanjut checkout
      setOpenSuccessModal(true);
  
      setTimeout(() => {
        route.push("/status");
        setNavbar("status");
        clearCart();
        clearPayloadOrder();
      }, 2200);
  
    } catch (error) {
      console.error("Gagal hit API:", error);
    }
  };
  

  // const handleSave = () => {
  //   // Save the current state without completing checkout
  //   setPayloadOrder((prev) => ({
  //     ...prev,
  //     status: "pending",
  //   }));
  //   console.log("Saved payload:", payloadOrder);
  //   // You might want to add a toast or notification here
  // };

  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      <SuccessPayment
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        message="Pembayaran berhasil!"
      />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: cart_width,
          height: "100%",
          bgcolor: "white",
          borderLeft: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          p={2}
          borderBottom="1px solid #e0e0e0">
          <Typography
            fontSize={20}
            fontWeight={500}
            textAlign="center"
            color="#00225C">
            Pembayaran
          </Typography>
        </Box>

        <Box flex={1} overflow="auto" p={2}>
          <Stack spacing={2}>
            {/* Payment Method Tabs */}
            <Stack direction="row" spacing={2} pb={1}>
              {["Card", "Cash", "Qris"].map((method) => (
                <Button
                  key={method}
                  variant={paymentMethod === method ? "contained" : "outlined"}
                  onClick={() => {
                    setPaymentMethod(method);
                    setPayloadOrder((prev) => ({
                      ...prev,
                      payment_method: method,
                    }));
                  }}
                  sx={{
                    textTransform: "capitalize",
                    width: "100%",
                    height: "80px",
                    bgcolor: paymentMethod === method ? "#00225C" : "#B8B8B8",
                    color: paymentMethod === method ? "white" : "white",
                    borderColor:
                      paymentMethod === method ? "#00225C" : "#B8B8B8",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.4,
                  }}>
                  <Box>
                    {method === "Card" && <FaRegCreditCard />}
                    {method === "Cash" && <BsCash />}
                    {method === "Qris" && <IoQrCodeOutline />}
                  </Box>
                  <Typography>{method}</Typography>
                </Button>
              ))}
            </Stack>

            {/* Card Payment Form */}
            {paymentMethod === "Card" && (
              <>
                {/* Card Type */}
                <Stack direction="row" spacing={1}>
                  {["MasterCard", "Visa", "AmericanExpress", "Discover"].map(
                    (type) => (
                      <Box
                        key={type}
                        onClick={() => {
                          setSelectedCard(type);
                          setPayloadOrder((prev) => ({
                            ...prev,
                            payment_details: {
                              ...prev.payment_details,
                              card_type: type,
                            },
                          }));
                        }}
                        border={
                          selectedCard === type
                            ? "2px solid #00225C"
                            : "1px solid #ccc"
                        }
                        borderRadius={2}
                        width={80}
                        height={50}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ cursor: "pointer" }}>
                        <img
                          src={`/${type.toLowerCase()}.svg`}
                          alt={type}
                          width={70}
                          height={70}
                        />
                      </Box>
                    )
                  )}
                </Stack>

                {/* Card Details */}
                <TextField
                  label="Cardholder Name"
                  fullWidth
                  value={cardInfo.name}
                  onChange={(e) => {
                    handleCardInfoChange("name", e.target.value);
                    setPayloadOrder((prev) => ({
                      ...prev,
                      payment_details: {
                        ...prev.payment_details,
                        name: e.target.value,
                      },
                    }));
                  }}
                />
                <TextField
                  type="tel"
                  inputMode="numeric"
                  label="Card Number"
                  fullWidth
                  value={cardInfo.number}
                  onChange={(e) => {
                    handleCardInfoChange("number", e.target.value);
                    setPayloadOrder((prev) => ({
                      ...prev,
                      payment_details: {
                        ...prev.payment_details,
                        number: e.target.value,
                      },
                    }));
                  }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Expiration Date"
                    fullWidth
                    value={cardInfo.expiry}
                    onChange={(e) => {
                      handleCardInfoChange("expiry", e.target.value);
                      setPayloadOrder((prev) => ({
                        ...prev,
                        payment_details: {
                          ...prev.payment_details,
                          expiry: e.target.value,
                        },
                      }));
                    }}
                  />
                  <TextField
                    type="tel"
                    inputMode="numeric"
                    label="CVV"
                    fullWidth
                    value={cardInfo.cvv}
                    onChange={(e) => {
                      handleCardInfoChange("cvv", e.target.value);
                      setPayloadOrder((prev) => ({
                        ...prev,
                        payment_details: {
                          ...prev.payment_details,
                          cvv: e.target.value,
                        },
                      }));
                    }}
                  />
                </Stack>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cardInfo.save}
                      onChange={(e) => {
                        handleCardInfoChange("save", e.target.checked);
                        setPayloadOrder((prev) => ({
                          ...prev,
                          payment_details: {
                            ...prev.payment_details,
                            save: e.target.checked,
                          },
                        }));
                      }}
                    />
                  }
                  sx={{ color: "#00225C" }}
                  label="Save credit card information"
                />
              </>
            )}

            {/* Cash Input */}
            {paymentMethod === "Cash" && (
              <CurrencyInput
                value={payloadOrder.payment_details?.cash_amount || 0}
                onChange={(amount) =>
                  setPayloadOrder((prev) => ({
                    ...prev,
                    payment_method: "Cash",
                    payment_details: {
                      ...prev.payment_details,
                      cash_amount: amount,
                    },
                  }))
                }
              />
            )}

            {/* QRIS Image */}
            {paymentMethod === "Qris" && (
              <Box display="flex" justifyContent="center">
                <img
                  src="/qris.png"
                  alt="QRIS Payment"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
            )}
          </Stack>
        </Box>

        <Divider />

        <Box p={2}>
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
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={handleCheckout}
              disabled={
                cart.length === 0 ||
                !payloadOrder.customer_name?.trim() ||
                !payloadOrder.phone_number?.trim()
              }>
              <Typography fontWeight={"600"}>
                {formatRupiah(calculateTotal())}
              </Typography>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Typography fontWeight={"500"}>Pay</Typography>
                <FaAngleRight />
              </Box>
            </Button>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                bgcolor: "#C0E1FF",
                height: "50px",
                fontWeight: "600",
                textTransform: "capitalize",
                fontSize: "16px",
              }}
              onClick={handleSave}
              disabled={
                cart.length === 0 ||
                !payloadOrder.customer_name?.trim() ||
                !payloadOrder.phone_number?.trim()
              }>
              Simpan
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
