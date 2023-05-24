import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

import { UsersDTO } from "./user.dto";
import { IsString, MinLength, Matches } from "class-validator";

export class CreateUserDTO extends PartialType(
  OmitType(UsersDTO, ["id", "deletedAt", "updatedAt"] as const)
) {
  static success = "USER_CREATED";
  static successMessage = "Usuário criado com sucesso.";

  static fail = "USER_CREATION_FAIL";
  static failMessage = "Erro ao criar usuário.";

  @ApiProperty({
    description: "A senha do usuário.",
    example: "SECRET",
  })
  @IsString({
    message: "Uma senha deve ser fornecida.",
  })
  @MinLength(6, {
    message: "A senha precisa ter pelo menos 6 caracteres.",
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Senha muito fraca. Obrigatório uma letra maiúscula, uma minúsucula, um número e um caracter especial.",
  })
  password: string;
}
