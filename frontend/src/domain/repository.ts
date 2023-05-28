import { BaseInfrastructure } from "infrastructure";

import { IUserRepository, UserRepository } from "./repository/user.repository";
import { IAuthRepository, AuthRepository } from "./repository/auth.repository";
import {
  CodeEditorRepository,
  ICodeEditorRepository,
} from "./repository/code-editor.repository";

export interface IRepositories {
  user: IUserRepository;
  auth: IAuthRepository;
  codeEditor: ICodeEditorRepository;
}

export function BaseRepository(): IRepositories {
  const infra = BaseInfrastructure();

  return {
    user: new UserRepository(infra.http, infra.storage.token),
    auth: new AuthRepository(infra.http, infra.storage.token),
    codeEditor: new CodeEditorRepository(infra.http, infra.storage.token),
  };
}
