"use client";

import React, { useState, useEffect, forwardRef } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  TextField,
  List,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";

import CurrencyInput from "../CurrencyInput";

import SuccessPayment from "../modal/SuccessPayment";
import { BsCash } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Lottie from "lottie-react";
import emptyCartAnimation from "../../../public/animation/empty-cart.json";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/utils/helper";
import { paymentTransaction } from "@/services/pos";
import { useGeneralContext } from "@/context/GeneralContext";

// Transition for full screen dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CartSidebar({ width, transactionDetail, setTransactionDetail, setShouldRefresh }) {
  const router = useRouter();

  const [cardInfo, setCardInfo] = useState({});
  const [selectedCard, setSelectedCard] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const { payloadOrder, setPayloadOrder, clearPayloadOrder, setNavbar } =
    useGeneralContext();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const transaction = transactionDetail?.transaction;
  const details = transactionDetail?.details || [];

  const handleCloseCart = () => {
    setTransactionDetail(null);
  };

  const handleCetakStruk = () => {
    localStorage.setItem("printData", JSON.stringify(transactionDetail));
    router.push("/print/struk");
  };
  
  const handleCheckout = async () => {
    try {
          const now = new Date();
          const isoString = now.toISOString();
          const payload = {
            transaction_id: transaction.id,
            method: `${paymentMethod}`,
            amount_paid: calculateTotal(),
          };
    
          const checkout = await paymentTransaction(payload);
      
          // Setelah berhasil dapat response, lanjut checkout
          setOpenSuccessModal(true);
      
          setTimeout(() => {
            // back to status page and reload
            setTransactionDetail(null);
            setShouldRefresh(true);
            router.push("/status");
            setNavbar("status");
          }, 2200);
      
        } catch (error) {
          console.error("Gagal hit API:", error);
        }
  };

  const handleCardInfoChange = (field, value) => {
    setCardInfo((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    return transaction?.total_price ?? 0;
  };

  useEffect(() => {
    // Reset saat CartSidebar muncul (dapat order baru)
    if (transactionDetail) {
      setPaymentMethod("");
      setSelectedCard("");
      setCardInfo({});
    }
  }, [transactionDetail]);

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
          width: width,
          height: "100%",
          bgcolor: "white",
          borderLeft: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderBottom="1px solid #e0e0e0"
        >
          <Typography color="#000000" fontSize={20} fontWeight={500}>
            Pesanan
          </Typography>
          <IconButton color="error" onClick={handleCloseCart}>
            <IoIosCloseCircleOutline />
          </IconButton>
        </Box>

        <Box flex={1} overflow="auto" p={2}>
          <List>
            {details.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  mb: 2,
                  p: 1,
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Box
                  width={"100%"}
                  display="flex"
                  gap={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontSize={14} fontWeight={600} color="#000">
                    {item.product_name}
                  </Typography>
                  <Typography fontWeight={600} color="#000">
                    {formatRupiah(item.subtotal)}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  width={"100%"}
                  justifyContent="space-between"
                  alignItems="center"
                  mt={1}
                >
                  <Typography fontSize={14} color="#000">
                    {item.quantity} Kg
                  </Typography>
                </Box>
              </Box>
            ))}
          </List>

          {details.length === 0 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
              gap={2}
            >
              <Lottie
                animationData={emptyCartAnimation}
                style={{ width: 200, height: 200 }}
              />
              <Typography
                color="#959595"
                fontSize={14}
                fontWeight={600}
                textAlign={"center"}
              >
                Wah, keranjang kosong. Silakan pilih transaksi lain!
              </Typography>
            </Box>
          )}
        </Box>

        <Divider />

        <Box p={2}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
              mb: 2,
              borderColor: "#003049",
              color: "#003049",
            }}
            onClick={() => setPaymentDialogOpen(true)}
            disabled={transaction?.isHasPayment || details.length === 0}
          >
            Pilih Metode Pembayaran
          </Button>

          <Box display="flex" justifyContent="space-between" fontWeight="bold" mb={2}>
            <Typography
              variant="subtitle1"
              color="#000"
              fontWeight={600}
              fontSize={20}
            >
              Total
            </Typography>
            <Typography
              variant="subtitle1"
              color="#000"
              fontWeight={600}
              fontSize={20}
            >
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
              onClick={handleCetakStruk}
              disabled={details.length === 0}
            >
              Cetak Struk
            </Button>
            {!transaction?.isHasPayment && (
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
                disabled={
                  paymentMethod === "" 
                }
              >
                Pembayaran
              </Button>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Full Screen Payment Dialog */}
      <Dialog
        fullScreen
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#003049",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Metode Pembayaran
          <IconButton 
            color="inherit"
            onClick={() => setPaymentDialogOpen(false) 
            }
            disabled={
              paymentMethod === "" 
            }
           >
            Save
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} pt={2}>
            {/* Payment Method Tabs */}
            <Stack direction="row" spacing={2} pb={1}>
              {["Card", "Cash", "Qris"].map((method) => (
                <Button
                  key={method}
                  variant={paymentMethod === method ? "contained" : "outlined"}
                  onClick={() => setPaymentMethod(method)}
                  sx={{
                    textTransform: "capitalize",
                    width: "100%",
                    height: "80px",
                    bgcolor: paymentMethod === method ? "#00225C" : "#B8B8B8",
                    color: "white",
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

            {/* Card Payment */}
            {paymentMethod === "Card" && (
              <>
                <Stack direction="row" spacing={1}>
                  {["MasterCard", "Visa", "AmericanExpress", "Discover"].map((type) => (
                    <Box
                      key={type}
                      onClick={() => setSelectedCard(type)}
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
                      sx={{ cursor: "pointer" }}
                    >
                      <img
                        src={`/${type.toLowerCase()}.svg`}
                        alt={type}
                        width={70}
                        height={70}
                      />
                    </Box>
                  ))}
                </Stack>

                <TextField
                  label="Cardholder Name"
                  fullWidth
                  value={cardInfo.name}
                  onChange={(e) => handleCardInfoChange("name", e.target.value)}
                />
                <TextField
                  type="tel"
                  inputMode="numeric"
                  label="Card Number"
                  fullWidth
                  value={cardInfo.number}
                  onChange={(e) => handleCardInfoChange("number", e.target.value)}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Expiration Date"
                    fullWidth
                    value={cardInfo.expiry}
                    onChange={(e) => handleCardInfoChange("expiry", e.target.value)}
                  />
                  <TextField
                    type="tel"
                    inputMode="numeric"
                    label="CVV"
                    fullWidth
                    value={cardInfo.cvv}
                    onChange={(e) => handleCardInfoChange("cvv", e.target.value)}
                  />
                </Stack>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cardInfo.save || false}
                      onChange={(e) =>
                        handleCardInfoChange("save", e.target.checked)
                      }
                    />
                  }
                  sx={{ color: "#00225C" }}
                  label="Save credit card information"
                />
              </>
            )}

            {/* Cash */}
            {paymentMethod === "Cash" && (
              <CurrencyInput />
            )}

            {/* QRIS */}
            {paymentMethod === "Qris" && (
              <Box display="flex" justifyContent="center">
                <img
                  src="/qris.png"
                  alt="QRIS Payment"
                  style={{ maxWidth: "40%", height: "auto" }}
                />
              </Box>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
