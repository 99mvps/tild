import React from "react";
import { Grid } from "@mui/material";
import { CodeComponent } from "ui/components/svg-component/code-component";

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
        <CodeComponent
          {...{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CodeComponent
          {...{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CodeComponent
          {...{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CodeComponent
          {...{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CodeComponent
          {...{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CodeComponent
          {...{
            id: "a",
            lang: "js",
            live: true,
            createdAt: new Date(),
            title: "ola",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <CodeComponent
          {...{
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
