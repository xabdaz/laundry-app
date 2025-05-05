"use client";

import { useEffect, useState } from "react";

export default function StrukPage() {
    const [data, setData] = useState(null);

    // Step 1: Load from localStorage
    useEffect(() => {
      const stored = localStorage.getItem("printData");
      if (stored) {
        setData(JSON.parse(stored));
      }
    }, []);
  
    // ✅ Step 2: Call print after data is loaded
    useEffect(() => {
        // if (data?.transaction?.isPaymented) {
          const timer = setTimeout(() => {
            window.print();
          }, 500); // 0.5 detik
      
          return () => clearTimeout(timer); // bersihkan jika unmount
        // }
      }, [data]);
      
  
    if (!data) return null;
  
    const { transaction, details } = data;
    const total = transaction.total_price;
    const isHasPayment = transaction.isHasPayment;
  
    const formatDate = (iso) => new Date(iso).toLocaleDateString();

  return (
    <div
      style={{
        width: "105mm",
        height: "140mm",
        padding: "6mm",
        fontFamily: "monospace",
        fontSize: "10px",
        backgroundColor: "#fff",
        color: "#000",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* STAMP */}
      <div
        style={{
          position: "absolute",
          top: "6mm",
          right: "6mm",
          border: `2px solid ${isHasPayment ? "#28a745" : "#dc3545"}`,
          color: isHasPayment ? "#28a745" : "#dc3545",
          fontWeight: "bold",
          fontSize: "12px",
          padding: "4px 10px",
          borderRadius: "4px",
          transform: "rotate(10deg)",
          opacity: 0.85,
        }}
      >
        {isHasPayment ? "SUDAH BAYAR" : "BELUM BAYAR"}
      </div>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <img
          src="/icons/ruma_laundry_ic.png"
          alt="Rumah Laundry"
          style={{ height: 35, marginBottom: 2 }}
        />
        <div style={{ fontSize: "13px", fontWeight: "bold" }}>
          Rumah Laundry
        </div>
        <div style={{ fontSize: "10px" }}>
          Jl. Raya Jagakarsa No.8, RT.5/RW.2, Jagakarsa, Jakarta Selatan<br />
          Whatsapp: 088211000065
        </div>
      </div>

      <hr style={{ borderTop: "1px dashed #000", margin: "6px 0" }} />

      {/* TRANSACTION INFO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
          gap: "8px",
        }}
      >
        <div style={{ width: "50%", lineHeight: 1.4 }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>No. Transaksi</div>
            <div>: TRX-{transaction.id}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>Tgl. Masuk</div>
            <div>: {formatDate(transaction.date_in)}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>Tgl. Selesai</div>
            <div>: {formatDate(transaction.date_out)}</div>
          </div>
        </div>

        <div style={{ width: "50%", lineHeight: 1.4 }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "30%" }}>Nama</div>
            <div>: {transaction.customer_name}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "30%" }}>Alamat</div>
            <div>: -</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "30%" }}>No. HP</div>
            <div>: {transaction.phone_number}</div>
          </div>
        </div>
      </div>

      <hr style={{ borderTop: "1px dashed #000", margin: "6px 0" }} />

      {/* TABLE */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Laundry</th>
            <th align="right">Kg</th>
            <th align="right">Harga</th>
            <th align="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, idx) => (
            <tr key={idx}>
              <td>{item.product_name}</td>
              <td align="right">{item.quantity}</td>
              <td align="right">
                {(item.subtotal / item.quantity).toLocaleString()}
              </td>
              <td align="right">{item.subtotal.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ borderTop: "1px dashed #000", margin: "6px 0" }} />

      {/* TOTAL */}
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>Biaya Antar</td>
            <td align="right">{transaction.delivery_fee.toLocaleString()}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Total</td>
            <td align="right" style={{ fontWeight: "bold" }}>
              {total.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <hr style={{ borderTop: "1px dashed #000", margin: "6px 0" }} />

      {/* TERMS */}
      <div style={{ fontSize: "10px", marginTop: "6px" }}>
        <strong>Note:</strong>
        <p style={{ margin: "3px 0" }}>
          Barang yang sudah diambil tidak dapat dikomplain.
        </p>

        <strong>Syarat dan Ketentuan:</strong>
        <ol
          style={{
            margin: "3px 0",
            paddingLeft: "14px",
            listStyleType: "decimal",
            listStylePosition: "outside",
          }}
        >
          <li>Harap simpan struk ini untuk klaim.</li>
          <li>Kehilangan struk di luar tanggung jawab kami.</li>
          <li>Barang yang tidak diambil 1 bulan bukan tanggung jawab kami.</li>
        </ol>

        <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
          Terima kasih telah menggunakan jasa Rumah Laundry!
        </p>
      </div>
    </div>
  );
}