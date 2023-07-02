import { ValidationError } from "yup";
import {
  CreateCodeEditorDTO,
  UpdateCodeEditorDTO,
  FilterCodeEditorDTO,
  CodeEditorDTO,
} from "ui/code-editor/code-editor.interfaces";
import { mapperYupErrorsToErrorMessages } from "domain/yup.mapper-errors";
import { TErrorMessage } from "ui/components/error";
import { BaseRepository } from "domain/repository";
import { codeEditorValidation } from "domain/validations/code-editor.validation";

type CodeEditorCaseReturn = {
  onSuccess?: (codeEditor: CodeEditorDTO) => void;
  onError: (errors: TErrorMessage) => void;
};

type LoadCodeEditorCaseReturn = {
  onSuccess?: (codeEditor: CodeEditorDTO) => void;
  onError: (errors: TErrorMessage) => void;
};

type LoadAllCodeEditorsUseCaseReturn = {
  onSuccess?: (codeEditor: CodeEditorDTO[]) => void;
  onError: (errors: TErrorMessage) => void;
};

export type TCodeEditorUseCases = {
  create(
    formInput: CreateCodeEditorDTO,
    { onSuccess, onError }: CodeEditorCaseReturn
  ): void;
  load(
    codeEditorId: string,
    { onSuccess, onError }: LoadCodeEditorCaseReturn
  ): void;
  loadAll(
    filter: FilterCodeEditorDTO,
    { onSuccess, onError }: LoadAllCodeEditorsUseCaseReturn
  ): void;
  update(
    codeEditorId: CodeEditorDTO["id"],
    codeEditor: UpdateCodeEditorDTO,
    { onSuccess, onError }: CodeEditorCaseReturn
  ): void;
  remove(
    filter: CreateCodeEditorDTO,
    { onSuccess, onError }: CodeEditorCaseReturn
  ): void;
};

export function create(
  formInput: CreateCodeEditorDTO,
  { onSuccess, onError }: CodeEditorCaseReturn
) {
  const { codeEditor: codeEditorRepository } = BaseRepository();
  codeEditorValidation
    .validate(formInput, {
      abortEarly: false,
    })
    .then(() =>
      codeEditorRepository
        .create(formInput)
        .then((codeEditor: CodeEditorDTO) => onSuccess?.(codeEditor))
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

export function load(
  codeEditorId: string,
  { onSuccess, onError }: LoadCodeEditorCaseReturn
) {
  const { codeEditor: codeEditorRepository } = BaseRepository();
  codeEditorRepository
    .getAll({ id: codeEditorId })
    .then(([codeEditor]: CodeEditorDTO[]) => {
      onSuccess?.(codeEditor);
    })
    .catch((error: Error) =>
      onError({
        title: error.message,
        errors: error.cause,
      })
    );
}

export function loadAll(
  filter: FilterCodeEditorDTO,
  { onSuccess, onError }: LoadAllCodeEditorsUseCaseReturn
) {
  const { codeEditor: codeEditorRepository } = BaseRepository();
  codeEditorRepository
    .getAll(filter)
    .then((codeEditor: CodeEditorDTO[]) => onSuccess?.(codeEditor))
    .catch((error: Error) =>
      onError({
        title: error.message,
        errors: error.cause,
      })
    );
}

export function remove(
  codeEditor: CodeEditorDTO,
  { onSuccess, onError }: CodeEditorCaseReturn
) {
  const { codeEditor: codeEditorRepository } = BaseRepository();
  codeEditorRepository
    .remove(codeEditor.id)
    .then(() => onSuccess?.(codeEditor))
    .catch((errors: TErrorMessage) => onError(errors));
}

export function update(
  codeEditorId: CodeEditorDTO["id"],
  codeEditor: CodeEditorDTO,
  { onSuccess, onError }: CodeEditorCaseReturn
) {
  const { codeEditor: codeEditorRepository } = BaseRepository();
  codeEditorRepository
    .update(codeEditorId, codeEditor)
    .then(() => onSuccess?.(codeEditor))
    .catch((errors: TErrorMessage) => onError(errors));
}
