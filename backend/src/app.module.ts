import { Module, Scope } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { setEnvironment } from "./env";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";
import typeormConfig from "./database/typeorm.config";
import { AppController } from "./app.controller";
import { APP_FILTER } from "@nestjs/core";
import { ExceptionResponseFilter } from "./app-exception-response.http-filter";
import { CodeEditorModule } from "./code-editor/code-editor.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    UserModule,
    CodeEditorModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      scope: Scope.REQUEST,
      useClass: ExceptionResponseFilter,
    },
  ],
})
export class AppModule {}
