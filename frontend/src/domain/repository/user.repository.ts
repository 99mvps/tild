import { IHttp } from "infrastructure/adapter/http";
import { ITokenStorage } from "infrastructure/adapter/storage/token";
import {
  CreateUserDTO,
  UserDTO,
  UpdateUserDTO,
  FilterUserDTO,
} from "../../ui/users/user.interfaces";
import { AbstractRepository } from "./abstract.repository";

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<UserDTO>;
  edit(user: UpdateUserDTO): Promise<UserDTO>;
  remove(id: string): Promise<UserDTO>;
  getAll(queryFilter?: FilterUserDTO): Promise<UserDTO[]>;
  getById(id: string): Promise<UserDTO>;
  setSearchParams(searchParams: FilterUserDTO): void;
}

export class UserRepository
  extends AbstractRepository
  implements IUserRepository
{
  /**
   * Creates an instance of UserRepository.
   * @param {string} baseUrl server url
   * @param {IHttp} http http client
   * @memberof UserRepository
   */
  constructor(http: IHttp, userToken: ITokenStorage) {
    super("/users", http, userToken);
  }

  /**
   * create a pet
   *
   * @param {CreateUserDTO} user data
   * @return {*}  {Promise<boolean>} returns true when the operation was succeded
   * @memberof UserRepository
   */
  async create(user: CreateUserDTO): Promise<UserDTO> {
    const response = await this.http.request({
      method: "POST",
      url: this.apiEndpoint,
      body: user,
    });

    const { data } = await this.requestHandler(
      response,
      "Erro ao criar o usuário"
    );

    return data;
  }

  /**
   * The same as create but is as PATCH
   * @param user user UpdateUserDTO
   * @returns
   */
  async edit(user: UpdateUserDTO): Promise<UserDTO> {
    const response = await this.http.request({
      method: "PATCH",
      url: this.apiEndpoint.concat(`/${user.id}`),
      body: user,
    });

    const { data } = await this.requestHandler(
      response,
      "Erro ao editar o usuário"
    );

    return data;
  }

  /**
   * Remove the user
   * @param id user id
   * @returns
   */
  async remove(id: string): Promise<UserDTO> {
    const response = await this.http.request({
      method: "DELETE",
      url: this.apiEndpoint.concat(`/${id}`),
    });

    const { data } = await this.requestHandler(
      response,
      "Erro ao remover o usuário"
    );

    return data;
  }

  /**
   * Return all the users based on filter
   * @param {FilterUserDTO} queryFilter filter to query the user
   * @returns
   */
  async getAll(queryFilter: FilterUserDTO): Promise<UserDTO[]> {
    this.setSearchParams<FilterUserDTO>(queryFilter);

    const response = await this.http.request({
      url: this.apiEndpoint,
    });

    const { data } = await this.requestHandler(
      response,
      "Erro ao buscar o usuário"
    );

    return data;
  }

  /**
   * Return the selected user
   * @param id User id
   * @returns
   */
  async getById(id: string): Promise<UserDTO> {
    const response = await this.http.request({
      url: this.apiEndpoint.concat(`/${id}`),
    });

    const { data } = await this.requestHandler(
      response,
      "Erro ao buscar o usuário"
    );

    return data;
  }
}
