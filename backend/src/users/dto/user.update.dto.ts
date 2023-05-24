import { PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from "./user.create.dto";

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  static success = "USER_UPDATED";
  static successMessage = "Usuário atualizado com sucesso.";

  static fail = "USER_UPDATE_FAIL";
  static failMessage = "Erro ao atualizar usuário.";
}
