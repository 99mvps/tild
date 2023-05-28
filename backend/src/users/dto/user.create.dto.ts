import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

import { UsersDTO } from "./user.dto";
import {
  IsString,
  MinLength,
  Matches,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  IsEnum,
} from "class-validator";
import { UserRoles } from "../user.enum";

export class CreateUserDTO extends PartialType(
  OmitType(UsersDTO, ["id", "deletedAt", "updatedAt"] as const)
) {
  static success = "USER_CREATED";
  static successMessage = "Usuário criado com sucesso.";

  static fail = "USER_CREATION_FAIL";
  static failMessage = "Erro ao criar usuário.";

  @ApiProperty({
    name: "name",
    description: "O nome do usuário.",
    example: "Jhon Doe",
  })
  @IsNotEmpty({
    message: "Deve informar o nome do usuário.",
  })
  name: string;

  @ApiProperty({
    name: "email",
    description: "O email do usuário.",
    example: "jhon.doe@email.com",
  })
  @IsNotEmpty({
    message: "Precisa informar um email.",
  })
  @IsEmail({}, { message: "Email inválido." })
  @MaxLength(64)
  email: string;

  @ApiProperty({
    name: "role",
    type: "enum",
    enum: UserRoles,
  })
  @IsEnum(UserRoles)
  role: UserRoles;

  @ApiProperty({
    name: "password",
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
