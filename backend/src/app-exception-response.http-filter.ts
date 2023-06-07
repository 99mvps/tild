import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";

@Catch()
export class ExceptionResponseFilter implements ExceptionFilter {
  protected readonly logger = new Logger(this.constructor.name);

  async catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const statusCode =
      exception.response?.statusCode || exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

    const severity = statusCode <= 500 ? "error" : statusCode >= 400 ? "warn" : "log";

    this.logger[severity](JSON.stringify(exception, null, 2));

    let details = exception.cause?.detail ?? exception.options?.cause ?? "unknown details";

    if (exception instanceof InternalServerErrorException && !process.env.DEBUG) {
      this.logger.error(JSON.stringify(details, null, 2));
      details = null;
    }

    const code = exception.name ?? exception.response?.error ?? "unknown code";

    const message = exception.message ?? exception.response?.message ?? "unknown message";

    response.status(statusCode).json({
      code,
      message,
      details,
    });
  }
}
