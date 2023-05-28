import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
  useMemo,
} from "react";

import { BaseInfrastructure } from "infrastructure";
import { UserRoles } from "ui/users/user.interfaces";

import { JWTUserToken } from "ui/auth/auth.interfaces";
import { ITokenStorage } from "infrastructure/adapter/storage/token";
import { useCases } from "./use-cases";
import { TErrorMessage } from "ui/components/error";
import toast from "react-hot-toast";
import { Permission } from "domain/permissions";

type Auth = {
  user: JWTUserToken | undefined;
  signin: (username: string, password: string) => Promise<string>;
  signout: () => void;
  getUserToken: () => JWTUserToken | undefined;
  getUserPermissions: Permission;
};

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const {
    storage: { token },
  } = BaseInfrastructure();

  const auth = useProvideAuth(token);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth(token: ITokenStorage) {
  const [user, setUser] = useState<JWTUserToken>();
  const { AuthUseCases } = useCases();

  const postLoginRedirect = useMemo(() => {
    const redirectPaths = {
      [UserRoles.ADMIN]: "/dashboard",
      [UserRoles.STREAMER]: "/dashboard",
      [UserRoles.USER]: "/",
    };

    return (role: UserRoles) => redirectPaths[role];
  }, []);

  useEffect(() => {
    setUser(token.get());
  }, [token]);

  return {
    user,
    signin: async (username: string, password: string): Promise<string> => {
      AuthUseCases.login(
        {
          username,
          password,
        },
        {
          onSuccess: ({ accessToken }) => {
            token.set(accessToken);

            setUser(token.get());
          },
          onError: ({ title, errors }: TErrorMessage) => {
            toast.error(`${title}: "${errors}"`);
          },
        }
      );

      return postLoginRedirect(user?.userRole ?? UserRoles.USER);
    },
    signout: () => {
      setUser(undefined);

      token.remove();
    },
    getUserToken: () => token.get(),
    getUserPermissions: new Permission(user as JWTUserToken),
  };
}

export const useAuth = (): Auth => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
};
