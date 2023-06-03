import { serverEndpoint } from "env-constants";
import { IHttp } from "infrastructure/adapter/http";
import { ITokenStorage } from "infrastructure/adapter/storage/token";

export abstract class AbstractRepository {
  /**
   * the serverURL
   *
   * @type {string}
   * @memberof AbstractRepository
   */
  protected readonly _repoUrl: URL;

  /**
   * http client
   *
   * @type {IHttp}
   * @memberof AbstractRepository
   */
  protected readonly http: IHttp;

  /**
   * Creates an instance of AbstractRepository.
   * @param {string} basePath server endpoint base path
   * @param {IHttp} http http client
   * @memberof AbstractRepository
   */
  constructor(basePath: string, http: IHttp, userToken: ITokenStorage) {
    this._repoUrl = new URL(basePath, serverEndpoint);
    this.http = http;
    this.http.setBearerTokenHeader(userToken.getRawToken());
  }

  /**
   * The repository URLK
   *
   * @readonly
   * @type {string}
   * @memberof AbstractRepository
   */
  get apiEndpoint(): string {
    return this._repoUrl.toString();
  }

  /**
   * Set the url search params
   *
   * @private
   * @param {FilterUserDTO} searchParams the search params
   * @memberof AbstractRepository
   */
  setSearchParams<T>(searchParams: T) {
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        this._repoUrl.searchParams.set(key, value as string);
      });
    }
  }

  async requestHandler(response: Response, errorMessage: string) {
    const result = await response.json();

    if (!response.ok) {
      throw new Error(errorMessage, {
        cause: result,
      });
    }

    return result;
  }
}
