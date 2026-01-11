"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  InputAdornment,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import {
  getAllServices,
  deleteService,
  getAllVariantsByService,
} from "@/services/pos";
import ServiceFormDialog from "./ServiceFormDialog";
import VariantManageDialog from "./VariantManageDialog";

export default function MasterDataContent({ nav_width }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dialog states
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  const [selectedServiceForVariant, setSelectedServiceForVariant] = useState(null);

  // Expanded rows for showing variants
  const [expandedRows, setExpandedRows] = useState({});
  const [variantsData, setVariantsData] = useState({});
  const [loadingVariants, setLoadingVariants] = useState({});

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getAllServices();
      setServices(response.data || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = () => {
    setSelectedService(null);
    setServiceDialogOpen(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setServiceDialogOpen(true);
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus service ini?")) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (error) {
        console.error("Failed to delete service:", error);
        alert("Gagal menghapus service");
      }
    }
  };

  const handleManageVariants = (service) => {
    setSelectedServiceForVariant(service);
    setVariantDialogOpen(true);
  };

  const handleServiceDialogClose = (refresh = false) => {
    setServiceDialogOpen(false);
    setSelectedService(null);
    if (refresh) {
      fetchServices();
    }
  };

  const handleVariantDialogClose = (refresh = false) => {
    setVariantDialogOpen(false);
    setSelectedServiceForVariant(null);
    if (refresh) {
      // Refresh variants for the expanded service
      Object.keys(expandedRows).forEach((id) => {
        if (expandedRows[id]) {
          fetchVariantsForService(parseInt(id));
        }
      });
    }
  };

  const toggleRowExpand = async (serviceId) => {
    const isExpanded = expandedRows[serviceId];

    setExpandedRows((prev) => ({
      ...prev,
      [serviceId]: !isExpanded,
    }));

    if (!isExpanded && !variantsData[serviceId]) {
      await fetchVariantsForService(serviceId);
    }
  };

  const fetchVariantsForService = async (serviceId) => {
    setLoadingVariants((prev) => ({ ...prev, [serviceId]: true }));
    try {
      const response = await getAllVariantsByService(serviceId);
      setVariantsData((prev) => ({
        ...prev,
        [serviceId]: response.data || [],
      }));
    } catch (error) {
      console.error("Failed to fetch variants:", error);
    } finally {
      setLoadingVariants((prev) => ({ ...prev, [serviceId]: false }));
    }
  };

  const filteredServices = services.filter((service) =>
    service.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset page when search query changes
  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  // Paginated services
  const paginatedServices = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredServices.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredServices, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  return (
    <Box
      sx={{
        ml: nav_width,
        p: 3,
        height: "100vh",
        bgcolor: "#FAFAFA",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header - Fixed */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h5" fontWeight={600} color="#00225C">
          Master Data Service
        </Typography>
        <Button
          variant="contained"
          startIcon={<FiPlus />}
          onClick={handleAddService}
          sx={{
            bgcolor: "#00225C",
            "&:hover": { bgcolor: "#001a47" },
            textTransform: "none",
          }}
        >
          Tambah Service
        </Button>
      </Box>

      {/* Search & Info - Fixed */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <TextField
          placeholder="Cari service..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch color="#9e9e9e" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300, bgcolor: "white" }}
        />
        <Typography variant="body2" color="text.secondary">
          Total: {filteredServices.length} service
        </Typography>
      </Box>

      {/* Table - Scrollable */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5, flex: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 1,
              flex: 1,
              overflow: "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell width={50} sx={{ bgcolor: "#E1F0FC" }}></TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#00225C", bgcolor: "#E1F0FC" }}>
                    Nama Service
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#00225C", bgcolor: "#E1F0FC" }}>
                    Kategori
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#00225C", bgcolor: "#E1F0FC" }}>
                    Tipe
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#00225C", bgcolor: "#E1F0FC" }}>
                    Harga Delivery/Kg
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#00225C", bgcolor: "#E1F0FC" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#00225C", bgcolor: "#E1F0FC" }} align="center">
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedServices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                      <Typography color="text.secondary">
                        Tidak ada data service
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedServices.map((service) => (
                  <React.Fragment key={service.id}>
                    <TableRow hover>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => toggleRowExpand(service.id)}
                        >
                          {expandedRows[service.id] ? (
                            <MdExpandLess />
                          ) : (
                            <MdExpandMore />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.category || "-"}</TableCell>
                      <TableCell>{service.type || "-"}</TableCell>
                      <TableCell>
                        {formatCurrency(service.price_delivery_per_kg)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={service.is_active ? "Aktif" : "Nonaktif"}
                          size="small"
                          color={service.is_active ? "success" : "default"}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleManageVariants(service)}
                            sx={{
                              textTransform: "none",
                              borderColor: "#00225C",
                              color: "#00225C",
                            }}
                          >
                            Variant
                          </Button>
                          <IconButton
                            size="small"
                            onClick={() => handleEditService(service)}
                            sx={{ color: "#1976d2" }}
                          >
                            <FiEdit2 size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteService(service.id)}
                            sx={{ color: "#d32f2f" }}
                          >
                            <FiTrash2 size={18} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Variants Row */}
                    {expandedRows[service.id] && (
                      <TableRow>
                        <TableCell colSpan={7} sx={{ bgcolor: "#f5f5f5", p: 0 }}>
                          <Box sx={{ p: 2, pl: 6 }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              sx={{ mb: 1 }}
                            >
                              Variants:
                            </Typography>
                            {loadingVariants[service.id] ? (
                              <CircularProgress size={20} />
                            ) : variantsData[service.id]?.length > 0 ? (
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Nama</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Harga</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Unit</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>ETA (jam)</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {variantsData[service.id].map((variant) => (
                                    <TableRow key={variant.id}>
                                      <TableCell>{variant.name}</TableCell>
                                      <TableCell>
                                        {formatCurrency(variant.price)}
                                      </TableCell>
                                      <TableCell>{variant.unit_label || "-"}</TableCell>
                                      <TableCell>{variant.eta_duration || "-"}</TableCell>
                                      <TableCell>
                                        <Chip
                                          label={variant.is_active ? "Aktif" : "Nonaktif"}
                                          size="small"
                                          color={variant.is_active ? "success" : "default"}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <Typography color="text.secondary" fontSize={14}>
                                Belum ada variant
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination - Fixed at bottom */}
        <TablePagination
          component="div"
          count={filteredServices.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Baris per halaman:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} dari ${count}`
          }
          sx={{
            flexShrink: 0,
            bgcolor: "white",
            borderTop: "1px solid #e0e0e0",
          }}
        />
        </Box>
      )}

      {/* Dialogs */}
      <ServiceFormDialog
        open={serviceDialogOpen}
        onClose={handleServiceDialogClose}
        service={selectedService}
      />

      <VariantManageDialog
        open={variantDialogOpen}
        onClose={handleVariantDialogClose}
        service={selectedServiceForVariant}
      />
    </Box>
  );
}
