import { Controller, UseGuards, Get } from "@nestjs/common";
import { JwtAuthGuard } from "./auth/jwt.guard";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
  @Get("/")
  public() {
    return "~";
  }

  @ApiOkResponse({
    description: "PING-PONG.",
  })
  @Get("/ping")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  _private() {
    return "pong.";
  }
}
