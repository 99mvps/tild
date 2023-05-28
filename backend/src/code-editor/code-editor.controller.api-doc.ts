import { UnprocessableEntityException, applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import {
  CodeEditorDTO,
  CreateCodeEditorDTO,
  FilterCodeEditorDTO,
  UpdateCodeEditorDTO,
} from "./dto/code-editor.dto";
import { Langs } from "./code-editor.enum";
import { DeleteResult } from "typeorm";

export function CreateCodeEditorApiDoc() {
  return applyDecorators(
    ApiBearerAuth("access-token"),
    ApiOperation({
      summary: "Cria um tild",
    }),
    ApiBody({ type: CreateCodeEditorDTO }),
    ApiCreatedResponse({
      description: "tild criado.",
      schema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            example: CreateCodeEditorDTO.success,
          },
          message: {
            type: "string",
            example: CreateCodeEditorDTO.successMessage,
          },
          data: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "7392e65f-e909-4c0d-b7f0-ef3cfa4ad3d5",
              },
              title: {
                type: "string",
                example: "Estudos de algoritmo <3",
              },
              lang: {
                type: "string",
                enum: Object.values(Langs),
              },
              live: {
                type: "boolean",
                example: true,
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
                  example: "live",
                },
                message: {
                  type: "string",
                  example: "Precisa informar se a live foi iniciada.",
                },
              },
            },
          },
        },
      },
    })
  );
}

export function UpdateCodeEditorApiDoc() {
  return applyDecorators(
    ApiBearerAuth("access-token"),
    ApiOperation({
      summary: "Edita um til.",
    }),
    ApiParam({
      name: "id",
      description: "Id do tild",
      example: "c2fd0654-6f00-4d3d-a935-693979232eeb",
    }),
    ApiBody({
      description: "Dados do tild.",
      type: UpdateCodeEditorDTO,
    }),
    ApiOkResponse({
      description: "Tild atualizado.",
      type: CodeEditorDTO,
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
                  example: "title",
                },
                message: {
                  type: "string",
                  example: "Precisa informa um título.",
                },
              },
            },
          },
        },
      },
    }),
    ApiUnprocessableEntityResponse({
      description: "Erro ao criar tild.",
      type: UnprocessableEntityException,
    })
  );
}

export function DeleteCodeEditorApiDoc() {
  return applyDecorators(
    ApiBearerAuth("access-token"),
    ApiOperation({
      summary: "Remove um tild.",
    }),
    ApiParam({
      name: "id",
      description: "Id do tild",
      example: "c2fd0654-6f00-4d3d-a935-693979232eeb",
    }),
    ApiOkResponse({
      description: "Confirmação de deleção.",
      type: DeleteResult,
    }),
    ApiUnprocessableEntityResponse({
      description: "Erro ao criar o usuário.",
      type: UnprocessableEntityException,
    })
  );
}

export function GetAllCodeEditorsApiDoc() {
  return applyDecorators(
    ApiBearerAuth("access-token"),
    ApiOperation({
      summary: "Recupera todos os editores de códigu.",
    }),
    ApiResponse({
      status: 200,
      description: "Usuário atualizado.",
      type: [CodeEditorDTO],
    })
  );
}

export function GetCodeEditorApiDoc() {
  return applyDecorators(
    ApiBearerAuth("access-token"),
    ApiOperation({
      summary: "Recupera um editor de código.",
    }),
    ApiParam({
      name: "id",
      description: "O id do editor de código.",
      example: "c2fd0654-6f00-4d3d-a935-693979232eeb",
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: "Editor de código.",
      type: CodeEditorDTO,
    })
  );
}
