"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs, Typography, Chip, Paper } from "@mui/material";
import { formatRupiah } from "@/utils/helper";

const orders = [
  { id: 240, items: 1, time: "17:00", total: 34298, status: "Finished" },
  { id: 241, items: 6, time: "17:03", total: 47829, status: "Pending" },
  { id: 242, items: 4, time: "17:06", total: 113203, status: "Pending" },
  { id: 243, items: 5, time: "17:09", total: 113391, status: "Pending" },
  { id: 244, items: 6, time: "17:12", total: 82044, status: "Finished" },
  { id: 245, items: 1, time: "17:15", total: 44774, status: "Finished" },
  { id: 246, items: 5, time: "17:18", total: 53791, status: "Finished" },
  { id: 247, items: 4, time: "17:21", total: 70857, status: "Pending" },
  { id: 248, items: 6, time: "17:24", total: 66062, status: "Pending" },
  { id: 249, items: 4, time: "17:27", total: 71613, status: "Finished" },
  { id: 250, items: 6, time: "17:30", total: 87824, status: "Pending" },
  { id: 251, items: 5, time: "17:33", total: 93444, status: "Finished" },
  { id: 252, items: 1, time: "17:36", total: 72782, status: "Pending" },
  { id: 253, items: 6, time: "17:39", total: 32710, status: "Finished" },
  { id: 254, items: 3, time: "17:42", total: 75245, status: "Pending" },
  { id: 255, items: 5, time: "17:45", total: 104195, status: "Pending" },
  { id: 256, items: 3, time: "17:48", total: 99789, status: "Finished" },
  { id: 257, items: 2, time: "17:51", total: 79985, status: "Pending" },
  { id: 258, items: 4, time: "17:54", total: 71261, status: "Finished" },
  { id: 259, items: 4, time: "17:57", total: 111771, status: "Pending" },
  { id: 260, items: 4, time: "18:00", total: 32894, status: "Finished" },
  { id: 261, items: 4, time: "18:03", total: 39126, status: "Pending" },
  { id: 262, items: 4, time: "18:06", total: 68180, status: "Pending" },
  { id: 263, items: 5, time: "18:09", total: 61117, status: "Pending" },
  { id: 264, items: 5, time: "18:12", total: 91184, status: "Finished" },
  { id: 265, items: 6, time: "18:15", total: 63690, status: "Pending" },
  { id: 266, items: 3, time: "18:18", total: 55727, status: "Finished" },
  { id: 267, items: 3, time: "18:21", total: 106309, status: "Pending" },
  { id: 268, items: 4, time: "18:24", total: 108984, status: "Pending" },
  { id: 269, items: 1, time: "18:27", total: 50655, status: "Finished" },
  { id: 270, items: 2, time: "18:30", total: 115273, status: "Pending" },
  { id: 271, items: 6, time: "18:33", total: 96541, status: "Finished" },
  { id: 272, items: 3, time: "18:36", total: 98337, status: "Finished" },
  { id: 273, items: 4, time: "18:39", total: 112157, status: "Pending" },
  { id: 274, items: 2, time: "18:42", total: 78032, status: "Pending" },
  { id: 275, items: 5, time: "18:45", total: 71064, status: "Pending" },
  { id: 276, items: 4, time: "18:48", total: 115001, status: "Pending" },
  { id: 277, items: 4, time: "18:51", total: 66683, status: "Pending" },
  { id: 278, items: 6, time: "18:54", total: 91118, status: "Finished" },
  { id: 279, items: 2, time: "18:57", total: 114312, status: "Finished" },
  { id: 280, items: 3, time: "19:00", total: 49138, status: "Finished" },
  { id: 281, items: 4, time: "19:03", total: 111260, status: "Finished" },
  { id: 282, items: 2, time: "19:06", total: 73488, status: "Pending" },
  { id: 283, items: 5, time: "19:09", total: 59811, status: "Finished" },
  { id: 284, items: 2, time: "19:12", total: 103280, status: "Finished" },
  { id: 285, items: 2, time: "19:15", total: 38933, status: "Finished" },
  { id: 286, items: 2, time: "19:18", total: 64906, status: "Finished" },
  { id: 287, items: 4, time: "19:21", total: 38363, status: "Pending" },
  { id: 288, items: 6, time: "19:24", total: 68989, status: "Pending" },
  { id: 289, items: 3, time: "19:27", total: 97887, status: "Pending" },
];

export default function MainContent({ nav_width, cart_width }) {
  const [value, setValue] = useState(0);

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
