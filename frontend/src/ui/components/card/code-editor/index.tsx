import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

import { AccessTime, Visibility, Podcasts } from "@mui/icons-material";
import { CodeComponent } from "ui/components/svg-component/code-component";

export function CustomCard() {
  return (
    <Card>
      {/* Top Part */}
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <CodeComponent extension="js" />
      </CardContent>

      {/* Bottom Part */}
      <CardContent sx={{ maxWidth: 230 }}>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6" fontWeight="fontWeightBold" gutterBottom>
              Tild
            </Typography>
            <Typography sx={{ marginTop: "-10px", marginBottom: "20px" }}>
              @Username
            </Typography>
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Visibility />
            <Typography sx={{ marginLeft: "5px" }}>1.5k Views</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AccessTime />
            <Typography sx={{ marginLeft: "5px" }}>27/05/23 18:03</Typography>
          </Grid>
        </Grid>

        <Grid container alignItems="end">
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Podcasts sx={{ marginTop: "15px" }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
