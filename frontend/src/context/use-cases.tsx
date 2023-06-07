import React, { createContext, ReactNode, useContext } from "react";
import { TAuthUseCases } from "domain/use-case/auth.use-cases";
import { TUserUseCase } from "domain/use-case/user.use-cases";
import { TCodeEditorUseCases } from "domain/use-case/code-editor.use-cases";

import * as UserUseCases from "domain/use-case/user.use-cases";
import * as AuthUseCases from "domain/use-case/auth.use-cases";
import * as CodeEditorUseCases from "domain/use-case/code-editor.use-cases";

interface IUseCase {
  UserUseCases: TUserUseCase;
  AuthUseCases: TAuthUseCases;
  CodeEditorUseCases: TCodeEditorUseCases;
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
        CodeEditorUseCases,
      }}
    >
      {children}
    </UseCasesContext.Provider>
  );
}

export const useCases = () => {
  return useContext(UseCasesContext) as IUseCase;
};
