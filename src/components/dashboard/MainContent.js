"use client";

import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography, Chip, Paper } from "@mui/material";
import { formatRupiah } from "@/utils/helper";
import { getUserProfile } from '@/services/pos';

const orders = [
  { id: 240, items: 1, time: "17:00", total: 34298, status: "Finished" },
  { id: 241, items: 6, time: "17:03", total: 47829, status: "Pending" },
];

export default function MainContent({ nav_width, cart_width }) {
  const [value, setValue] = useState(0);

  const [user, setUser] = useState(null)

  useEffect(() => {
    getUserProfile()
      .then(setUser)
      .catch(err => console.error('Failed to load profile:', err))
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Filter logic based on tab
  const filteredOrders =
    value === 0
      ? orders
      : orders.filter((order) =>
          value === 1 ? order.status === "Pending" : order.status === "Finished"
        );

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
      {/* Sticky Header (Tabs) */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "#FAFAFA",
          zIndex: 1,
          p: 4,
          pb: 0,
        }}>
        <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
          <Tab
            label="Semua"
            value={0}
            sx={{ textTransform: "capitalize", fontSize: "16px" }}
          />
          <Tab
            label="Pending"
            value={1}
            sx={{ textTransform: "capitalize", fontSize: "16px" }}
          />
          <Tab
            label="Selesai"
            value={2}
            sx={{ textTransform: "capitalize", fontSize: "16px" }}
          />
        </Tabs>
      </Box>

      {/* Orders Content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 4, pt: 0, mt: 2.5 }}>
        {filteredOrders.map((order) => (
          <Paper
            key={order.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              mb: 2,
              py: 2,
              bgcolor: "#fff",
              color: "#000",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}>
            <Box>
              <Typography fontWeight="bold">Order #{order.id}</Typography>
              <Typography fontSize={14} pt={3}>
                Total Item <b>{order.items}</b>
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="body2">{order.time}</Typography>
              <Box display={"flex"} alignItems={"center"} gap={2} pt={3}>
                <Typography fontWeight={"bold"}>
                  {formatRupiah(order.total)}
                </Typography>
                <Chip
                  label={order.status}
                  sx={{
                    fontSize: 12,
                    bgcolor: order.status === "Pending" ? "#FFD700" : "#38d46e",
                    color: "#fff",
                    height: 24,
                    borderRadius: "12px",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
