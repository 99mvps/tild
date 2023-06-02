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
  async create(@Body() codeEditor: CreateCodeEditorDTO): Promise<IResourceResponse<CodeEditorDTO>> {
    return this.createCodeEditor.execute(codeEditor);
  }

  @Get()
  @GetAllCodeEditorsApiDoc()
  async getAllCodeEditor(
    @Query() queryFilter: FilterCodeEditorDTO
  ): Promise<IResourceResponse<CodeEditorDTO[]>> {
    return this.codeEditorService.findAll(queryFilter);
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
