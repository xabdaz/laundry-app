import React, { useState } from "react";

const LaundryForm = () => {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    berat: "",
    layanan: "Cuci Kering",
    tanggalMasuk: "",
    tanggalSelesai: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/laundry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim data laundry");
      }

      const result = await response.json();
      console.log("Respon dari server:", result);
      alert("Data berhasil dikirim ke server!");
    } catch (error) {
      console.error("Error saat submit:", error);
      alert("Gagal mengirim data. Cek koneksi ke server.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Form Input Laundry</h2>
      <div>
        <label>Nama Pelanggan:</label>
        <input name="nama" value={form.nama} onChange={handleChange} required />
      </div>
      <div>
        <label>Nomor Telepon:</label>
        <input name="telepon" value={form.telepon} onChange={handleChange} required />
      </div>
      <div>
        <label>Berat Cucian (kg):</label>
        <input type="number" name="berat" value={form.berat} onChange={handleChange} required />
      </div>
      <div>
        <label>Jenis Layanan:</label>
        <select name="layanan" value={form.layanan} onChange={handleChange}>
          <option value="Cuci Kering">Cuci Kering</option>
          <option value="Cuci Setrika">Cuci Setrika</option>
          <option value="Setrika Saja">Setrika Saja</option>
        </select>
      </div>
      <div>
        <label>Tanggal Masuk:</label>
        <input type="date" name="tanggalMasuk" value={form.tanggalMasuk} onChange={handleChange} required />
      </div>
      <div>
        <label>Tanggal Selesai:</label>
        <input type="date" name="tanggalSelesai" value={form.tanggalSelesai} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LaundryForm;
