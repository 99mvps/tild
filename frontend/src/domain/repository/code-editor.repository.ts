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
    const response = await this.http.request({
      method: "POST",
      url: this.apiEndpoint,
      body: {
        ...codeEditor,
        live: true,
      },
    });

    const { data } = await this.responseHandler(
      response,
      "Erro ao criar editor de código."
    );

    return data;
  }

  /**
   * Return all the code editos based on filter
   * @param {FilterCodeEditorDTO} queryFilter filter to query the user
   * @returns
   */
  async getAll(queryFilter: FilterCodeEditorDTO) {
    this.setSearchParams<FilterCodeEditorDTO>(queryFilter);

    const response = await this.http.request({
      url: this.apiEndpoint,
    });

    const { data } = await this.responseHandler(response, "Erro ao buscar!");

    return data;
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

    const { data } = await this.responseHandler(
      response,
      "Erro ao buscar o editor de código!"
    );

    return data;
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

    const { data } = await this.responseHandler(
      response,
      "Erro ao excluir editor de código."
    );

    return data;
  }
}
