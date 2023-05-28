import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UUIDVersion } from "class-validator";
import {
  CodeEditorDTO,
  DeleteCodeEditorDTO,
  FilterCodeEditorDTO,
  UpdateCodeEditorDTO,
} from "./dto/code-editor.dto";
import { IResourceResponse, ResourceResponse } from "src/app-response.http-filter";
import { CodeEditor } from "./code-editor.entity";

interface ICodeEditorService {
  findAll(params: FilterCodeEditorDTO): Promise<IResourceResponse<CodeEditorDTO[]>>;
  updateCodeEditor(
    codeEditorId: UUIDVersion,
    codeEditor: UpdateCodeEditorDTO
  ): Promise<IResourceResponse<CodeEditorDTO>>;
  removeCodeEditor(codeEditorId: UUIDVersion): Promise<IResourceResponse<CodeEditorDTO>>;
  getById(codeEditorId: UUIDVersion): Promise<IResourceResponse<CodeEditorDTO>>;
}

@Injectable()
export class CodeEditorService implements ICodeEditorService {
  constructor(
    @InjectRepository(CodeEditor)
    private codeEditorRepository: Repository<CodeEditor>
  ) {}

  async findAll(params: FilterCodeEditorDTO) {
    const codeEditors = await this.codeEditorRepository
      .createQueryBuilder("code_editor")
      .select([
        "code_editor.id",
        "code_editor.title",
        "code_editor.lang",
        "code_editor.live",
        "code_editor.createdAt",
        "code_editor.updatedAt",
      ])
      .where(params)
      .getMany();

    return {
      code: "CODE_EDITOR_LIST",
      message: "A lista de tilds.",
      data: codeEditors,
    };
  }

  async find(codeEditor: UUIDVersion): Promise<CodeEditor | null> {
    return this.codeEditorRepository.findOne({
      where: {
        id: codeEditor as string,
      },
    });
  }

  async getById(codeEditorId: UUIDVersion) {
    const codeEditor = await this.codeEditorRepository.findOne({
      where: {
        id: String(codeEditorId),
      },
    });

    return new ResourceResponse<CodeEditorDTO>({
      code: "CODE_EDITOR",
      message: "Um tild.",
      data: codeEditor,
    });
  }

  async updateCodeEditor(codeEditorId: UUIDVersion, codeEditor: UpdateCodeEditorDTO) {
    try {
      const { affected }: UpdateResult = await this.codeEditorRepository.update(
        codeEditorId,
        codeEditor
      );

      if (!affected) {
        throw new UnprocessableEntityException();
      }

      return new ResourceResponse<CodeEditorDTO>({
        code: UpdateCodeEditorDTO.success,
        message: UpdateCodeEditorDTO.successMessage,
        data: codeEditor,
      });
    } catch (error: any) {
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(UpdateCodeEditorDTO.failMessage, {
          cause: error,
        });
      }
      throw new InternalServerErrorException(error.message, {
        cause: error,
      });
    }
  }

  async removeCodeEditor(codeEditorId: UUIDVersion) {
    try {
      const { affected }: DeleteResult = await this.codeEditorRepository.softDelete(codeEditorId);

      if (!affected) {
        throw new UnprocessableEntityException();
      }

      return new ResourceResponse<CodeEditorDTO>({
        code: DeleteCodeEditorDTO.success,
        message: DeleteCodeEditorDTO.successMessage,
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(error.message, {
        cause: error,
      });
    }
  }
}
