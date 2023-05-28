import { IHttp } from "infrastructure/adapter/http";
import { ITokenStorage } from "infrastructure/adapter/storage/token";
import { AbstractRepository } from "./abstract.repository";
// import {
//   FilterCodeEditorDTO,
//   CreateCodeEditorDTO,
//   CodeEditorDTO,
// } from "ui/code-editor/code-editor.interfaces";

export interface ILiveRepository {}

export class LiveRepository
  extends AbstractRepository
  implements ILiveRepository
{
  constructor(http: IHttp, userToken: ITokenStorage) {
    super("/code-editor", http, userToken);
  }
}
