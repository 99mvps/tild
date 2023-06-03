import { Inject, Injectable, Logger } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UUIDVersion } from "class-validator";
import { FilterUsersDTO } from "./dto/user.dto";
import { IResourceResponse } from "src/app-response.http-filter";

interface IUserService {
  findUserByEmail(userEmail: string): Promise<User | null>;
  findAll(params: FilterUsersDTO): Promise<IResourceResponse<User[]>>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(Logger) readonly logger: Logger
  ) {}

  async findUserByEmail(userEmail: string) {
    return this.userRepository
      .createQueryBuilder()
      .where("email = :userEmail", { userEmail })
      .getOne();
  }

  async find(userId: UUIDVersion): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id: userId as string,
      },
    });
  }

  async findAll(params: FilterUsersDTO) {
    const users = await this.userRepository.createQueryBuilder().where(params).getMany();

    return {
      code: "USERS_LIST",
      message: "A lista de usuários.",
      data: users,
    };
  }
}
