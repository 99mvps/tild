import { object, string, mixed } from "yup";

import { CodeEditorEnabledLanguages } from "ui/code-editor/code-editor.enum";

const codeEditorValidation = object().shape({
  title: string().required("Título é obrigatório."),
  lang: mixed<CodeEditorEnabledLanguages>().oneOf(
    Object.values(CodeEditorEnabledLanguages),
    "Precisa selecionar uma das opções."
  ),
});

export { codeEditorValidation };
