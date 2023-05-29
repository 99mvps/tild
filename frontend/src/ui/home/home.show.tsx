import React from "react";

import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";

import logo from "../assets/logo.png";
import { HomeList } from "./home.list";
import { HomeSearch } from "./component/search";
import { Link } from "react-router-dom";

export function HomePage() {
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

          <HomeSearch />

          <IconButton edge="end" color="inherit" aria-label="menu">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <AccountCircleIcon color="inherit" />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <HomeList />
    </Box>
  );
}
