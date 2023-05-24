import React, { createContext, ReactNode, useContext } from "react";
import { TAuthUseCases } from "use-case/auth.use-cases";
import { TUserUseCase } from "use-case/user.use-cases";

import * as UserUseCases from "use-case/user.use-cases";
import * as AuthUseCases from "use-case/auth.use-cases";

interface IUseCase {
  UserUseCases: TUserUseCase;
  AuthUseCases: TAuthUseCases;
}

const UseCasesContext = createContext<IUseCase | null>(null);

export function UseCasesProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <UseCasesContext.Provider
      value={{
        UserUseCases,
        AuthUseCases,
      }}
    >
      {children}
    </UseCasesContext.Provider>
  );
}

export const useCases = () => {
  return useContext(UseCasesContext) as IUseCase;
};
