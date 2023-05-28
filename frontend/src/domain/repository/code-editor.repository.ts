import { IHttp } from "infrastructure/adapter/http";
import { ITokenStorage } from "infrastructure/adapter/storage/token";
import { AbstractRepository } from "./abstract.repository";
import {
  FilterCodeEditorDTO,
  CreateCodeEditorDTO,
  CodeEditorDTO,
} from "ui/code-editor/code-editor.interfaces";

export interface ICodeEditorRepository {
  create(codeEditor: CreateCodeEditorDTO): Promise<CodeEditorDTO>;
  getAll(queryFilter: FilterCodeEditorDTO): Promise<CodeEditorDTO[]>;
  getById(codeEditorId: string): Promise<CodeEditorDTO>;
  remove(codeEditorId: string): Promise<CodeEditorDTO>;
}

export class CodeEditorRepository
  extends AbstractRepository
  implements ICodeEditorRepository
{
  constructor(http: IHttp, userToken: ITokenStorage) {
    super("/code-editor", http, userToken);
  }
  /**
   * create a code editor
   *
   * @param {CreateCodeEditorDTO} editor de código
   * @memberof CodeEditorRepository
   */
  async create(codeEditor: CreateCodeEditorDTO) {
    const editorCreationResponse = await this.http.request({
      method: "POST",
      url: this.apiEndpoint,
      body: {
        ...codeEditor,
        live: true,
      },
    });

    const { data, message } = await editorCreationResponse.json();

    if (!editorCreationResponse.ok) {
      throw new Error("Erro ao criar o editor de código!", {
        cause: message,
      });
    }

    return data;
  }

  /**
   * Return all the code editos based on filter
   * @param {FilterCodeEditorDTO} queryFilter filter to query the user
   * @returns
   */
  async getAll(queryFilter: FilterCodeEditorDTO) {
    this.setSearchParams<FilterCodeEditorDTO>(queryFilter);

    const getAllEditors = await this.http.request({
      url: this.apiEndpoint,
    });

    const response = await getAllEditors.json();

    if (!getAllEditors.ok) {
      throw new Error("Erro ao buscar!", {
        cause: response.message,
      });
    }

    return response;
  }

  /**
   * Return the selected code editor
   * @param codeEditorId code edit\or
   * @returns
   */
  async getById(codeEditorId: string): Promise<CodeEditorDTO> {
    const response = await this.http.request({
      url: this.apiEndpoint.concat(`/${codeEditorId}`),
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error("Erro ao buscar o editor de código!", {
        cause: jsonResponse.message,
      });
    }

    return jsonResponse;
  }

  /**
   * Remove the code editor
   * @param codeEditorId code editor id
   * @returns
   */
  async remove(codeEditorId: string): Promise<CodeEditorDTO> {
    const response = await this.http.request({
      method: "DELETE",
      url: this.apiEndpoint.concat(`/${codeEditorId}`),
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error("Erro ao remove o editor de código!", {
        cause: jsonResponse.message,
      });
    }

    return jsonResponse;
  }
}
