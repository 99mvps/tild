import React, { useState } from "react";
import logo from "../assets/logo.png";

import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "context/use-auth";
import { TextField, Button, Typography } from "@mui/material";

import { ErrorMessage, TErrorMessage } from "ui/components/error";

import "./auth.css";
import { AccountCircle, AddBox } from "@mui/icons-material";
export function LoginRoute(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<TErrorMessage>();

  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  async function handleUserLogin(e: any) {
    e.preventDefault();

    auth
      .signin(email, password)
      .then((redirectPath: string) => {
        let previousPath = location.pathname !== "/" && location.pathname;

        history.replace(previousPath || { pathname: redirectPath });
      })
      .catch((error: Error) =>
        setError({
          title: error.message,
          errors: error.cause,
        })
      );
  }

  return (
    <div className="form-container">
      <form className="form" method="post" onSubmit={handleUserLogin}>
        {error && <ErrorMessage {...error} />}
        <div className="form-content">
          <h3 className="form-title">today I learned</h3>
          <img src={logo} className="App-logo" alt="Logo" />

          <div className="form-group">
            <label className="form-group-label">Email</label>
            <TextField
              id="username"
              fullWidth={true}
              placeholder="Username"
              type="text"
              name="username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-group-label">Senha</label>
            <TextField
              fullWidth={true}
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "1rem",
                marginRight: -15,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                startIcon={<AccountCircle />}
                // style={{ backgroundColor: "#9146FF", color: "#fff" }}
              >
                Login
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" style={{ marginRight: "0.5rem" }}>
                Ainda não tem uma conta?
              </Typography>
              {/* <IconButton edge="end" color="inherit">
                  Registar
                  <AddBox />
              </IconButton> */}

              <Link to="/register">
                <Button
                  variant="text"
                  startIcon={<AddBox />}
                  style={{ textTransform: "none", color: "#9146FF" }}
                >
                  Só vamo!
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
