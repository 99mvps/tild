import React from "react";

import { ApplicationRoutes } from "./router";

import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AuthProvider } from "context/use-auth";
import { UseCasesProvider } from "context/use-cases";

import "./root.css";

const history = createBrowserHistory();

export function Root() {
  return (
    <Router history={history}>
      <UseCasesProvider>
        <AuthProvider>
          <ApplicationRoutes />
        </AuthProvider>
      </UseCasesProvider>
    </Router>
  );
}
