// MainContent.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Chip,
  Paper,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { formatRupiah } from "@/utils/helper";
import { useTransaction } from "@/context/useEtalase";
import { getTransactionDetail, getListTransaction } from "@/services/pos";

export default function MainContent({ nav_width, cart_width, setShowCartSidebar, shouldRefresh, setShouldRefresh }) {
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [allOrders, setAllOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingDetailId, setLoadingDetailId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollContainerRef = useRef(null);

  const { data, isLoading } = useTransaction(page);

  const formatWIBTime = (isoString) => {
    const date = new Date(isoString);
    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    };
    const optionsDate = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    };
    const timePart = date.toLocaleTimeString("id-ID", optionsTime);
    const datePart = date.toLocaleDateString("id-ID", optionsDate);
    return `${timePart} WIB, ${datePart}`;
  };

  const fetchFreshTransaction = async () => {
    try {
      setIsRefreshing(true);
      const freshData = await getListTransaction({ page: 1 });
      const mapped = (freshData?.data || []).map((tx) => ({
        id: tx.id,
        items: 1,
        name: tx.customer_name,
        phone_number: tx.phone_number,
        time: formatWIBTime(tx.date_in),
        total: tx.total_price,
        isHasPaid: tx.isHasPayment,
        status: tx.status === "pending" ? "Pending" : "Finished",
      }));
      setAllOrders(mapped);
      setPage(1);
      setHasMore(true);
    } catch (err) {
      console.error("Gagal pull to refresh:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!data) return;
    const mapped = data.map((tx) => ({
      id: tx.id,
      items: 1,
      name: tx.customer_name,
      phone_number: tx.phone_number,
      time: formatWIBTime(tx.date_in),
      total: tx.total_price,
      isHasPaid: tx.isHasPayment,
      status: tx.status === "pending" ? "Pending" : "Finished",
    }));

    if (page === 1) {
      setAllOrders(mapped);
      setHasMore(true);
    } else if (mapped.length > 0) {
      setAllOrders((prev) => [...prev, ...mapped]);
    } else {
      setHasMore(false);
    }
  }, [data, page]);

  useEffect(() => {
    if (shouldRefresh) {
      fetchFreshTransaction();
      setShouldRefresh(false);
    }
  }, [shouldRefresh, setShouldRefresh]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300;
      if (nearBottom && hasMore && !isLoading) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  const handleSelectOrder = async (order) => {
    try {
      setLoadingDetailId(order.id);
      const res = await getTransactionDetail(order.id);
      if (res && res.data) {
        setShowCartSidebar(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil detail transaksi:", err);
    } finally {
      setLoadingDetailId(null);
    }
  };

  const filteredOrders =
    value === 0
      ? allOrders
      : allOrders.filter((order) =>
          value === 1
            ? order.status === "Pending"
            : order.status === "Finished"
        );

  return (
    <Box sx={{
      marginLeft: nav_width,
      marginRight: cart_width,
      overflow: "hidden",
      bgcolor: "#FAFAFA",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    }}>
      <Box sx={{
        position: "sticky",
        top: 0,
        bgcolor: "#FAFAFA",
        zIndex: 1,
        p: 4,
        pb: 0,
      }}>
        <Tabs value={value} onChange={(e, v) => setValue(v)} sx={{ mb: 2 }}>
          <Tab label="Semua" value={0} sx={{ textTransform: "capitalize", fontSize: "16px" }} />
          <Tab label="Pending" value={1} sx={{ textTransform: "capitalize", fontSize: "16px" }} />
          <Tab label="Selesai" value={2} sx={{ textTransform: "capitalize", fontSize: "16px" }} />
        </Tabs>
      </Box>

      <Box
        sx={{ flex: 1, overflowY: "auto", p: 4, pt: 0, mt: 1.5 }}
        ref={scrollContainerRef}
        onTouchStart={(e) => (scrollContainerRef.current._startY = e.touches[0].clientY)}
        onTouchEnd={(e) => {
          const endY = e.changedTouches[0].clientY;
          const diffY = endY - scrollContainerRef.current._startY;
          if (diffY > 50 && scrollContainerRef.current.scrollTop === 0) {
            fetchFreshTransaction();
          }
        }}
      >
        {isRefreshing && (
          <Typography textAlign="center" fontSize={14} color="gray" mb={2}>
            Memuat ulang data...
          </Typography>
        )}

        {filteredOrders.map((order) => (
          <Paper
            key={order.id}
            onClick={() => handleSelectOrder(order)}
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              mb: 2,
              py: 2,
              bgcolor: "#fff",
              color: "#000",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              opacity: loadingDetailId === order.id ? 0.6 : 1,
            }}
          >
            <Box>
              <Typography fontWeight="bold">Order #{order.id}</Typography>
              <Typography fontWeight="bold">Nama : {order.name} ({order.phone_number})</Typography>
              <Typography fontSize={14} pt={3}>Total Item <b>{order.items}</b></Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="body2">{order.time}</Typography>
              <Chip
                label={order.isHasPaid ? "Sudah Bayar" : "Belum Bayar"}
                sx={{
                  fontSize: 12,
                  bgcolor: order.isHasPaid ? "#38d46e" : "#FF0000",
                  color: "#fff",
                  height: 24,
                  borderRadius: "12px",
                  fontWeight: 600,
                }}
              />
              <Box display="flex" alignItems="center" gap={2} pt={3}>
                <Typography fontWeight="bold">{formatRupiah(order.total)}</Typography>
              </Box>
              {loadingDetailId === order.id && (
                <Box mt={1}>
                  <CircularProgress size={16} thickness={4} />
                </Box>
              )}
            </Box>
          </Paper>
        ))}

        {isLoading && [...Array(3)].map((_, index) => (
          <Paper
            key={`skeleton-${index}`}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              mb: 2,
              py: 2,
              bgcolor: "#fff",
              color: "#000",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Box>
              <Skeleton variant="text" width={120} height={24} />
              <Skeleton variant="text" width={100} height={20} sx={{ mt: 2 }} />
            </Box>
            <Box textAlign="right">
              <Skeleton variant="text" width={60} height={18} />
              <Box display="flex" justifyContent="flex-end" gap={1} pt={2}>
                <Skeleton variant="text" width={80} height={22} />
                <Skeleton variant="rounded" width={60} height={24} />
              </Box>
            </Box>
          </Paper>
        ))}

        {!hasMore && !isLoading && allOrders.length > 0 && (
          <Typography textAlign="center" py={2} color="gray">
            Semua data sudah ditampilkan.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
