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
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import { getProductByEtalase, getVariantByProduct } from "@/services/pos";
import { useCartContext } from "@/context/CartContext";

// Transition untuk Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function POSTablePage({ nav_width, cart_width }) {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [isVariantVisible, setOpenVariant] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [loadingVariant, setLoadingVariant] = useState(false);

  const { addItem } = useCartContext();

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
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleOpenVariant = async (product) => {
    setSelectedProduct(product);
    setLoadingVariant(true);
    try {
      const data = await getVariantByProduct(product.id);
      setVariants(data);
    } catch (error) {
      console.error("Error fetching variants:", error);
      setVariants([]);
    } finally {
      setLoadingVariant(false);
      setOpenVariant(true);
    }
  };

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
      <Typography variant="h5" fontWeight="bold" mb={2}>
        POS Laundry
      </Typography>

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
              onClick={() => handleOpenVariant(item)}
            >
              <Typography fontWeight="bold" fontSize={16} mb={1}>
                {item.name}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography fontSize={14} color="text.secondary">
                Kategori: {item.category}
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                Tipe: {item.type}
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                Delivery: Rp
                {item.price_delivery_per_kg.toLocaleString("id-ID")}/kg
              </Typography>
              <Typography fontSize={12} mt={1} color="gray">
                Dibuat: {new Date(item.created_at).toLocaleDateString("id-ID")}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog Detail Variant */}
      <Dialog
        fullScreen
        open={isVariantVisible}
        onClose={() => setOpenVariant(false)}
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
          {selectedProduct?.name || "Laundry Variant"}
          <IconButton
            color="inherit"
            onClick={() => setOpenVariant(false)}
            edge="end"
          >
            ✖
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {loadingVariant ? (
            <Stack alignItems="center" py={4}>
              <CircularProgress />
              <Typography mt={2}>Memuat varian...</Typography>
            </Stack>
          ) : (
            <Stack spacing={2} pt={2}>
              {variants.length === 0 ? (
                <Typography>Tidak ada varian tersedia.</Typography>
              ) : (
                variants.map((variant) => (
                  <Paper
                    key={variant.id}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2, 
                      p: 2, 
                      mb: 1,
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      let service = {
                        id: variant.id,
                        name: `[${selectedProduct.name}] ${variant.name}`,
                        price: variant.price,
                        eta_duration: variant.eta_duration,
                        price_delivery_perKg: variant.price_delivery_per_kg,
                        image: variant.image_url,
                        category: selectedProduct.category,
                        minimum_purchase: variant.minimum,
                        minimum_price: variant.minimum*variant.price,
                      };
                      addItem(service);
                      setOpenVariant(false);
                    }}
                  >
                    {/* Image di kiri */}
                    <img
                      src={variant.image_url}
                      alt={variant.name}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 8,
                        backgroundColor: "white",
                      }}
                    />
                
                    {/* Konten di kanan */}
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight="bold">{variant.name}</Typography>
                      <Typography fontSize={14} color="text.secondary">
                        Harga: Rp{variant.price.toLocaleString("id-ID")} / {variant.unit_label}
                      </Typography>
                      <Typography fontSize={12} color="gray">
                        Estiamsi: {variant.eta_duration>23 ? Math.ceil(variant.eta_duration / 24) : variant.eta_duration} { variant.eta_duration<24 ? "Jam" : "hari" }
                      </Typography>
                    </Box>
                  </Paper>
                ))
                
              )}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
