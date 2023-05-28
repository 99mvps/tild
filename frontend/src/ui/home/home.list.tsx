import { Grid } from "@mui/material";
import React from "react";
import { CustomCard } from "ui/components/card/code-editor";

export function HomeList() {
  return (
    <Grid
      container
      style={{
        padding: 2,
        margin: 3,
      }}
      spacing={1}
    >
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard />
      </Grid>
    </Grid>
  );
}
