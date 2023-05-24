import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { User } from "../user.entity";
import { Repository, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "../dto/user.create.dto";
import { IResourceResponse, ResourceResponse } from "src/app-response.http-filter";
import { UsersDTO } from "../dto/user.dto";
import { UUIDVersion } from "class-validator";
import { UpdateUserDTO } from "../dto/user.update.dto";

export interface IUserDeletionUseCase {
  execute(userId: UUIDVersion): Promise<IResourceResponse<UsersDTO>>;
}

@Injectable()
export class UserDeletionUseCase implements IUserDeletionUseCase {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async execute(userId: UUIDVersion) {
    try {
      const { affected }: DeleteResult = await this.usersRepository.softDelete(userId);

      if (!affected) {
        throw new UnprocessableEntityException();
      }

      return new ResourceResponse<UsersDTO>({
        code: CreateUserDTO.success,
        message: CreateUserDTO.successMessage,
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error: any) {
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(UpdateUserDTO.failMessage, {
          cause: error,
        });
      }
      throw new InternalServerErrorException(error.message, {
        cause: error,
      });
    }
  }
}
