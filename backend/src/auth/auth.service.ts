import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/user.entity";
import * as bcrypt from "bcrypt";
import { UsersDTO } from "src/users/dto/user.dto";

export const jwtConstants = {
  secret: "05e9eadd-d1c7-490c-a74f-0f8ec2b67beb",
};

@Injectable()
export class AuthService {
  constructor(readonly userService: UserService, private jwtService: JwtService) {}

  async validateUser(userEmail: string, pass: string): Promise<Omit<User, "password"> | null> {
    const user = await this.userService.findUserByEmail(userEmail);

    if (!user) {
      throw new NotFoundException("não achamo pivete");
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (user && isPasswordValid) {
      // eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UsersDTO) {
    const payload = {
      sub: user.id,
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
