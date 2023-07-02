/**
 * Http Cliente Params
 *
 * @export
 * @interface IHttpRequestOption
 */
export interface IHttpRequestOption {
  readonly url: string;
  readonly method?: string;
  readonly headers?: any;
  readonly body?: any;
}

/**
 *
 * Http client interface
 * @export
 * @interface IHttp
 */
export interface IHttp {
  request(requestOption: IHttpRequestOption): Promise<Response>;
  setBearerToken(token: string): void;
}

/**
 *
 * Don't have much to say, but it's a basic class that implements
 * the fetch Nodejs builtin  lib
 * @class Http
 * @implements {IHttp}
 */
export class Http implements IHttp {
  private bearerToken = "EMPTY_TOKEN";

  public setBearerToken(token: string) {
    this.bearerToken = `Bearer ${token}`;
  }

  /**
   * Trigger the request to the server
   *
   * @param requestOption http client request options
   * @return response
   * @memberof Http
   */
  async request(requestOption: IHttpRequestOption) {
    let option: RequestInit = {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    };

    if (requestOption.method) {
      option = {
        ...option,
        method: requestOption.method,
      };
    }

    if (this.bearerToken !== "EMPTY_TOKEN") {
      option = {
        ...option,
        headers: {
          ...option.headers,
          Authorization: this?.bearerToken,
        },
      };
    }

    option.headers = new Headers(option.headers);

    if (
      requestOption?.body &&
      !["GET", "HEAD"].includes(String(option.method))
    ) {
      option = {
        ...option,
        body: JSON.stringify(requestOption?.body),
      };
    }

    return fetch(requestOption.url, option);
  }
}
