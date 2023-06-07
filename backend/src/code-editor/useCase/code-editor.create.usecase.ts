import { Inject, Injectable, InternalServerErrorException, Scope } from "@nestjs/common";
import { CodeEditor } from "../code-editor.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IResourceResponse, ResourceResponse } from "src/app-response.http-filter";
import { CodeEditorDTO, CreateCodeEditorDTO } from "../dto/code-editor.dto";

import { REQUEST } from "@nestjs/core";
import { Request } from "express";

export interface ICodeEditorCreateUseCase {
  execute(codeEditor: CreateCodeEditorDTO): Promise<IResourceResponse<CodeEditorDTO>>;
}

@Injectable({ scope: Scope.REQUEST })
export class CodeEditorCreateUseCase implements ICodeEditorCreateUseCase {
  constructor(
    @InjectRepository(CodeEditor)
    private codeEditorsRepository: Repository<CodeEditor>,
    @Inject(REQUEST) private request: Request
  ) {}

  async execute(codeEditor: CreateCodeEditorDTO) {
    try {
      const codeEditorEntity = this.codeEditorsRepository.create({
        ...codeEditor,
        user: {
          id: this.request.user.userId,
        },
      });

      const { id, title, lang, live, createdAt } = await this.codeEditorsRepository.save(
        codeEditorEntity
      );

      return new ResourceResponse<CodeEditorDTO>({
        code: CreateCodeEditorDTO.success,
        message: CreateCodeEditorDTO.successMessage,
        data: { id, title, lang, live, createdAt },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error.message, { cause: error });
    }
  }
}
