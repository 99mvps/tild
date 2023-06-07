import React, { useEffect, useState } from "react";
import { Switch, Link, useHistory, useLocation, Route } from "react-router-dom";
import { Location } from "history";
import { Avatar, Box, Button } from "@mui/material";
import {
  Podcasts as PodcastsIcon,
  Logout as LogoutIcon,
  DashboardCustomize,
} from "@mui/icons-material";
import { useAuth } from "context/use-auth";
import { LoginRoute } from "ui/auth/auth.login";
import { AuthVerifier } from "ui/components/auth/auth.verifier";
import { LiveShow } from "./live/live.show";
import { BigHead } from "@bigheads/core";

import "./index.css";
import "root.css";
import logo from "./assets/logo.png";
import { HomePage } from "./home/home.show";
import { Dashboard } from "./dashboard/dashboard.show";
import { UserProfileRegistration } from "./user-profile/user-profile.create";
import { UserCodeOfConduct } from "./user-profile/user-code-of-conduct";

import { CreateCode } from "./code-editor/code-editor.create";

function NotLogged({ pathname }: Location) {
  if (pathname === "/") {
    return <HomePage />;
  }

  if (pathname === "/register") {
    return <UserProfileRegistration />;
  }

  if (pathname === "/code-of-conduct") {
    return <UserCodeOfConduct />;
  }

  return <LoginRoute />;
}

export function ApplicationRoutes() {
  let auth = useAuth();

  const location: Location = useLocation();

  const history = useHistory();

  const [activePath, setActivePath] = useState<string>("/");

  const setLinkActive = (path: string) =>
    activePath.startsWith(path) ? "active" : "";

  useEffect(() => {
    setActivePath(location.pathname);
  }, [auth.user, history, location.pathname]);

  return auth.user ? (
    <>
      <AuthVerifier />
      {location.pathname !== "/" && (
        <Box
          id="sidebar"
          sx={{
            width: "22rem",
            backgroundColor: "#f7f7f7",
            borderRight: "solid 1px #e3e3e3",
          }}
        >
          <nav>
            <Box
              sx={{
                marginBottom: 10,
              }}
            >
              <img src={logo} alt="what'd you learn today?" />
            </Box>
            <ul>
              <li color={"success"}>
                <Link className={setLinkActive("/dashboard")} to="/dashboard">
                  Dashboard <DashboardCustomize />
                </Link>
              </li>
              <li color={"success"}>
                <Link className={setLinkActive("/live")} to="/live">
                  Live <PodcastsIcon color={"success"} />
                </Link>
              </li>
            </ul>
            <Box>
              <Route exact path="/code/new">
                <CreateCode />
              </Route>
            </Box>
          </nav>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link className={setLinkActive("/settings")} to="/settings">
              <Avatar sx={{ width: 60, height: 60 }}>
                {!auth.user.userProfileImage && auth.user?.userName.slice(0, 1)}
                {auth.user.userProfileImage && (
                  <Box sx={{ width: 60 }}>
                    <BigHead {...JSON.parse(auth.user.userProfileImage)} />
                  </Box>
                )}
              </Avatar>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<LogoutIcon />}
              onClick={() => auth.signout()}
            >
              Logout
            </Button>
          </Box>
        </Box>
      )}
      <Box sx={{ flex: 1, overflowY: "scroll" }}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/code-of-conduct">
            <UserCodeOfConduct />
          </Route>
          <Route exact path="/code/new">
            <Dashboard />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <LoginRoute />
          </Route>
          <Route exact path={"/live/:id?"}>
            <LiveShow />
          </Route>
        </Switch>
      </Box>
    </>
  ) : (
    <NotLogged {...location} />
  );
}
