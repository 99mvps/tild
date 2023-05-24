import { NestFactory } from "@nestjs/core";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationError } from "class-validator";

const serverPort = process.env.PORT || 3000;
const version = process.env.npm_package_version;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      stopAtFirstError: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const customErrors = errors.map(
          ({ value, property, constraints }: Partial<ValidationError>) => {
            const [constraintName] = Object.keys(constraints || {});
            let constraintMessage = "unknown constraints message";

            if (constraints && constraintName) {
              constraintMessage = constraints[constraintName];
            }

            return {
              field: property,
              message: constraintMessage,
              value,
            };
          }
        );

        return new BadRequestException("Bad Request", {
          cause: customErrors as unknown as BadRequestException,
        });
      },
    })
  );

  //Swagger configurations
  const options = new DocumentBuilder()
    .setTitle("tild")
    .setDescription("live coding system")
    .setVersion(version as string)
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "access-token")
    .build();

  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, options));

  await app.listen(serverPort);
}

bootstrap();
