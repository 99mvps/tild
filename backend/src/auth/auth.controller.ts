import { Controller, Request, Post, UseGuards, UnauthorizedException } from "@nestjs/common";
import { LocalAuthGuard } from "./local.guard";
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthDTO, BearerTokenDTO } from "./dto/auth.dto";

import { AuthService } from "./auth.service";
import { IResourceResponse } from "../app-response.http-filter";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOperation({
    summary: "Realiza o login de um usuário.",
  })
  @ApiBody({
    description: "Credenciais do usuário.",
    type: AuthDTO,
  })
  @ApiOkResponse({
    description: "Bearer token.",
    type: BearerTokenDTO,
  })
  @ApiNotFoundResponse({
    description: "Paciente não econtrado.",
    type: UnauthorizedException,
  })
  @ApiTags("Login")
  async login(@Request() req: AuthDTO): Promise<IResourceResponse<BearerTokenDTO>> {
    return this.authService.login(req.user);
  }
}
