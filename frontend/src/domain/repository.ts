import { serverEndpoint } from "env-constants";
import { BaseInfrastructure } from "infrastructure";

import { IUserRepository, UserRepository } from "./entities/user.repository";
import { IAuthRepository, AuthRepository } from "./entities/auth.repository";

export interface IRepositories {
  user: IUserRepository;

  auth: IAuthRepository;
}

export function BaseRepository(): IRepositories {
  const infra = BaseInfrastructure();

  return {
    user: new UserRepository(serverEndpoint, infra.http, infra.storage.token),
    auth: new AuthRepository(serverEndpoint, infra.http, infra.storage.token),
  };
}
