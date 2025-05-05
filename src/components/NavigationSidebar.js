"use client";

import React from "react";
import { useGeneral } from "@/hooks/useGeneral";

import { Box, Button, Stack, Typography } from "@mui/material";
import { FiHome, FiSettings } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { PiCashRegisterDuotone } from "react-icons/pi";
import { useRouter, usePathname } from "next/navigation";


function SidebarButton({ icon: Icon, label }) {
  const { navbar, setNavbar } = useGeneral();
  const route = useRouter();
  const pathname = usePathname();

  const targetPath = label === "home" ? "/" : `/${label}`;
  const isActive =
    label === "home" ? pathname === "/" : pathname.startsWith(targetPath);

  const handleClick = () => {
    if (label !== "logout") {
      route.push(label === "home" ? "/" : `/${label}`);
      setNavbar(label);
    }
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        bgcolor: isActive ? "#00225C" : "#E1F0FC",
        ":hover": {
          color: "#9ECCEC",
          "& .text-label": { color: "#9ECCEC" },
          "& .icon": { color: "#9ECCEC" },
        },
        display: "flex",
        flexDirection: "column",
        width: "100px",
        height: "100px",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        textTransform: "none",
        gap: 1.5,
      }}>
      <Icon
        className="icon"
        size={28}
        color={isActive ? "#9ECCEC" : "#00225C"}
      />
      <Typography
        className="text-label"
        fontSize={15}
        fontWeight={600}
        color={isActive ? "#9ECCEC" : "#00225C"}
        sx={{ mt: -0.5, textAlign: "center" }}>
        {label}
      </Typography>
    </Button>
  );
}


export default function NavigationSidebar({ width }) {
  const pathname = usePathname();
  // Hide sidebar on /print/struk
  if (pathname === "/print/struk") {
    return null;
  }
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: width,
        height: "100vh",
        bgcolor: "white",
        borderRight: "1px solid #e0e0e0",
        zIndex: 10,
      }}>
      <Stack spacing={4} alignItems="center" py={4} height="100%">
        <img
          src="/icons/rumah-laundry.svg"
          alt="Logo"
          width={120}
          height={120}
        />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            display: "flex",
          }}>
          <Stack
            spacing={1.5}
            alignItems="center"
            width="100%"
            px={2}
            marginBottom={6}>
            <SidebarButton icon={FiHome} label="home" />
            <SidebarButton icon={PiCashRegisterDuotone} label="cashier" />
            <SidebarButton icon={GrTransaction} label="status" />
            <SidebarButton icon={FiSettings} label="setting" />
            <SidebarButton icon={TbLogout} label="logout" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
