"use client";

import React, { useState, useEffect } from "react";
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
];

export default function MainContent({ nav_width, cart_width }) {
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredServices = laundryServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery);
    let matchesTab = true;
    switch (value) {
      case 1:
        matchesTab = service.category === "satuan-jas";
        break;
      case 2:
        matchesTab = service.category === "satuan-pakaian";
        break;
      case 3:
        matchesTab = service.category === "per-kg";
        break;
      case 4:
        matchesTab = service.category === "per-kk";
        break;
      default:
        matchesTab = true;
    }
    return matchesSearch && matchesTab;
  });

  const ShimmerCard = () => (
    <Card sx={{ cursor: "pointer", height: 250, backgroundColor: "#eee" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Box
          sx={{
            width: 150,
            height: 150,
            margin: "auto",
            backgroundColor: "#ddd",
            borderRadius: 2,
          }}
        />
        <Typography mt={2} sx={{ bgcolor: "#ddd", width: "60%", height: 20, margin: "10px auto", borderRadius: 1 }} />
        <Typography sx={{ bgcolor: "#ddd", width: "80%", height: 20, margin: "auto", borderRadius: 1 }} />
      </CardContent>
    </Card>
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
          onSubmit={(e) => e.preventDefault()}
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
          <Tab label="Semua" value={0} sx={{ textTransform: "capitalize", fontSize: "16px" }} />
          <Tab label="Satuan Jas" value={1} sx={{ textTransform: "capitalize", fontSize: "16px" }} />
          <Tab label="Satuan Pakaian" value={2} sx={{ textTransform: "capitalize", fontSize: "16px" }} />
          <Tab label="Per Kg" value={3} sx={{ textTransform: "capitalize", fontSize: "16px" }} />
        </Tabs>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 4,
          pt: 0,
        }}>
        {loading ? (
          <Grid container spacing={1.5}>
            {[...Array(6)].map((_, index) => (
              <Grid item width={"32%"} key={index}>
                <ShimmerCard />
              </Grid>
            ))}
          </Grid>
        ) : filteredServices.length === 0 ? (
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
