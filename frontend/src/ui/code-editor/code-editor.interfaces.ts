export interface CodeEditorDTO {
  id: string;
  title: string;
  lang: string;
  live: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CreateCodeEditorDTO extends Partial<CodeEditorDTO> {
  title: string;
  lang: string;
}

export interface FilterCodeEditorDTO extends Partial<CodeEditorDTO> {}
