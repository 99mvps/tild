import { Grid } from "@mui/material";
import React from "react";
import { CustomCard } from "ui/components/card/code-editor";

export function HomeList() {
  return (
    <Grid
      container
      style={{
        padding: 20,
      }}
      spacing={1}
    >
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard
          codeEditor={{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard
          codeEditor={{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard
          codeEditor={{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard
          codeEditor={{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard
          codeEditor={{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard
          codeEditor={{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CustomCard
          codeEditor={{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
    </Grid>
  );
}
