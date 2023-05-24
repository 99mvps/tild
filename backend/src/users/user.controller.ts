import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Get,
  Param,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  CreateUserApiDoc,
  DeleteUserApiDoc,
  GetAllUsersApiDoc,
  UpdateUserApiDoc,
} from "./user.controller.api-doc";

import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/user.create.dto";
import { UpdateUserDTO } from "./dto/user.update.dto";
import { FilterUsersDTO, UsersDTO } from "./dto/user.dto";

import { UUIDVersion } from "class-validator";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { IResourceResponse } from "src/app-response.http-filter";
import { UserCreateUseCase } from "./useCase/user-create.usecase";
import { User } from "./user.entity";
import { UserUpdateUseCase } from "./useCase/user-update.usecase";
import { UserDeletionUseCase } from "./useCase/user-deletion.usecase";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(
    readonly userService: UserService,
    readonly createUser: UserCreateUseCase,
    readonly updateUser: UserUpdateUseCase,
    readonly deleteUser: UserDeletionUseCase
  ) {}

  // TODO ⚠️ create a specific temp auth method to allow only "authenticated" clients could post on this resource
  @Post()
  @CreateUserApiDoc()
  async create(@Body() createUser: CreateUserDTO): Promise<IResourceResponse<UsersDTO>> {
    return this.createUser.execute(createUser);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @UpdateUserApiDoc()
  async update(
    @Param("id") userId: UUIDVersion,
    @Body() updatedUser: UpdateUserDTO
  ): Promise<IResourceResponse<UsersDTO>> {
    return this.updateUser.execute(userId, updatedUser);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @DeleteUserApiDoc()
  async removeUser(@Param("id") userId: UUIDVersion): Promise<IResourceResponse<UsersDTO>> {
    return this.deleteUser.execute(userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @GetAllUsersApiDoc()
  async getAllUsers(@Query() queryFilter: FilterUsersDTO): Promise<IResourceResponse<User[]>> {
    return this.userService.findAll(queryFilter);
  }
}
