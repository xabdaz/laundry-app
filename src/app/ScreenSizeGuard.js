"use client";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Lottie from "lottie-react";
import Prohibited from "../../public/animation/prohibited.json";

export default function ScreenSizeGuard({ children }) {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      if (w < 1194 || h < 550) {
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }
    };

    checkSize(); // check on mount
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (!isAllowed)
    return (
      <div style={{ width: "100vw", height: "100vh", backgroundColor: "#fff" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
          }}>
          <Lottie
            animationData={Prohibited}
            style={{ width: 70, height: 70 }}
            loop={true}
          />
          <Typography color="#00225C" fontWeight={500} fontSize={16}>
            Maaf belum tersedia di layar ini
          </Typography>
        </div>
      </div>
    );

  return children;
}
