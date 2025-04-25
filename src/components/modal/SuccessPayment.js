"use client";

import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import Lottie from "lottie-react";
import successAnimation from "../../../public/animation/success.json";

export default function SuccessPayment({
  open,
  onClose,
  message = "Success!",
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "rgba(255, 255, 255, 0.85)", // bright overlay
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}>
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: 4,
            padding: 4,
            boxShadow: 3,
            textAlign: "center",
            maxWidth: 400,
            width: "90%",
          }}>
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ height: 150 }}
          />
          <Typography variant="h6" mt={2} color="success.main">
            {message}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
