import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../assets/logo.png";

export function HomePage() {
  return (
    <div
      style={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        style={{
          backgroundColor: "#9146FF",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            style={{
              marginRight: 2,
            }}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              fontWeight: 600,
              fontSize: "1.5rem",
            }}
          >
            <img
              src={logo}
              className="App-logo"
              alt="Logo"
              style={{ margin: "0 auto", marginBottom: 50, width: 128 }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        style={{
          padding: 2,
          marginTop: 4,
        }}
        spacing={3}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          style={{
            marginBottom: 4,
          }}
        >
          <Paper
            style={{
              padding: 2,
              backgroundColor: "#ECE9FF",
            }}
          >
            {/* Content for the first grid item */}
            <Typography variant="h6" gutterBottom>
              Channel 1
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum pulvinar velit id velit pharetra, vitae consectetur
              erat accumsan. Integer dapibus elementum massa, et aliquet lorem
              imperdiet ac.
            </Typography>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          style={{
            marginBottom: 4,
          }}
        >
          <Paper
            style={{
              padding: 2,
              backgroundColor: "#ECE9FF",
            }}
          >
            {/* Content for the second grid item */}
            <Typography variant="h6" gutterBottom>
              Channel 2
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum pulvinar velit id velit pharetra, vitae consectetur
              erat accumsan. Integer dapibus elementum massa, et aliquet lorem
              imperdiet ac.
            </Typography>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          style={{
            marginBottom: 4,
          }}
        >
          <Paper
            style={{
              padding: 2,
              backgroundColor: "#ECE9FF",
            }}
          >
            {/* Content for the third grid item */}
            <Typography variant="h6" gutterBottom>
              Channel 3
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum pulvinar velit id velit pharetra, vitae consectetur
              erat accumsan. Integer dapibus elementum massa, et aliquet lorem
              imperdiet ac.
            </Typography>
          </Paper>
        </Grid>
        {/* Add more Grid items as needed */}
      </Grid>
    </div>
  );
}
