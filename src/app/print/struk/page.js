"use client";

import { useEffect, useState } from "react";

export default function StrukPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("printData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  if (!data) return null;

  return (
    <>
      {/* Inject print landscape style */}
      <style>{`
        @media print {
          @page {
            size: landscape;
            margin: ;
          }
          body {
            margin: 0;
          }
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "row", gap: "0mm" }}>
      {/* <div
      style={{
        width: "105mm",
        height: "140mm",
        paddingLeft: "5mm",
        fontFamily: "monospace",
        fontSize: "8px",
        backgroundColor: "#fff",
        color: "#000",
        position: "relative",
      }}
    > */}
        <Receipt data={data} />
      {/* </div> */}
        
        <Receipt2 data={data} />
      </div>
    </>
  );
}

function Receipt({ data }) {
  const { transaction, details } = data;
  const total = transaction.total_price;
  const isHasPayment = transaction.isHasPayment;

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  return (
    <div
      style={{
        width: "105mm",
        height: "140mm",
        paddingLeft: "20mm",
        fontFamily: "monospace",
        fontSize: "8px",
        backgroundColor: "#fff",
        color: "#000",
        position: "relative",
      }}
    >
      {/* STAMP */}
      <div
        style={{
          position: "absolute",
          top: "6mm",
          right: "6mm",
          border: `1px solid ${isHasPayment ? "#28a745" : "#dc3545"}`,
          color: isHasPayment ? "#28a745" : "#dc3545",
          fontWeight: "bold",
          fontSize: "8px",
          padding: "3px 8px",
          borderRadius: "4px",
          transform: "rotate(10deg)",
          opacity: 0.85,
        }}
      >
        {isHasPayment ? "SUDAH BAYAR" : "BELUM BAYAR"}
      </div>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <img
          src="/icons/ruma_laundry_ic.png"
          alt="Rumah Laundry"
          style={{ height: 30, marginBottom: 2, display: "inline-block" }}
        />
        <div style={{ fontSize: "11px", fontWeight: "bold" }}>
          Rumah Laundry
        </div>
        <div style={{ fontSize: "8px" }}>
          Jl. Raya Jagakarsa No.8, RT.5/RW.2, Jagakarsa, Jakarta Selatan<br />
          Whatsapp: 087723761668 (Yano)
        </div>
      </div>

      <hr style={{ borderTop: "1px dashed #000", margin: "4px 0" }} />

      {/* TRANSACTION INFO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
          gap: "8px",
        }}
      >
        <div style={{ width: "50%", lineHeight: 1.3 }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>No</div>
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

        <div style={{ width: "50%", lineHeight: 1.3 }}>
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

      <hr style={{ borderTop: "1px dashed #000", margin: "4px 0" }} />

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

      <hr style={{ borderTop: "1px dashed #000", margin: "4px 0" }} />

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

      <hr style={{ borderTop: "1px dashed #000", margin: "4px 0" }} />

      {/* TERMS */}
      <div style={{ fontSize: "8px", marginTop: "4px" }}>
        <strong>Syarat dan Ketentuan:</strong>
        <ol
          style={{
            margin: "2px 0",
            paddingLeft: "14px",
            listStyleType: "decimal",
            listStylePosition: "outside",
          }}
        >
          <li>Harap simpan struk ini untuk klaim.</li>
          <li>Kehilangan struk di luar tanggung jawab kami.</li>
          <li>Barang yang tidak diambil 1 bulan bukan tanggung jawab kami.</li>
        </ol>

        <p style={{ textAlign: "center", marginTop: "8px", fontWeight: "bold" }}>
          Terima kasih telah menggunakan jasa Rumah Laundry!
        </p>
      </div>
    </div>
  );
}

function Receipt2({ data }) {
  const { transaction, details } = data;
  const total = transaction.total_price;
  const isHasPayment = transaction.isHasPayment;

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  return (
    <div
      style={{
        width: "105mm",
        height: "140mm",
        padding: "3mm",
        fontFamily: "monospace",
        fontSize: "8px",
        backgroundColor: "#fff",
        color: "#000",
        position: "relative",
      }}
    >
      {/* STAMP */}
      <div
        style={{
          position: "absolute",
          top: "6mm",
          right: "6mm",
          border: `1px solid ${isHasPayment ? "#28a745" : "#dc3545"}`,
          color: isHasPayment ? "#28a745" : "#dc3545",
          fontWeight: "bold",
          fontSize: "8px",
          padding: "3px 8px",
          borderRadius: "4px",
          transform: "rotate(10deg)",
          opacity: 0.85,
        }}
      >
        {isHasPayment ? "SUDAH BAYAR" : "BELUM BAYAR"}
      </div>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <img
          src="/icons/ruma_laundry_ic.png"
          alt="Rumah Laundry"
          style={{ height: 30, marginBottom: 2, display: "inline-block" }}
        />
        <div style={{ fontSize: "11px", fontWeight: "bold" }}>
          Rumah Laundry
        </div>
        <div style={{ fontSize: "8px" }}>
          Jl. Raya Jagakarsa No.8, RT.5/RW.2, Jagakarsa, Jakarta Selatan<br />
          Whatsapp: 087723761668 (Yano)
        </div>
      </div>

      <hr style={{ borderTop: "1px dashed #000", margin: "4px 0" }} />

      {/* TRANSACTION INFO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
          gap: "8px",
        }}
      >
        <div style={{ width: "50%", lineHeight: 1.3 }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>No</div>
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

        <div style={{ width: "50%", lineHeight: 1.3 }}>
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

      <hr style={{ borderTop: "1px dashed #000", margin: "4px 0" }} />

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

      <hr style={{ borderTop: "1px dashed #000", margin: "4px 0" }} />

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

      <hr style={{ borderTop: "1px dashed #000", margin: "4px 0" }} />

      {/* TERMS */}
      <div style={{ fontSize: "8px", marginTop: "4px" }}>
        <strong>Syarat dan Ketentuan:</strong>
        <ol
          style={{
            margin: "2px 0",
            paddingLeft: "14px",
            listStyleType: "decimal",
            listStylePosition: "outside",
          }}
        >
          <li>Harap simpan struk ini untuk klaim.</li>
          <li>Kehilangan struk di luar tanggung jawab kami.</li>
          <li>Barang yang tidak diambil 1 bulan bukan tanggung jawab kami.</li>
        </ol>

        <p style={{ textAlign: "center", marginTop: "8px", fontWeight: "bold" }}>
          Terima kasih telah menggunakan jasa Rumah Laundry!
        </p>
      </div>
    </div>
  );
}
