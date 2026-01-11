"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Stack,
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from "react-icons/fi";
import {
  getAllVariantsByService,
  createVariant,
  updateVariant,
  deleteVariant,
} from "@/services/pos";

export default function VariantManageDialog({ open, onClose, service }) {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form for adding/editing variant
  const [showForm, setShowForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    unit_label: "kg",
    is_flat_price: false,
    price: 0,
    is_active: true,
    price_delivery_per_kg: 0,
    eta_duration: 24,
    minimum: 1,
    image_url: "",
  });
  const [errors, setErrors] = useState({});

  const fetchVariants = async () => {
    if (!service?.id) return;
    setLoading(true);
    try {
      const response = await getAllVariantsByService(service.id);
      setVariants(response.data || []);
    } catch (error) {
      console.error("Failed to fetch variants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && service?.id) {
      fetchVariants();
      resetForm();
    }
  }, [open, service]);

  const resetForm = () => {
    setFormData({
      name: "",
      unit_label: "kg",
      is_flat_price: false,
      price: 0,
      is_active: true,
      price_delivery_per_kg: 0,
      eta_duration: 24,
      minimum: 1,
      image_url: "",
    });
    setEditingVariant(null);
    setShowForm(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (variant) => {
    setEditingVariant(variant);
    setFormData({
      name: variant.name || "",
      unit_label: variant.unit_label || "kg",
      is_flat_price: variant.is_flat_price || false,
      price: variant.price || 0,
      is_active: variant.is_active ?? true,
      price_delivery_per_kg: variant.price_delivery_per_kg || 0,
      eta_duration: variant.eta_duration || 24,
      minimum: variant.minimum || 1,
      image_url: variant.image_url || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (variantId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus variant ini?")) {
      try {
        await deleteVariant(variantId);
        fetchVariants();
      } catch (error) {
        console.error("Failed to delete variant:", error);
        alert("Gagal menghapus variant");
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Nama variant wajib diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        laundry_service_id: service.id,
        price: parseInt(formData.price) || 0,
        price_delivery_per_kg: parseInt(formData.price_delivery_per_kg) || 0,
        eta_duration: parseInt(formData.eta_duration) || 24,
        minimum: parseInt(formData.minimum) || 1,
      };

      if (editingVariant) {
        await updateVariant(editingVariant.id, payload);
      } else {
        await createVariant(payload);
      }

      fetchVariants();
      resetForm();
    } catch (error) {
      console.error("Failed to save variant:", error);
      alert("Gagal menyimpan variant: " + (error.response?.data?.error || error.message));
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { minHeight: "60vh" } }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#00225C",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Kelola Variant - {service?.name}</span>
        <IconButton onClick={() => onClose(false)} sx={{ color: "white" }}>
          <FiX />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2, p: 3 }}>
        {/* Add Button */}
        {!showForm && (
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<FiPlus />}
              onClick={handleAddNew}
              sx={{
                bgcolor: "#00225C",
                "&:hover": { bgcolor: "#001a47" },
                textTransform: "none",
              }}
            >
              Tambah Variant
            </Button>
          </Box>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: "#f9f9f9" }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              {editingVariant ? "Edit Variant" : "Tambah Variant Baru"}
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Nama Variant"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  size="small"
                  required
                  sx={{ flex: 2 }}
                />
                <TextField
                  label="Unit Label"
                  name="unit_label"
                  value={formData.unit_label}
                  onChange={handleChange}
                  size="small"
                  sx={{ flex: 1 }}
                  placeholder="kg, pcs, dll"
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Harga"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  size="small"
                  sx={{ flex: 1 }}
                  inputProps={{ min: 0 }}
                />
                <TextField
                  label="Harga Delivery/Kg"
                  name="price_delivery_per_kg"
                  type="number"
                  value={formData.price_delivery_per_kg}
                  onChange={handleChange}
                  size="small"
                  sx={{ flex: 1 }}
                  inputProps={{ min: 0 }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="ETA (jam)"
                  name="eta_duration"
                  type="number"
                  value={formData.eta_duration}
                  onChange={handleChange}
                  size="small"
                  sx={{ flex: 1 }}
                  inputProps={{ min: 1 }}
                />
                <TextField
                  label="Minimum"
                  name="minimum"
                  type="number"
                  value={formData.minimum}
                  onChange={handleChange}
                  size="small"
                  sx={{ flex: 1 }}
                  inputProps={{ min: 1 }}
                />
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <FormControlLabel
                  control={
                    <Switch
                      name="is_flat_price"
                      checked={formData.is_flat_price}
                      onChange={handleChange}
                      size="small"
                    />
                  }
                  label="Harga Flat"
                />
                <FormControlLabel
                  control={
                    <Switch
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                      size="small"
                    />
                  }
                  label="Aktif"
                />
              </Stack>

              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  onClick={resetForm}
                  disabled={saving}
                  sx={{ textTransform: "none" }}
                >
                  Batal
                </Button>
                <Button
                  variant="contained"
                  startIcon={saving ? null : <FiSave />}
                  onClick={handleSubmit}
                  disabled={saving}
                  sx={{
                    bgcolor: "#00225C",
                    "&:hover": { bgcolor: "#001a47" },
                    textTransform: "none",
                  }}
                >
                  {saving ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : editingVariant ? (
                    "Update"
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Variants Table */}
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
          Daftar Variant ({variants.length})
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress />
          </Box>
        ) : variants.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
            Belum ada variant untuk service ini
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, bgcolor: "#E1F0FC" }}>
                    Nama
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: "#E1F0FC" }}>
                    Harga
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: "#E1F0FC" }}>
                    Unit
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: "#E1F0FC" }}>
                    ETA
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: "#E1F0FC" }}>
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, bgcolor: "#E1F0FC" }}
                    align="center"
                  >
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variants.map((variant) => (
                  <TableRow key={variant.id} hover>
                    <TableCell>{variant.name}</TableCell>
                    <TableCell>{formatCurrency(variant.price)}</TableCell>
                    <TableCell>{variant.unit_label || "-"}</TableCell>
                    <TableCell>{variant.eta_duration || "-"} jam</TableCell>
                    <TableCell>
                      <Chip
                        label={variant.is_active ? "Aktif" : "Nonaktif"}
                        size="small"
                        color={variant.is_active ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(variant)}
                          sx={{ color: "#1976d2" }}
                        >
                          <FiEdit2 size={16} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(variant.id)}
                          sx={{ color: "#d32f2f" }}
                        >
                          <FiTrash2 size={16} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={() => onClose(true)}
          variant="contained"
          sx={{
            bgcolor: "#00225C",
            "&:hover": { bgcolor: "#001a47" },
            textTransform: "none",
          }}
        >
          Selesai
        </Button>
      </DialogActions>
    </Dialog>
  );
}
