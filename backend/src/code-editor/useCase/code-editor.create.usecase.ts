import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CodeEditor } from "../code-editor.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IResourceResponse, ResourceResponse } from "src/app-response.http-filter";
import { CodeEditorDTO, CreateCodeEditorDTO } from "../dto/code-editor.dto";
import { LoggedUserRequestDTO } from "src/auth/dto/auth.dto";

export interface ICodeEditorCreateUseCase {
  execute(
    codeEditor: CreateCodeEditorDTO,
    user: LoggedUserRequestDTO
  ): Promise<IResourceResponse<CodeEditorDTO>>;
}

@Injectable()
export class CodeEditorCreateUseCase implements ICodeEditorCreateUseCase {
  constructor(
    @InjectRepository(CodeEditor)
    private codeEditorsRepository: Repository<CodeEditor>
  ) {}

  async execute(codeEditor: CreateCodeEditorDTO, user: LoggedUserRequestDTO) {
    try {
      const codeEditorEntity = this.codeEditorsRepository.create({
        ...codeEditor,
        user: {
          id: user.userId,
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
