import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { User } from "../user.entity";
import { Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IResourceResponse, ResourceResponse } from "src/app-response.http-filter";
import { UsersDTO } from "../dto/user.dto";
import { UUIDVersion } from "class-validator";
import { UpdateUserDTO } from "../dto/user.update.dto";

export interface IUserUpdateUseCase {
  execute(userId: UUIDVersion, user: UpdateUserDTO): Promise<IResourceResponse<UsersDTO>>;
}

@Injectable()
export class UserUpdateUseCase implements IUserUpdateUseCase {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async execute(userId: UUIDVersion, user: UpdateUserDTO) {
    try {
      const { affected }: UpdateResult = await this.usersRepository.update(userId, user);

      if (!affected) {
        throw new UnprocessableEntityException();
      }

      return new ResourceResponse<UsersDTO>({
        code: UpdateUserDTO.success,
        message: UpdateUserDTO.successMessage,
        data: user,
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
