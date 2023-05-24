import { Logger, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { UserSubscriber } from "./user.subscriber";
import { UserCreateUseCase } from "./useCase/user-create.usecase";
import { UserUpdateUseCase } from "./useCase/user-update.usecase";
import { UserDeletionUseCase } from "./useCase/user-deletion.usecase";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    UserSubscriber,
    UserCreateUseCase,
    UserUpdateUseCase,
    UserDeletionUseCase,
    Logger,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
