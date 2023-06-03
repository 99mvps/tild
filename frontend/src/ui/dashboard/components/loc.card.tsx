import React from "react";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import { Box } from "@mui/material";

export function CardLOC() {
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
      <Box sx={{ color: "text.secondary" }}>LOC</Box>
      <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}>
        1.3 K
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
        4.20%
      </Box>
      <Box sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}>
        vs. last week
      </Box>
    </Box>
  );
}
