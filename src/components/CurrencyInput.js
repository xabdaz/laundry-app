// components/CurrencyInput.js
import React, { useState, useEffect } from "react";
import { TextField, Typography } from "@mui/material";

const CurrencyInput = ({ value = 0, onChange }) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    setDisplayValue(formatRupiah(value));
  }, [value]);

  const formatRupiah = (number) => {
    if (!number) return "";
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const parsed = parseFloat(raw) || 0;
    setDisplayValue(formatRupiah(parsed));
    onChange(parsed);
  };

  return (
    <TextField
      type="tel"
      inputMode="numeric"
      label="Nominal"
      fullWidth
      value={displayValue}
      onChange={handleChange}
      InputProps={{
        startAdornment: <Typography sx={{ mr: 1 }}>Rp</Typography>,
      }}
    />
  );
};

export default CurrencyInput;
