import React, { useState } from "react";
import logo from "../assets/logo.png";

import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "context/use-auth";
import { TextField, Button, Typography, Box, IconButton } from "@mui/material";

import { AccountCircle, AddBox, ArrowBack } from "@mui/icons-material";
import { usePasswordVisibility } from "ui/components/inputs/password-visibility.component";
export function LoginRoute(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  const { passAdornVisible, PasswordVisibilityAdornment } =
    usePasswordVisibility();

  async function handleUserLogin(e: any) {
    e.preventDefault();

    const redirectPath = await auth.signin(email, password);

    let previousPath = location.pathname !== "/" && location.pathname;

    history.replace(previousPath || { pathname: redirectPath });
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: 520,
          boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
          paddingTop: "30px",
          paddingBottom: "20px",
          backgroundColor: "white",
        }}
      >
        <form onSubmit={handleUserLogin}>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "1em",
              fontSize: "32px",
              color: "rgb(34, 34, 34)",
            }}
          >
            today I learned
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="Logo" />
          </Box>
          <Box sx={{ margin: 3 }}>
            <TextField
              id="username"
              label="Email"
              fullWidth
              placeholder="Username"
              type="text"
              name="username"
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <AccountCircle sx={{ marginRight: 2 }} />,
              }}
            />
          </Box>
          <Box sx={{ margin: 3, marginBottom: 8 }}>
            <TextField
              fullWidth
              id="password"
              label="Password"
              placeholder="Password"
              type={passAdornVisible ? "text" : "password"}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <PasswordVisibilityAdornment />,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
              marginBottom: 5,
            }}
          >
            <IconButton onClick={() => history.push("/")}>
              <ArrowBack
                sx={{
                  marginLeft: 1,
                }}
              />
            </IconButton>

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              sx={{
                marginRight: 3,
                bgcolor: "secondary.main",
                color: "crimson",
                "&:hover": {
                  bgcolor: "#9146FF",
                  color: "secondary.main",
                },
                "& .MuiButton-startIcon": {
                  display: "flex",
                  justifyContent: "center",
                  marginRight: "4px",
                },
              }}
              startIcon={<AccountCircle />}
            >
              Login
            </Button>
          </Box>

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" style={{ marginRight: "0.5rem" }}>
              Ainda não tem uma conta?
            </Typography>

            <Link to="/register">
              <Button
                variant="text"
                startIcon={<AddBox />}
                style={{ textTransform: "none", color: "#9146FF" }}
              >
                Só vamo!
              </Button>
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
