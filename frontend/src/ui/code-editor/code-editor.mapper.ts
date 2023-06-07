import { ListMapper, MUIDropDownList } from "domain/mapper";
import { CodeEditorEnabledLanguages } from "./code-editor.enum";

/**
 * A mapper to transform the value received from a source, into a DropDown list.
 * specifically to MUI Material UI dropdown list
 * @returns {MUIDropDownList} the dropdown user list
 */
function CodeEditorMapperDropDownList(lang: string): MUIDropDownList {
  const langName =
    CodeEditorEnabledLanguages[lang as keyof typeof CodeEditorEnabledLanguages];
  const firstLetter = lang[0].toUpperCase();

  return {
    firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
    id: langName,
    label: langName,
  };
}

export const codeEditorLangsDropDownList = ListMapper(
  CodeEditorMapperDropDownList
);
