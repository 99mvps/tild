import { Test, TestingModule } from "@nestjs/testing";
import { CodeEditorController } from "./code-editor.controller";

describe("CodeEditorController", () => {
  let controller: CodeEditorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeEditorController],
    }).compile();

    controller = module.get<CodeEditorController>(CodeEditorController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
