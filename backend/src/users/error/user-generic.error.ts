export class UserGenericError extends Error {
  readonly message: string;
  readonly cause: Record<string, string> | undefined;

  constructor(message: string, cause?: Record<string, string>) {
    super(message);

    this.name = this.constructor.name;
    this.cause = cause;
    this.message = message;
  }
}
