import React from "react";

import { ApplicationRoutes } from "./router";

import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AuthProvider } from "context/use-auth";
import { UseCasesProvider } from "context/use-cases";

import "./root.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const history = createBrowserHistory();

export function Root() {
  return (
    <Router history={history}>
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
      <UseCasesProvider>
        <AuthProvider>
          <ApplicationRoutes />
        </AuthProvider>
      </UseCasesProvider>
    </Router>
  );
}
