import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { UserRoles } from "../user.enum";
import { IsEmail, IsEnum, IsNotEmpty, MaxLength } from "class-validator";

export class UsersDTO {
  @ApiProperty({
    description: "O ID do usuário.",
    example: "296317cd-e432-4f97-82b0-eadcfb02d642",
  })
  id: string;

  @IsNotEmpty({
    message: "Deve informar o nome do usuário.",
  })
  @ApiProperty({
    description: "O nome do usuário.",
    example: "Jhon Doe",
  })
  name: string;

  @ApiProperty({
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
    type: "enum",
    enum: UserRoles,
  })
  @IsEnum(UserRoles)
  role: UserRoles;

  @ApiProperty({ description: "A data de criação do usuário." })
  createdAt: Date;

  @ApiProperty({ description: "A data de atualização do usuário." })
  updatedAt?: Date;

  @ApiProperty({ description: "A data de deleção do usuário." })
  deletedAt?: Date;
}

export class FilterUsersDTO extends PartialType(
  OmitType(UsersDTO, ["id", "createdAt", "updatedAt"] as const)
) {}
