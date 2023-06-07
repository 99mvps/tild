import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { Root } from "ui/root";

import reportWebVitals from "./reportWebVitals";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RecoilRoot } from "recoil";

const theme = createTheme({
  palette: {
    background: {
      default: "#252525",
      paper: "#f5f5f5",
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
  // #CC102D
  // #E88514
  // #FFFF28
  // #7DC62C
  // #71C0DE
  // #634C8A

  // #CC102D
  // #F6F3E4
  // #E0BFBF
  // #C98F8F
  // #B35E5E
  // #9D2E2E
  // #870000
  // #700000
  // #CC102D

  // #E88514
  // #F6F3E4
  // #E0CEC0
  // #C9A89C
  // #B38378
  // #9D5E54
  // #874930
  // #70340C
  // #E88514

  // #FFFF28
  // #F6F3E4
  // #E2E2BD
  // #CDCD97
  // #B9B971
  // #A6A64B
  // #929225
  // #7F7F00
  // #FFFF28

  // #7DC62C
  // #F6F3E4
  // #DCE2C1
  // #C2D39F
  // #A8C57C
  // #8EB659
  // #74A836
  // #5A9A13
  // #7DC62C

  // #71C0DE
  // #F6F3E4
  // #C2D6E2
  // #9DBBCE
  // #78A1BA
  // #5386A6
  // #2E6C92
  // #0A5180
  // #084668

  // #634C8A
  // #F6F3E4
  // #BDB8D0
  // #9590AB
  // #6D6896
  // #454481
  // #1D1E6C
  // #050557
  // #040347
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
