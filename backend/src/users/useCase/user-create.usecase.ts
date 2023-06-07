import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "../user.entity";
import { QueryFailedError, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "../dto/user.create.dto";
import { IResourceResponse, ResourceResponse } from "src/app-response.http-filter";
import { UsersDTO } from "../dto/user.dto";
import { UserRoles } from "../user.enum";

export interface IUserCreateUseCase {
  execute(user: CreateUserDTO): Promise<IResourceResponse<UsersDTO>>;
}

@Injectable()
export class UserCreateUseCase implements IUserCreateUseCase {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async execute(user: CreateUserDTO) {
    try {
      // For now every user will be of this type
      user.role = UserRoles.STREAMER;

      const newUser = await this.usersRepository.save(user);

      return new ResourceResponse<UsersDTO>({
        code: CreateUserDTO.success,
        message: CreateUserDTO.successMessage,
        data: newUser,
      });
    } catch (error: any) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        throw new ConflictException(CreateUserDTO.failMessage, {
          cause: error,
        });
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
