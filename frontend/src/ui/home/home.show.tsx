import React from "react";

import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";

import logo from "../assets/logo.png";
import { HomeList } from "./home.list";
import { HomeSearch } from "./component/search";
import { Link } from "react-router-dom";
import { useAuth } from "context/use-auth";

export function HomePage() {
  const auth = useAuth();

  const handler = (data: any) => {
    console.log({ data });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#9146FF",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            component="img"
            sx={{
              width: 64,
            }}
            alt="~tild~"
            src={logo}
          />

          <HomeSearch onSubmit={handler} />

          <IconButton edge="end" color="inherit" aria-label="menu">
            <Link
              to={auth.user ? "/dashboard" : "/login"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <AccountCircleIcon color="inherit" />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography
        variant="h2"
        color="secondary"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        what'd you learn today?
      </Typography>
      <HomeList />
    </Box>
  );
}
