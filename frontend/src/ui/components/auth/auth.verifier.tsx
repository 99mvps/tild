import { Redirect, useLocation, withRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuth } from "context/use-auth";
import { Location } from "history";

function AuthVerify() {
  const auth = useAuth();
  const userToken = auth.getUserToken();
  const location = useLocation<Location>();
  const userPermission = auth.getUserPermissions.checkPermission(
    auth.user?.userRole,
    location.pathname
  );

  useEffect(() => {
    if (userToken?.expired) {
      auth.signout();
    }
  }, [location.pathname, userToken, auth]);

  if (!userPermission?.allowed) {
    return <Redirect to={userPermission.redirectTo} />;
  }

  return <></>;
}

export const AuthVerifier = withRouter(AuthVerify);
