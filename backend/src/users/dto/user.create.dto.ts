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
  IsBoolean,
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
    name: "codeConductAccept",
    description: "Check de aceitção do código de conduta.",
  })
  @IsNotEmpty({
    message: "Deve aceitar o código de conduta.",
  })
  @IsBoolean()
  codeConductAccept: boolean;

  @ApiProperty({
    name: "profileImage",
    description: "O nome do usuário.",
    example: {
      skinTone: "black",
      eyes: "normal",
      eyebrows: "serious",
      mouth: "grin",
      hair: "short",
      facialHair: "none2",
      clothing: "shirt",
      accessory: "none",
      graphic: "vue",
      hat: "none4",
      body: "chest",
      hairColor: "black",
      clothingColor: "white",
      circleColor: "blue",
      lipColor: "green",
      hatColor: "white",
      faceMaskColor: "black",
      mask: true,
      faceMask: false,
      lashes: true,
    },
  })
  profileImage?: string;

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
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).*$/, {
    message: "Senha muito fraca. Coloca pelo menos uma letra e um número.",
  })
  password: string;
}
