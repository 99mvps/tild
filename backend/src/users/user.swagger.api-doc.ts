import { applyDecorators, BadRequestException, UnprocessableEntityException } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { UsersDTO, FilterUsersDTO } from "./dto/user.dto";
import { UpdateUserDTO } from "./dto/user.update.dto";
import { DeleteResult } from "typeorm";
import { CreateUserDTO } from "./dto/user.create.dto";

export function CreateUserApiDoc() {
  return applyDecorators(
    ApiOperation({
      summary: "Cria um usuário",
    }),
    // ApiParam({
    //   name: "name",
    //   description:
    //     "This Decorator specifies the documentation for a specific Parameter, in this case the <b>name</b> Param.",
    //   allowEmptyValue: false,
    //   examples: {
    //     a: {
    //       summary: "Name is Pete",
    //       description:
    //         "Pete can be provided as a name. See how it becomes a selectable option in the dropdown",
    //       value: "Pete",
    //     },
    //     b: {
    //       summary: "Name is Joe",
    //       value: "Joe",
    //     },
    //   },
    // }),
    ApiBody({ type: CreateUserDTO }),
    ApiCreatedResponse({
      description: "Usuário criado.",
      schema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            example: "USER_CREATED",
          },
          message: {
            type: "string",
            example: "Usuário criado com sucesso.",
          },
          data: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "7392e65f-e909-4c0d-b7f0-ef3cfa4ad3d5",
              },
              name: {
                type: "string",
                example: "Jhon Doe",
              },
              profileImage: {
                type: "string",
                examples: [
                  {
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
                  "string",
                ],
              },
              codeConductAccept: {
                type: "boolean",
                example: "true",
              },
              role: {
                type: "string",
                example: "admin",
              },
              email: {
                type: "string",
                example: "jhon.doe@1email.com",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2023-05-22T01:01:36.472Z",
              },
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "A requisição não combina com o esperado.",
      schema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            example: "BadRequestException",
          },
          message: {
            type: "string",
            example: "Bad Request",
          },
          details: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: {
                  type: "string",
                  example: "password",
                },
                message: {
                  type: "string",
                  example:
                    "Senha muito fraca. Obrigatório uma letra maiúscula, uma minúsucula, um número e um caracter especial.",
                },
                value: {
                  type: "string",
                  example: "SECRET",
                },
              },
            },
          },
        },
      },
    }),
    ApiConflictResponse({
      description: "Erro ao criar o usuário.",
      schema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            example: "ConflictException",
          },
          message: {
            type: "string",
            example: "Erro ao criar usuário.",
          },
          details: {
            type: "string",
            example: "Key (email)=(jhon.doe@email.com) already exists.",
          },
        },
      },
    })
  );
}

export function UpdateUserApiDoc() {
  return applyDecorators(
    ApiBearerAuth("access-token"),
    ApiOperation({
      summary: "Edita um usuário.",
    }),
    ApiParam({
      name: "id",
      description: "Id do usuário",
      example: "c2fd0654-6f00-4d3d-a935-693979232eeb",
    }),
    ApiBody({
      description: "Dados do usuário.",
      type: UpdateUserDTO,
    }),
    ApiResponse({
      description: "Usuário atualizado.",
      type: UsersDTO,
    }),
    ApiBadRequestResponse({
      description: "A requisição não combina com o esperado.",
      type: BadRequestException,
    }),
    ApiUnprocessableEntityResponse({
      description: "Erro ao criar o paciente.",
      type: UnprocessableEntityException,
    })
  );
}

export function DeleteUserApiDoc() {
  return applyDecorators(
    ApiBearerAuth("access-token"),
    ApiOperation({
      summary: "Remove um usuário.",
    }),
    ApiParam({
      name: "id",
      description: "Id do usuário",
      example: "c2fd0654-6f00-4d3d-a935-693979232eeb",
    }),
    ApiResponse({
      description: "Confirmação de deleção.",
      type: DeleteResult,
    }),
    ApiBadRequestResponse({
      description: "A requisição não combina com o esperado.",
      type: BadRequestException,
    }),
    ApiUnprocessableEntityResponse({
      description: "Erro ao criar o usuário.",
      type: UnprocessableEntityException,
    })
  );
}

export function GetAllUsersApiDoc() {
  return applyDecorators(
    ApiBearerAuth("access-token"),
    ApiOperation({
      summary: "Recupera todos os usuário.",
    }),
    ApiQuery({
      name: "queryFilter",
      description: "The user filter.",
      type: FilterUsersDTO,
    }),
    ApiResponse({
      status: 200,
      description: "Usuário atualizado.",
      type: [UsersDTO],
    })
  );
}
