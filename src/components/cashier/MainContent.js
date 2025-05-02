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
  Skeleton,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useCartContext } from "@/context/CartContext";
import { formatRupiah } from "@/utils/helper";
import { useEtalase } from "@/context/useEtalase"; // pakai custom hook


export default function MainContent({ nav_width, cart_width }) {
  const { data: fetchDataEtalase = [], isLoading } = useEtalase();//TODO: change to loadingEtalase

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [products, setProducts] = useState([]);
  const { addItem } = useCartContext();

  useEffect(() => {
    if (!isLoading && fetchDataEtalase.length > 0) {
      fetchProductByEtalase(0); // otomatis fetch product untuk tab pertama (Semua)
    }
  }, [isLoading, fetchDataEtalase]);

  const fetchProductByEtalase = async (tabIndex) => {
    setLoadingProduct(true);
    try {
      // const selectedCategory = tabIndex === 0 ? null : fetchData[tabIndex - 1]?.name;
  
      // const res = await fetch("/api/pos/products");
      // const allProducts = await res.json();
  
      // const filtered = selectedCategory
      //   ? allProducts.filter((p) => p.category === selectedCategory)
      //   : allProducts;
  
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (tabIndex == 4) {
        setProducts(laundryServicesOffline); // atau data berdasarkan tab
      } else if (tabIndex == 5) {
        setProducts(laundryServicesoOnline); // atau data berdasarkan tab
      }
      console.log(tabIndex, "index cok")
    } catch (error) {
      console.error("Failed to fetch product", error);
      setProducts([]);
    } finally {
      setLoadingProduct(false);
    }
  };
  const laundryServicesoOnline = [
    {
      id: 1,
      name: "Cuci Setrika Express 6 Jam",
      price: 20000,
      eta_duration: 6,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 2,
      name: "Cuci Setrika Express 24 Jam",
      price: 10000,
      eta_duration: 6,
      price_delivery_perKg: 2000,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 3,
      name: "Cuci Setrika Regular 2/3 Hari",
      price: 7000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 4,
      name: "Cuci Lipat Express 6 Jam",
      price: 15000,
      eta_duration: 6,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 5,
      name: "Cuci Lipat Express 24 Jam",
      price: 7000,
      eta_duration: 24,
      price_delivery_perKg: 1000,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 6,
      name: "[Offline] Cuci Lipat Regular 2/3 Hari",
      price: 5000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 7,
      name: "[Offline] Setrika Express 6 Jam",
      price: 5000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 8,
      name: "[Offline] Setrika Express 24 Jam",
      price: 5000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 9,
      name: "[Offline] Setrika Regular 2/3 Hari",
      price: 5000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 10,
      name: "[Offline] Paket Hemat 5Kg",
      price: 20000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    }
  ];

  const laundryServicesOffline = [
    {
      id: 1,
      name: "[Offline] Cuci Setrika Express 6 Jam",
      price: 20000,
      eta_duration: 6,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 2,
      name: "[Offline] Cuci Express 24 Jam",
      price: 10000,
      eta_duration: 6,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 3,
      name: "[Offline] Cuci Setrika Regular 2/3 Hari",
      price: 7000,
      eta_duration: 6,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 4,
      name: "[Offline] Cuci Lipat Express 6 Jam",
      price: 17000,
      eta_duration: 6,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 5,
      name: "[Offline] Cuci Lipat Express 24 Jam",
      price: 7000,
      eta_duration: 24,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 6,
      name: "[Offline] Cuci Lipat Regular 2/3 Hari",
      price: 5000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 7,
      name: "[Offline] Setrika Express 6 Jam",
      price: 5000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 8,
      name: "[Offline] Setrika Express 24 Jam",
      price: 5000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 9,
      name: "[Offline] Setrika Regular 2/3 Hari",
      price: 5000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    },
    {
      id: 10,
      name: "[Offline] Paket Hemat 5Kg",
      price: 20000,
      eta_duration: 48,
      price_delivery_perKg: 0,
      image: "laundry.jpg",
      category: "kiloan",
    }
  ];
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchProductByEtalase(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredServices = fetchDataEtalase.filter((service) => {
    const matchesSearch = service.name?.toLowerCase().includes(searchQuery);
    if (value === 0) return matchesSearch; // Semua
    const selectedCategory = fetchDataEtalase[value - 1]?.name;
    return matchesSearch && service.name === selectedCategory;
  });

  const filteredServicesProduct = products.filter((service) =>
    service.name?.toLowerCase().includes(searchQuery)
  );

  const ShimmerTabs = () => (
    <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
      {[...Array(4)].map((_, index) => (
        <Tab
          key={index}
          label={<Skeleton width={100} height={30} />}
          disabled
          sx={{ textTransform: "capitalize", fontSize: "16px" }}
        />
      ))}
    </Tabs>
  );

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
      {/* Header Search + Tabs */}
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

        {isLoading ? (
          <ShimmerTabs />
        ) : (
          <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
            <Tab label="Semua" value={0} sx={{ textTransform: "capitalize", fontSize: "16px" }} />
            {fetchDataEtalase.map((item, index) => (
              <Tab
                key={item.id}
                label={item.name}
                value={item.id}
                sx={{ textTransform: "capitalize", fontSize: "16px" }}
              />
            ))}
          </Tabs>
        )}
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 4,
          pt: 0,
        }}>
        {loadingProduct ? (
          <Grid container spacing={1.5}>
            {[...Array(6)].map((_, index) => (
              <Grid item width={"32%"} key={index}>
                <ShimmerCard />
              </Grid>
            ))}
          </Grid>
        ) : filteredServicesProduct.length === 0 ? (
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
            {filteredServicesProduct.map((service) => (
              <Grid
                item
                width={"32%"}
                key={service.id}
                onClick={() => addItem(service)}>
                <Card sx={{ cursor: "pointer" }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <img
                      src={"laundry.jpg"} // dummy default image
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
                      {formatRupiah(service.price+service.price_delivery_perKg)}
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
