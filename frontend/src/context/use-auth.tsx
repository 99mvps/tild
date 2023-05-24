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
import { TErrorMessage } from "components/error";
import toast from "react-hot-toast";

type Auth = any | null;

const AuthContext = createContext<Auth>(null);

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

  const postLoginRedirect = useMemo(
    () => (role: string) =>
      ({
        [UserRoles.ADMIN]: "/users",
        [UserRoles.STREAMER]: "/dashboard",
        [UserRoles.USER]: "/",
      }[role]),
    []
  );

  const userPermission = (role: string) =>
    ({
      [UserRoles.ADMIN]: (permission: string) => ({
        allowed: !!permission,
        redirectTo: "/",
      }),
      [UserRoles.STREAMER]: (permission: string) => ({
        allowed: ["/", "/dashboard", "/profile", "/streams"].includes(
          permission
        ),
        redirectTo: "/dashboard",
      }),
      [UserRoles.USER]: (permission: string) => ({
        allowed: ["/"].includes(permission),
        redirectTo: "/",
      }),
    }[role]);

  const signin = async (
    username: string,
    password: string
  ): Promise<string> => {
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

    return postLoginRedirect(user?.userRole || "") as string;
  };

  const signup = async (username: string, password: string) => {
    throw new Error("not implemented yet");
  };

  const signout = () => {
    setUser(undefined);

    token.remove();
  };

  const getUserToken = () => {
    return token.get();
  };

  useEffect(() => {
    setUser(token.get());
  }, [token]);

  return {
    user,
    signin,
    signup,
    signout,
    getUserToken,
    userPermission,
  };
}

export const useAuth = () => {
  return useContext(AuthContext);
};
