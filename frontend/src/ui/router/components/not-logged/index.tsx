import React from "react";
import { UserLogin } from "ui/auth/auth.login";
import { HomePage } from "ui/home/home.show";
import { UserCodeOfConduct } from "ui/user-profile/user-code-of-conduct";
import { UserProfileRegistration } from "ui/user-profile/user-profile.create";
import { Location } from "history";
import { useLocation } from "react-router-dom";

interface NotLoggedProps {}

const NotLogged: React.FC<NotLoggedProps> = () => {
  const location: Location = useLocation();

  if (location.pathname === "/") {
    return <HomePage />;
  }

  if (location.pathname === "/register") {
    return <UserProfileRegistration />;
  }

  if (location.pathname === "/code-of-conduct") {
    return <UserCodeOfConduct />;
  }

  return <UserLogin />;
};

export default NotLogged;
