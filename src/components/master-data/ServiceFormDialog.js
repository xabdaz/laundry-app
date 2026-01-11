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
  MenuItem,
} from "@mui/material";
import { createService, updateService } from "@/services/pos";

export default function ServiceFormDialog({ open, onClose, service }) {
  const isEdit = Boolean(service);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    type: "",
    price_delivery_per_kg: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        category: service.category || "",
        type: service.type || "",
        price_delivery_per_kg: service.price_delivery_per_kg || 0,
        is_active: service.is_active ?? true,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        type: "",
        price_delivery_per_kg: 0,
        is_active: true,
      });
    }
    setErrors({});
  }, [service, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Nama service wajib diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        price_delivery_per_kg: parseFloat(formData.price_delivery_per_kg) || 0,
      };

      if (isEdit) {
        await updateService(service.id, payload);
      } else {
        await createService(payload);
      }
      onClose(true);
    } catch (error) {
      console.error("Failed to save service:", error);
      alert("Gagal menyimpan service: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: "kiloan", label: "Kiloan" },
    { value: "satuan", label: "Satuan" },
    { value: "premium", label: "Premium" },
  ];

  const typeOptions = [
    { value: "regular", label: "Regular" },
    { value: "express", label: "Express" },
    { value: "same_day", label: "Same Day" },
  ];

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: "#00225C", color: "white" }}>
        {isEdit ? "Edit Service" : "Tambah Service Baru"}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          <TextField
            label="Nama Service"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            required
          />

          <TextField
            label="Kategori"
            name="category"
            value={formData.category}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="">-- Pilih Kategori --</MenuItem>
            {categoryOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Tipe"
            name="type"
            value={formData.type}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="">-- Pilih Tipe --</MenuItem>
            {typeOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Harga Delivery per Kg"
            name="price_delivery_per_kg"
            type="number"
            value={formData.price_delivery_per_kg}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 0 }}
          />

          <Box>
            <FormControlLabel
              control={
                <Switch
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Aktif"
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={() => onClose(false)}
          disabled={loading}
          sx={{ textTransform: "none" }}
        >
          Batal
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            bgcolor: "#00225C",
            "&:hover": { bgcolor: "#001a47" },
            textTransform: "none",
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : isEdit ? (
            "Simpan Perubahan"
          ) : (
            "Tambah Service"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
