import React from "react";
import { Box, Grid } from "@mui/material";
import { CardSessions } from "./components/sessions.card";
import { CardLOC } from "./components/loc.card";
import { CardWallet } from "./components/wallet.card";
import { CustomCard } from "ui/components/card/code-editor";

export function Dashboard() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center">
            <CardSessions />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center">
            <CardLOC />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center">
            <CardWallet />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          padding: 20,
        }}
        spacing={1}
      >
        <Grid item xs={12} md={8} lg={4}>
          <CustomCard />
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <CustomCard />
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <CustomCard />
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <CustomCard />
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <CustomCard />
        </Grid>
      </Grid>
    </>
  );
}
