import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

import { useAuth } from "context";
import { LoginRoute } from "ui/auth/auth.login";

import { AuthVerifier } from "components/auth/auth.verifier";
import CodeIcon from "@mui/icons-material/Code";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import SettingsIcon from "@mui/icons-material/Settings";
import "./index.css";
import "root.css";
import { CreateCode } from "./code-editor/code-editor.create";
import { CreateUser } from "./users/user.create";
import { UpdateUser } from "./users/user.edit";
import { ListUsers } from "./users/user.list";

export function ApplicationRoutes() {
  let auth = useAuth();

  const location = useLocation<any>();

  const [activePath, setActivePath] = useState<string>("/");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return auth.user ? (
    <>
      <AuthVerifier />
      <div id="sidebar">
        <nav>
          Bem vindo, {auth.user.userName}
          <ul>
            <li>
              <Link
                className={activePath === "/live" ? "active" : ""}
                to="/live"
              >
                Live <PodcastsIcon color="error" />
              </Link>
            </li>
            <li>
              <Link
                className={activePath === "/code" ? "active" : ""}
                to="/code"
              >
                Code <CodeIcon />
              </Link>
            </li>
            <li>
              <Link
                className={activePath === "/settings" ? "active" : ""}
                to="/settings"
              >
                Configurações <SettingsIcon />
              </Link>
            </li>
          </ul>
        </nav>
        <div id="logout">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => auth.signout()}
          >
            Logout
          </Button>
        </div>
      </div>
      <div id="detail" style={{ overflow: "scroll" }}>
        <Switch>
          <Route exact path="/login">
            <LoginRoute />
          </Route>
          <Route exact path={"/code"} children={<ListUsers />} />
          <Route path={"/code/new"}>
            <CreateCode />
          </Route>

          <Route exact path={"/users"} children={<ListUsers />} />
          <Route path={"/users/new"}>
            <CreateUser />
          </Route>
          <Route path={"/users/:id"}>
            <UpdateUser />
          </Route>
        </Switch>
      </div>
    </>
  ) : (
    <LoginRoute />
  );
}
