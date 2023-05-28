import React from "react";

import { AppBar, Toolbar, IconButton, Box, TextField } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";

import logo from "../assets/logo.png";
import { HomeList } from "./home.list";
import { HomeSearch } from "./component/search.component";

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
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <HomeList />
    </Box>
  );
}
