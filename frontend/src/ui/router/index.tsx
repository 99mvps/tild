import { Switch, Route } from "react-router-dom";
import { Box } from "@mui/material";

import { useAuth } from "context/use-auth";
import { UserLogin } from "ui/auth/auth.login";
import { UserRBACRouterController } from "domain/user-rbac";
import { LiveShow } from "../live/live.show";

import { HomePage } from "../home/home.show";
import { Dashboard } from "../dashboard/dashboard.show";

import { UserCodeOfConduct } from "../user-profile/user-code-of-conduct";
import { SidebarNavigation } from "./components/sidebar-navigation";

import NotLogged from "./components/not-logged";

export function ApplicationRoutes() {
  const auth = useAuth();

  return !auth.user ? (
    <NotLogged />
  ) : (
    <>
      <UserRBACRouterController />
      <SidebarNavigation />
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
            <UserLogin />
          </Route>
          <Route exact path={"/live/:id?"}>
            <LiveShow />
          </Route>
        </Switch>
      </Box>
    </>
  );
}
