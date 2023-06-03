import { IHttp } from "infrastructure/adapter/http";
import { ITokenStorage } from "infrastructure/adapter/storage/token";
import { AuthCredentials, JWTAccessToken } from "ui/auth/auth.interfaces";
import { AbstractRepository } from "./abstract.repository";

export interface IAuthRepository {
  checkCredentials({
    username,
    password,
  }: AuthCredentials): Promise<JWTAccessToken>;
}

export class AuthRepository
  extends AbstractRepository
  implements IAuthRepository
{
  /**
   * Creates an instance of AuthRepository.
   * @param {string} baseUrl server url
   * @param {IHttp} http http client
   * @memberof AuthRepository
   */
  constructor(http: IHttp, userToken: ITokenStorage) {
    super("/auth/login", http, userToken);
  }

  async checkCredentials({
    username,
    password,
  }: AuthCredentials): Promise<JWTAccessToken> {
    const response = await this.http.request({
      method: "POST",
      url: this.apiEndpoint,
      body: { username, password },
    });

    const { data } = await this.requestHandler(
      response,
      "Erro ao realizar o login"
    );

    return data;
  }
}
