import {
  CreateUserDTO,
  FilterUserDTO,
  UpdateUserDTO,
  UserDTO,
} from "../../ui/users/user.interfaces";

import { ValidationError } from "yup";

import { mapperYupErrorsToErrorMessages } from "domain/yup.mapper-errors";

import { TErrorMessage } from "ui/components/error";
import { BaseRepository } from "domain/repository";
import {
  userProfileValidation,
  userValidation,
} from "../validations/user.validation";

type UserUseCaseReturn = {
  onSuccess: (user?: UserDTO | UserDTO[] | undefined) => void;
  onError: (errors: TErrorMessage) => void;
};

type UserProfileUseCaseReturn = {
  onSuccess: (user: UserDTO) => void;
  onError: (error: TErrorMessage) => void;
};

type LoadUserUseCaseReturn = {
  onSuccess: (user: UserDTO) => void;
  onError: (errors: TErrorMessage) => void;
};

type LoadAllUsersUseCaseReturn = {
  onSuccess: (user: UserDTO[]) => void;
  onError: (errors: TErrorMessage) => void;
};

export type TUserUseCase = {
  create(
    formInput: CreateUserDTO,
    { onSuccess, onError }: UserUseCaseReturn
  ): void;
  createUserProfile(
    formInput: CreateUserDTO,
    { onSuccess, onError }: UserProfileUseCaseReturn
  ): void;
  edit(user: UpdateUserDTO, { onSuccess, onError }: UserUseCaseReturn): void;
  remove(user: UserDTO, { onSuccess, onError }: UserUseCaseReturn): void;
  load(
    userId: UpdateUserDTO["id"],
    { onSuccess, onError }: LoadUserUseCaseReturn
  ): void;
  loadAll(
    filter: FilterUserDTO,
    { onSuccess, onError }: LoadAllUsersUseCaseReturn
  ): void;
};

export function create(
  formInput: CreateUserDTO,
  { onSuccess, onError }: UserUseCaseReturn
) {
  const { user: userRepository } = BaseRepository();
  userValidation
    .validate(formInput, {
      abortEarly: false,
    })
    .then(() =>
      userRepository
        .create(formInput)
        .then(() => onSuccess())
        .catch((error: Error) => {
          onError({
            title: error.message,
            errors: error.cause,
          });
        })
    )
    .catch((validationErrors: ValidationError) =>
      onError({
        title: "ValidationError",
        errors: mapperYupErrorsToErrorMessages(validationErrors),
      })
    );
}

export function createUserProfile(
  formInput: CreateUserDTO,
  { onSuccess, onError }: UserProfileUseCaseReturn
) {
  const { user: userRepository } = BaseRepository();
  userProfileValidation
    .validate(formInput, {
      abortEarly: false,
    })
    .then(() =>
      userRepository
        .create(formInput)
        .then((user: UserDTO) => onSuccess(user))
        .catch((error: any) =>
          onError({
            title: error.message,
            errors: error.cause,
          })
        )
    )
    .catch((validationErrors: ValidationError) =>
      onError({
        title: "ValidationError",
        errors: mapperYupErrorsToErrorMessages(validationErrors),
      })
    );
}

export function edit(
  formInput: UpdateUserDTO,
  { onSuccess, onError }: UserUseCaseReturn
) {
  const { user: userRepository } = BaseRepository();
  userValidation
    .validate(formInput, {
      abortEarly: false,
    })
    .then(() =>
      userRepository
        .edit(formInput)
        .then(() => onSuccess())
        .catch((error: Error) => {
          onError({
            title: error.message,
            errors: error.cause,
          });
        })
    )
    .catch((validationErrors: ValidationError) => {
      onError({
        title: "ValidationError",
        errors: mapperYupErrorsToErrorMessages(validationErrors),
      });
    });
}

export function load(
  userId: string,
  { onSuccess, onError }: LoadUserUseCaseReturn
) {
  const { user: userRepository } = BaseRepository();
  userRepository
    .getById(userId)
    .then((user: UserDTO) => onSuccess(user))
    .catch((error: Error) =>
      onError({
        title: error.message,
        errors: error.cause,
      })
    );
}

export function loadAll(
  filter: FilterUserDTO,
  { onSuccess, onError }: LoadAllUsersUseCaseReturn
) {
  const { user: userRepository } = BaseRepository();
  userRepository
    .getAll(filter)
    .then((user: UserDTO[]) => onSuccess(user))
    .catch((error: Error) =>
      onError({
        title: error.message,
        errors: error.cause,
      })
    );
}

export function remove(
  user: UserDTO,
  { onSuccess, onError }: UserUseCaseReturn
) {
  const { user: userRepository } = BaseRepository();
  userRepository
    .remove(user.id)
    .then(() => onSuccess())
    .catch((errors: TErrorMessage) => onError(errors));
}
