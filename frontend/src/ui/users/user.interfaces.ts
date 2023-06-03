/**
 * List of user roles
 * @readonly
 * @enum {string} UserRoles
 * @property {string} ADMIN - System Administrador. Has access in all system areas.
 * @property {string} STREAMER - streamer
 * @property {string} USER - user. just the user.
 **/
export enum UserRoles {
  ADMIN = "admin",
  STREAMER = "streamer",
  USER = "user",
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role?: UserRoles | string;
  password: string;
  passwordConfirmation?: string;
  profileImage?: string;
  codeConductAccept: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CreateUserDTO
  extends Omit<UserDTO, "id" | "createdAt" | "updatedAt" | "deletedAt"> {}

export interface UpdateUserDTO
  extends Partial<Omit<UserDTO, "createdAt" | "updatedAt" | "deletedAt">> {}

export interface FilterUserDTO extends Partial<UserDTO> {}

export type UserMUIDropDownListDTO = {
  id: string;
  label: string;
};
