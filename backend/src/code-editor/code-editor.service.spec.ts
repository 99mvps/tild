import { Test, TestingModule } from "@nestjs/testing";
import { CodeEditorService } from "./code-editor.service";

describe("CodeEditorService", () => {
  let service: CodeEditorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeEditorService],
    }).compile();

    service = module.get<CodeEditorService>(CodeEditorService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
