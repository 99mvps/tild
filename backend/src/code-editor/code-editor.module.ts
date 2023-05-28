import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CodeEditor } from "./code-editor.entity";
import { CodeEditorController } from "./code-editor.controller";
import { CodeEditorService } from "./code-editor.service";
import { CodeEditorCreateUseCase } from "./useCase/code-editor.create.usecase";

@Module({
  imports: [TypeOrmModule.forFeature([CodeEditor])],
  providers: [CodeEditorService, CodeEditorCreateUseCase],
  exports: [],
  controllers: [CodeEditorController],
})
export class CodeEditorModule {}
