import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { Langs } from "../code-editor.enum";
import { User } from "src/users/user.entity";

export class CodeEditorDTO {
  @ApiProperty({
    description: "O ID do tild.",
    example: "296317cd-e432-4f97-82b0-eadcfb02d642",
  })
  id: string;

  @ApiProperty({
    name: "title",
    description: "O título do tild.",
    example: "Estudando algoritmos :3",
  })
  title: string;

  @ApiProperty({
    description: "A linguagem do tild.",
    example: "javascript",
  })
  lang?: Langs;

  @ApiProperty({
    description: "Indica se a live foi iniciada.",
    example: true,
  })
  live: boolean;

  @ApiProperty({ name: "createdAt", description: "A data de criação do tild." })
  createdAt: Date;

  @ApiProperty({ name: "updatedAt", description: "A data de atualização do tild." })
  updatedAt?: Date;

  @ApiProperty({ name: "deletedAt", description: "A data de deleção do tild." })
  deletedAt?: Date;

  @ApiProperty({ name: "user", description: "O usuário." })
  user: User;
}

export class FilterCodeEditorDTO extends PartialType(CodeEditorDTO) {}

export class CreateCodeEditorDTO extends PartialType(
  OmitType(CodeEditorDTO, ["id", "createdAt", "deletedAt", "updatedAt"] as const)
) {
  static success = "CODE_EDITOR_CREATED";
  static successMessage = "editor de código criado com sucesso.";

  static fail = "CODE_EDITOR_CREATION_FAIL";
  static failMessage = "Erro ao criar editor de código.";

  @IsNotEmpty({
    message: "Deve informar um título.",
  })
  @MaxLength(128, {
    message: "O título não deve ultrapassar 128 caracteres.",
  })
  title: string;

  @IsNotEmpty({
    message: "Deve informar o nome do usuário.",
  })
  @IsEnum(Langs, {
    message: "A Linguagem informada não é permitida.",
  })
  lang: Langs;

  @IsNotEmpty({
    message: "Precisa informar se a live foi iniciada.",
  })
  live: boolean;
}

export class UpdateCodeEditorDTO extends PartialType(CreateCodeEditorDTO) {
  static success = "CODE_EDITOR_UPDATED";
  static successMessage = "editor de código editado com sucesso.";

  static fail = "CODE_EDITOR_UPDATE_FAIL";
  static failMessage = "Erro ao editar editor de código.";
}

export class DeleteCodeEditorDTO extends PartialType(CodeEditorDTO) {
  static success = "CODE_EDITOR_DELETED";
  static successMessage = "editor de código excluído com sucesso.";

  static fail = "CODE_EDITOR_DELETION_FAIL";
  static failMessage = "Erro ao excluir editor de código.";

  @IsNotEmpty({
    message: "Precisa informar a data de deleção.",
  })
  deletedAt?: Date;
}
