import React from "react";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import { Box } from "@mui/material";
import { convertDigitalUnit } from "in-utils";

export function CardWallet() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        maxWidth: 300,
      }}
    >
      <Box sx={{ color: "text.secondary" }}>Storage</Box>
      <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}>
        {convertDigitalUnit(1024, "Mb", "Gb")}
      </Box>
      <Box
        component={TrendingUpIcon}
        sx={{ color: "success.dark", fontSize: 16, verticalAlign: "sub" }}
      />
      <Box
        sx={{
          color: "success.dark",
          display: "inline",
          fontWeight: "medium",
          mx: 0.5,
        }}
      >
        1.69%
      </Box>
      <Box sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}>
        vs. last week
      </Box>
    </Box>
  );
}
