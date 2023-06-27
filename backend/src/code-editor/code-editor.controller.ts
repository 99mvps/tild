import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  CodeEditorDTO,
  CreateCodeEditorDTO,
  FilterCodeEditorDTO,
  UpdateCodeEditorDTO,
} from "./dto/code-editor.dto";
import { IResourceResponse } from "src/app-response.http-filter";
import { CodeEditorCreateUseCase } from "./useCase/code-editor.create.usecase";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { CodeEditorService } from "./code-editor.service";
import { UUIDVersion } from "class-validator";

import {
  CreateCodeEditorApiDoc,
  GetAllCodeEditorsApiDoc,
  DeleteCodeEditorApiDoc,
  UpdateCodeEditorApiDoc,
  GetCodeEditorApiDoc,
} from "./code-editor.swagger.api-doc";
import { LoggedUserRequest } from "src/auth/decorators/requester-user";
import { LoggedUserRequestDTO } from "src/auth/dto/auth.dto";

@ApiTags("code-editor")
@Controller("code-editor")
@UseGuards(JwtAuthGuard)
export class CodeEditorController {
  constructor(
    readonly createCodeEditor: CodeEditorCreateUseCase,
    readonly codeEditorService: CodeEditorService
  ) {}

  @Post()
  @CreateCodeEditorApiDoc()
  async create(
    @Body() codeEditor: CreateCodeEditorDTO,
    @LoggedUserRequest() user: LoggedUserRequestDTO
  ): Promise<IResourceResponse<CodeEditorDTO>> {
    return this.createCodeEditor.execute(codeEditor, user);
  }

  @Get()
  @GetAllCodeEditorsApiDoc()
  async getAllCodeEditor(
    @Query() queryFilter: FilterCodeEditorDTO,
    @LoggedUserRequest() user: LoggedUserRequestDTO
  ): Promise<IResourceResponse<CodeEditorDTO[]>> {
    return this.codeEditorService.findAll(queryFilter, user);
  }

  @Get(":id")
  @GetCodeEditorApiDoc()
  async getCodeEditor(
    @Param("id") codeEditorId: UUIDVersion
  ): Promise<IResourceResponse<CodeEditorDTO>> {
    return this.codeEditorService.getById(codeEditorId);
  }

  @Patch(":id")
  @UpdateCodeEditorApiDoc()
  async update(
    @Param("id") codeEditorId: UUIDVersion,
    @Body() codeEditor: UpdateCodeEditorDTO
  ): Promise<IResourceResponse<CodeEditorDTO>> {
    return this.codeEditorService.updateCodeEditor(codeEditorId, codeEditor);
  }

  @Delete(":id")
  @DeleteCodeEditorApiDoc()
  async removeUser(@Param("id") id: UUIDVersion): Promise<IResourceResponse<CodeEditorDTO>> {
    return this.codeEditorService.removeCodeEditor(id);
  }
}
