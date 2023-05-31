import React, { useEffect, useState } from "react";
import { Switch, Link, Route, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { Avatar, Box, Button } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import {
  Code as CodeIcon,
  Podcasts as PodcastsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useAuth } from "context/use-auth";
import { LoginRoute } from "ui/auth/auth.login";
import { AuthVerifier } from "ui/components/auth/auth.verifier";
import { CreateCode } from "./code-editor/code-editor.create";
import { CreateUser } from "./users/user.create";
import { UpdateUser } from "./users/user.edit";
import { ListUsers } from "./users/user.list";
import { isLiveSelector } from "domain/state/general-application.recoil";
import { useRecoilValue } from "recoil";
import { LiveShow } from "./live/live.show";

import "./index.css";
import "root.css";
import logo from "./assets/logo.png";
import { HomePage } from "./home/home.show";
import { Dashboard } from "./dashboard/dashboard.show";
import { UserProfileRegistration } from "./user-profile/user-profile.create";

function NotLogged({ pathname, search, hash }: any) {
  if (pathname === "/") {
    return <HomePage />;
  }

  if (pathname === "/register") {
    return <UserProfileRegistration />;
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

  const isOnline = useRecoilValue(isLiveSelector);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [auth.user, history, location.pathname]);

  return auth.user ? (
    <>
      <AuthVerifier />
      {location.pathname !== "/" && (
        <div id="sidebar">
          <nav>
            <img
              src={logo}
              className="App-logo"
              alt="Logo"
              style={{ margin: "0 auto", marginBottom: 50, width: 128 }}
            />
            <ul>
              <li color={"success"}>
                <Link className={setLinkActive("/live")} to="/live">
                  Live <PodcastsIcon color={"success"} />
                </Link>
              </li>
              {/* {isOnline ?? ()} */}
              <li>
                <Link className={setLinkActive("/code")} to="/code/new">
                  Code <CodeIcon />
                </Link>
              </li>
            </ul>
          </nav>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link className={setLinkActive("/settings")} to="/settings">
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {auth.user?.userName.slice(0, 1)}
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
        </div>
      )}
      <div id="detail" style={{ overflow: "scroll" }}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/register">
            <UserProfileRegistration />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <LoginRoute />
          </Route>
          <Route exact path={"/code/new"}>
            <CreateCode />
          </Route>
          <Route path={"/live/:id?"}>
            <LiveShow />
          </Route>
          <Route exact path={"/users"} children={<ListUsers />} />
          <Route path={"/users/new"}>
            <CreateUser />
          </Route>
          <Route path={"/users/:id"}>
            <UpdateUser />
          </Route>
          {/* <Route component={HomePage} /> */}
        </Switch>
      </div>
    </>
  ) : (
    <NotLogged {...location} />
  );
}
