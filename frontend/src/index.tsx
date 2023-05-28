import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { Root } from "ui/root";

import reportWebVitals from "./reportWebVitals";

import { Toaster } from "react-hot-toast";

import { RecoilRoot } from "recoil";

const theme = createTheme({
  palette: {
    background: {
      default: "#252525",
    },
    primary: {
      main: "#252525",
      contrastText: "#f6f3e4",
    },
    secondary: {
      main: "#f6f3e4",
      contrastText: "#c56b65",
    },
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: ({ ownerState }) => ({
  //         ...(ownerState.variant === "outlined" && {
  //           ":hover": {
  //             backgroundColor: "#c56b65",
  //             color: "#f6f3e4",
  //           },
  //         }),
  //         ...(ownerState.variant === "contained" && {
  //           ":hover": {
  //             backgroundColor: "#252525",
  //             color: "#f6f3e4",
  //           },
  //         }),
  //       }),
  //     },
  //   },
  // },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecoilRoot key={Math.random()}>
        <Root />
        <Toaster />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
