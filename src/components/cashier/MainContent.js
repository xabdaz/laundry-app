"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Tab,
  Tabs,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useCartContext } from "@/context/CartContext";
import { formatRupiah } from "@/utils/helper";

// Mock data for laundry services
const laundryServices = [
  {
    id: 1,
    name: "Cuci Setrika",
    price: 10000,
    image: "laundry.jpg",
    category: "satuan-jas",
  },
  {
    id: 2,
    name: "Cuci Kering",
    price: 8000,
    image: "laundry.jpg",
    category: "satuan-jas",
  },
  {
    id: 3,
    name: "Setrika",
    price: 5000,
    image: "laundry.jpg",
    category: "satuan-jas",
  },
  {
    id: 4,
    name: "Cuci Kering 5 Kg",
    price: 25000,
    image: "laundry.jpg",
    category: "per-kg",
  },
  {
    id: 5,
    name: "Satuan Baju",
    price: 15000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 6,
    name: "Satuan Celana",
    price: 30000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 7,
    name: "Karpet Kecil",
    price: 40000,
    image: "laundry.jpg",
    category: "karpet",
  },
  {
    id: 8,
    name: "Karpet Besar",
    price: 80000,
    image: "laundry.jpg",
    category: "karpet",
  },
  {
    id: 9,
    name: "Gorden",
    price: 60000,
    image: "laundry.jpg",
    category: "gorden",
  },
  {
    id: 10,
    name: "Boneka Kecil",
    price: 25000,
    image: "laundry.jpg",
    category: "boneka",
  },
  {
    id: 11,
    name: "Boneka Besar",
    price: 50000,
    image: "laundry.jpg",
    category: "boneka",
  },
  {
    id: 12,
    name: "Jas",
    price: 45000,
    image: "laundry.jpg",
    category: "satuan-jas",
  },
  {
    id: 13,
    name: "Selimut Tipis",
    price: 30000,
    image: "laundry.jpg",
    category: "selimut",
  },
  {
    id: 14,
    name: "Selimut Tebal",
    price: 50000,
    image: "laundry.jpg",
    category: "selimut",
  },
  {
    id: 15,
    name: "Bed Cover Kecil",
    price: 40000,
    image: "laundry.jpg",
    category: "bedcover",
  },
  {
    id: 16,
    name: "Bed Cover Besar",
    price: 70000,
    image: "laundry.jpg",
    category: "bedcover",
  },
  {
    id: 17,
    name: "Sprei Single",
    price: 15000,
    image: "laundry.jpg",
    category: "sprei",
  },
  {
    id: 18,
    name: "Sprei Double",
    price: 25000,
    image: "laundry.jpg",
    category: "sprei",
  },
  {
    id: 19,
    name: "Bantal",
    price: 10000,
    image: "laundry.jpg",
    category: "per-item",
  },
  {
    id: 20,
    name: "Guling",
    price: 12000,
    image: "laundry.jpg",
    category: "per-item",
  },
  {
    id: 21,
    name: "Handuk Kecil",
    price: 8000,
    image: "laundry.jpg",
    category: "handuk",
  },
  {
    id: 22,
    name: "Handuk Besar",
    price: 15000,
    image: "laundry.jpg",
    category: "handuk",
  },
  {
    id: 23,
    name: "Jaket Biasa",
    price: 25000,
    image: "laundry.jpg",
    category: "jaket",
  },
  {
    id: 24,
    name: "Jaket Kulit",
    price: 60000,
    image: "laundry.jpg",
    category: "jaket",
  },
  {
    id: 25,
    name: "Sarung",
    price: 10000,
    image: "laundry.jpg",
    category: "per-item",
  },
  {
    id: 26,
    name: "Mukena",
    price: 12000,
    image: "laundry.jpg",
    category: "per-item",
  },
  {
    id: 27,
    name: "Kebaya",
    price: 55000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 28,
    name: "Blazer",
    price: 35000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 29,
    name: "Kaos",
    price: 7000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 30,
    name: "Jeans",
    price: 15000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 31,
    name: "Rok Pendek",
    price: 12000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 32,
    name: "Rok Panjang",
    price: 16000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 33,
    name: "Celana Dalam",
    price: 3000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 34,
    name: "Kaos Dalam",
    price: 4000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 35,
    name: "Cuci Boneka Kecil",
    price: 20000,
    image: "laundry.jpg",
    category: "boneka",
  },
  {
    id: 36,
    name: "Cuci Boneka Besar",
    price: 45000,
    image: "laundry.jpg",
    category: "boneka",
  },
  {
    id: 37,
    name: "Setrika Baju",
    price: 6000,
    image: "laundry.jpg",
    category: "setrika",
  },
  {
    id: 38,
    name: "Setrika Celana",
    price: 7000,
    image: "laundry.jpg",
    category: "setrika",
  },
  {
    id: 39,
    name: "Jas Hujan",
    price: 20000,
    image: "laundry.jpg",
    category: "satuan-jas",
  },
  {
    id: 40,
    name: "Dasi",
    price: 5000,
    image: "laundry.jpg",
    category: "per-item",
  },
  {
    id: 41,
    name: "Topi",
    price: 7000,
    image: "laundry.jpg",
    category: "per-item",
  },
  {
    id: 42,
    name: "Sarung Tangan",
    price: 4000,
    image: "laundry.jpg",
    category: "per-item",
  },
  {
    id: 43,
    name: "Sepatu Kain",
    price: 25000,
    image: "laundry.jpg",
    category: "sepatu",
  },
  {
    id: 44,
    name: "Sepatu Kulit",
    price: 35000,
    image: "laundry.jpg",
    category: "sepatu",
  },
  {
    id: 45,
    name: "Tas Sekolah",
    price: 30000,
    image: "laundry.jpg",
    category: "tas",
  },
  {
    id: 46,
    name: "Tas Kulit",
    price: 50000,
    image: "laundry.jpg",
    category: "tas",
  },
  {
    id: 47,
    name: "Jaket Gunung",
    price: 70000,
    image: "laundry.jpg",
    category: "jaket",
  },
  {
    id: 48,
    name: "Cuci Helm",
    price: 20000,
    image: "laundry.jpg",
    category: "aksesoris",
  },
  {
    id: 49,
    name: "Cuci Jas Almamater",
    price: 30000,
    image: "laundry.jpg",
    category: "satuan-jas",
  },
  {
    id: 50,
    name: "Cuci Gaun",
    price: 75000,
    image: "laundry.jpg",
    category: "satuan-pakaian",
  },
  {
    id: 51,
    name: "Cuci Taplak Meja",
    price: 15000,
    image: "laundry.jpg",
    category: "lainnya",
  },
  {
    id: 52,
    name: "Cuci Bantal Sofa",
    price: 20000,
    image: "laundry.jpg",
    category: "lainnya",
  },
];

