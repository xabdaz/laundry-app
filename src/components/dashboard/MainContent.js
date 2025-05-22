// "use client";

// import { useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// // Mock data transaksi
// const mockTransactions = [
//   { id: 1, amount: 20000, date: "2025-05-02" }, // Minggu 1
//   { id: 2, amount: 30000, date: "2025-05-03" },
//   { id: 3, amount: 15000, date: "2025-05-08" }, // Minggu 2
//   { id: 4, amount: 50000, date: "2025-05-10" },
//   { id: 5, amount: 10000, date: "2025-05-15" }, // Minggu 3
//   { id: 6, amount: 25000, date: "2025-05-16" },
//   { id: 7, amount: 40000, date: "2025-05-21" }, // Minggu 4
//   { id: 8, amount: 60000, date: "2025-05-23" },
// ];

// function groupByWeek(transactions) {
//   const result = [0, 0, 0, 0]; // week1 to week4

//   transactions.forEach((tx) => {
//     const day = new Date(tx.date).getDate();
//     if (day <= 7) result[0] += tx.amount;
//     else if (day <= 14) result[1] += tx.amount;
//     else if (day <= 21) result[2] += tx.amount;
//     else result[3] += tx.amount;
//   });

//   return [
//     { week: "Minggu 1", amount: result[0] },
//     { week: "Minggu 2", amount: result[1] },
//     { week: "Minggu 3", amount: result[2] },
//     { week: "Minggu 4", amount: result[3] },
//   ];
// }

// export default function MainContent({ nav_width, cart_width }) {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const grouped = groupByWeek(mockTransactions);
//     setChartData(grouped);
//   }, []);

//   return (
//     <Box
//       sx={{
//         marginLeft: nav_width,
//         marginRight: cart_width,
//         overflow: "hidden",
//         bgcolor: "#FAFAFA",
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
//         p: 4,
//       }}
//     >
//       <Typography variant="h5" fontWeight="bold" mb={4}>
//         Grafik Total Transaksi Bulan Ini
//       </Typography>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="week" />
//           <YAxis />
//           <Tooltip formatter={(value) => `Rp${value.toLocaleString("id-ID")}`} />
//           <Bar dataKey="amount" fill="#38d46e" radius={[8, 8, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </Box>
//   );
// }

// file: app/pos/page.tsx (Next.js 13+ with App Router)
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Divider
} from "@mui/material";
import { getProductByEtalase } from "@/services/pos";

export default function POSTablePage({ nav_width, cart_width }) {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProductByEtalase("").then((data) => {
      setServices(data);
    });
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getProductByEtalase(search).then((data) => {
        setServices(data);
      });
    }, 400); // debounce 400ms

    return () => clearTimeout(delayDebounce);
  }, [search]);

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
        p: 4,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>POS Laundry</Typography>

      <TextField
        fullWidth
        placeholder="Cari layanan..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {services.map((item) => (
          <Grid item xs={6} md={4} lg={3} key={item.id}>
            <Paper
              sx={{ p: 2, cursor: "pointer", textAlign: "center", height: "100%" }}
              onClick={() => alert(`Pilih: ${item.name}`)}
            >
              <Typography fontWeight="bold" fontSize={16} mb={1}>{item.name}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography fontSize={14} color="text.secondary">Kategori: {item.category}</Typography>
              <Typography fontSize={14} color="text.secondary">Tipe: {item.type}</Typography>
              <Typography fontSize={14} color="text.secondary">
                Delivery: Rp{item.price_delivery_per_kg.toLocaleString("id-ID")}/kg
              </Typography>
              <Typography fontSize={12} mt={1} color="gray">
                Dibuat: {new Date(item.created_at).toLocaleDateString("id-ID")}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}