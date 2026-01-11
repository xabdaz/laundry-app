"use client";

import React from "react";
import { Box } from "@mui/material";
import NavigationSidebar from "@/components/NavigationSidebar";
import MasterDataContent from "@/components/master-data/MasterDataContent";

const NAVIGATION_SIDEBAR_WIDTH = "150px";

export default function MasterDataPage() {
  return (
    <Box>
      <NavigationSidebar width={NAVIGATION_SIDEBAR_WIDTH} />
      <MasterDataContent nav_width={NAVIGATION_SIDEBAR_WIDTH} />
    </Box>
  );
}
