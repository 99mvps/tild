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
import { LoggedUserRequestDTO } from "src/auth/dto/auth.dto";

interface ICodeEditorService {
  findAll(
    params: FilterCodeEditorDTO,
    user: LoggedUserRequestDTO
  ): Promise<IResourceResponse<CodeEditorDTO[]>>;
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

  async findAll(params: FilterCodeEditorDTO, user: LoggedUserRequestDTO) {
    const codeEditors = this.codeEditorRepository
      .createQueryBuilder("code_editor")
      .select([
        "code_editor.id",
        "code_editor.title",
        "code_editor.lang",
        "code_editor.live",
        "code_editor.createdAt",
        "code_editor.updatedAt",
      ])
      .where(params);

    if (user) {
      codeEditors.andWhere({ user: user.userId });
    }

    return {
      code: "CODE_EDITOR_LIST",
      message: "A lista de tilds.",
      data: await codeEditors.getMany(),
    };
  }

  async find(codeEditor: UUIDVersion) {
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
      relationLoadStrategy: "join",
      relations: ["user"],
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
