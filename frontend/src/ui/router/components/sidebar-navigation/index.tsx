import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Switch } from "@mui/material";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import {
  DashboardCustomize,
  Logout as LogoutIcon,
  LiveTv as LiveTvicon,
} from "@mui/icons-material";
import { CreateCodeEditor } from "ui/code-editor/code-editor.create";
import { useAuth } from "context/use-auth";
import logo from "../../../assets/logo.png";
import { BigHead } from "@bigheads/core";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useCases } from "context/use-cases";
import { applicationState } from "domain/state/general-application.recoil";
import { toast } from "react-toastify";
import { TErrorMessage } from "ui/components/error";

export function SidebarNavigation(): JSX.Element | null {
  let auth = useAuth();
  const {
    CodeEditorUseCases: { update },
  } = useCases();

  const LinkStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: ".5rem 1.5rem",
    color: "inherit",
    textDecoration: "none",
  };

  const location: Location = useLocation();

  const history = useHistory();

  const [activePath, setActivePath] = useState<string>("/");

  const setAppState = useSetRecoilState(applicationState);

  const [{ live, tildId }] = useRecoilState(applicationState);

  const shouldShowSidebarMenu = (path: string) =>
    !["/", "/code-of-conduct"].includes(path);

  const handleSwitchChange = () => {
    setAppState({
      live: !live,
      tildId,
    });

    update(
      tildId,
      {
        live: !live,
      },
      {
        onError: ({ title, errors }: TErrorMessage) =>
          toast.error(`${title}: ${errors}`),
      }
    );
  };

  const setLinkActive = (path: string) =>
    activePath.startsWith(path) && activePath !== "/settings"
      ? {
          background: "#c9c9c9",
        }
      : {};

  const buttonNewCodeSx = () =>
    location.pathname !== "/code/new"
      ? {
          bgcolor: "secondary.main",
          color: "crimson",
          "&:hover": {
            bgcolor: "#9146FF",
            color: "secondary.main",
          },
          "& .MuiButton-startIcon": {
            display: "flex",
            justifyContent: "center",
          },
        }
      : {
          bgcolor: "#9146FF",
          color: "secondary.main",
        };

  useEffect(() => {
    setActivePath(location.pathname);
  }, [auth.user, history, location.pathname]);

  return shouldShowSidebarMenu(location.pathname) ? (
    <Box
      sx={{
        width: "22rem",
        backgroundColor: "#f7f7f7",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          alignSelf: "center",
          marginTop: "auto",
          marginBottom: "2rem",
        }}
      >
        <Link to="/">
          <img src={logo} alt="what'd you learn today?" />
        </Link>
      </Box>
      <Button
        variant="contained"
        component={RouterLink}
        to="/code/new"
        sx={{
          ...buttonNewCodeSx(),
          ...{
            width: "10rem",
            alignSelf: "center",
            marginTop: "auto",
            marginBottom: "2rem",
          },
        }}
        color="secondary"
        startIcon={<NoteAddIcon />}
      >
        Novo +
      </Button>
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          paddingTop: "1rem",
        }}
      >
        <nav>
          <ul
            style={{
              padding: 0,
              margin: 0,
              listStyle: "none",
            }}
          >
            <li>
              <Link
                style={{
                  ...LinkStyle,
                  ...setLinkActive("/dashboard"),
                  ...setLinkActive("/code/new"),
                }}
                to="/dashboard"
              >
                Dashboard <DashboardCustomize />
              </Link>
            </li>
            {live || (auth.user && location.pathname.startsWith("/live")) ? (
              <li color={"success"}>
                <Link
                  style={{ ...LinkStyle, ...setLinkActive("/live") }}
                  to={!live ? "/live" : `/live/${tildId}`}
                >
                  Live <LiveTvicon color={live ? "success" : "error"} />
                </Link>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box
                    sx={{
                      marginLeft: "2.5rem",
                    }}
                  >
                    {live ? "Online" : "Offline"}
                  </Box>
                  <Switch
                    sx={{
                      marginRight: ".5rem",
                    }}
                    checked={live}
                    onChange={handleSwitchChange}
                    color="success"
                  />
                </Box>
              </li>
            ) : null}
          </ul>
          <Box>
            <Route exact path="/code/new">
              <CreateCodeEditor />
            </Route>
          </Box>
        </nav>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: ".5rem 1.5rem",
        }}
      >
        <Link style={setLinkActive("/settings")} to="/settings">
          <Avatar sx={{ width: 60, height: 60 }}>
            {!auth.user?.userProfileImage && auth.user?.userName.slice(0, 1)}
            {auth.user?.userProfileImage && (
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
          sx={{
            bgcolor: "secondary.main",
            color: "crimson",
            "&:hover": {
              bgcolor: "#9146FF",
              color: "secondary.main",
            },
            "& .MuiButton-startIcon": {
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  ) : null;
}
