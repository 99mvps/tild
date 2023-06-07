import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/user.entity";
import * as bcrypt from "bcrypt";
import { UsersDTO } from "src/users/dto/user.dto";
import { UserRoles } from "src/users/user.enum";
import { AuthDTO } from "./dto/auth.dto";

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

@Injectable()
export class AuthService {
  constructor(readonly userService: UserService, private jwtService: JwtService) {}

  async validateUser(userEmail: string, pass: string): Promise<Omit<User, "password"> | null> {
    const user = await this.userService.findUserByEmail(userEmail);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado.", {
        cause: "Senha errada, ou usuário desconhecido." as unknown as Error,
      });
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
    let allowedPaths: string[] = [];

    if (user.role === UserRoles.STREAMER) {
      allowedPaths = ["/dashboard", "/settings", "/code", "/live"];
    }

    if (user.role === UserRoles.USER) {
      allowedPaths = ["/settings", "/code", "/live"];
    }

    const payload = {
      sub: user.id,
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
      userProfileImage: user.profileImage,
      userPermissions: { allowedPaths },
    };

    return {
      code: AuthDTO.success,
      message: AuthDTO.successMessage,
      data: {
        accessToken: this.jwtService.sign(payload),
      },
    };
  }
}