export default function MainContent({ nav_width, cart_width }) {
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCartContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter services based on search query and selected tab
  const filteredServices = laundryServices.filter((service) => {
    // Filter by search query
    const matchesSearch = service.name.toLowerCase().includes(searchQuery);

    // Filter by selected tab
    let matchesTab = true;
    switch (value) {
      case 1: // Satuan Jas
        matchesTab = service.category === "satuan-jas";
        break;
      case 2: // Satuan Pakaian
        matchesTab = service.category === "satuan-pakaian";
        break;
      case 3: // Per Kg
        matchesTab = service.category === "per-kg";
        break;
      default: // All
        matchesTab = true;
    }

    return matchesSearch && matchesTab;
  });

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
      {/* Sticky Header (Search + Tabs) */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "#FAFAFA",
          zIndex: 1,
          p: 4,
          pb: 0,
        }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            mb: 2,
          }}
          onSubmit={(e) => e.preventDefault()} // Prevent form submission
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <FiSearch />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Paper>

        <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
          <Tab
            label="Semua"
            value={0}
            sx={{ textTransform: "capitalize", fontSize: "16px" }}
          />
          <Tab
            label="Satuan Jas"
            value={1}
            sx={{ textTransform: "capitalize", fontSize: "16px" }}
          />
          <Tab
            label="Satuan Pakaian"
            value={2}
            sx={{ textTransform: "capitalize", fontSize: "16px" }}
          />
          <Tab
            label="Per Kg"
            value={3}
            sx={{ textTransform: "capitalize", fontSize: "16px" }}
          />
        </Tabs>
      </Box>

      {/* Scrollable Grid Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 4,
          pt: 0,
        }}>
        {filteredServices.length === 0 ? (
          <Typography
            variant="h6"
            textAlign="center"
            mt={35}
            fontWeight={500}
            color="#9E9E9E">
            Tidak ada layanan yang ditemukan
          </Typography>
        ) : (
          <Grid container spacing={1.5}>
            {filteredServices.map((service) => (
              <Grid
                item
                width={"32%"}
                key={service.id}
                onClick={() => addItem(service)}>
                <Card sx={{ cursor: "pointer" }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <img
                      src={service.image}
                      alt={service.name}
                      style={{
                        width: 150,
                        height: 150,
                        objectFit: "contain",
                        margin: "auto",
                        backgroundColor: "white",
                      }}
                    />
                    <Typography fontWeight="bold" fontSize={16} mt={2}>
                      {formatRupiah(service.price)}
                    </Typography>
                    <Typography variant="h6" fontSize={16} fontWeight={500}>
                      {service.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
