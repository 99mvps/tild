import React from "react";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import { Box } from "@mui/material";

export function CardSessions() {
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
      <Box sx={{ color: "text.secondary" }}>Sessions</Box>
      <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}>
        98.3 K
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
        18.77%
      </Box>
      <Box sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}>
        vs. last week
      </Box>
    </Box>
  );
}
