export interface IResourceResponse<T> {
  code: string;
  message: string;
  details?: unknown;
  data: Partial<T> | null;
}

export class ResourceResponse<T> implements IResourceResponse<T> {
  public code;
  public message;
  public details;
  public data;

  constructor({ code, message, details, data }: IResourceResponse<T>) {
    this.code = code;
    this.message = message;
    this.details = details;
    this.data = data;
  }
}
