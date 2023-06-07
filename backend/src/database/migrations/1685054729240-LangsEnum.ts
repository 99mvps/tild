import { MigrationInterface, QueryRunner } from "typeorm";

export class CodeEditor1685054729240 implements MigrationInterface {
  name = "CodeEditor1685054729240";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."code_editor_lang_enum" AS ENUM('apl', 'asciiarmor', 'asterisk', 'c', 'csharp', 'scala', 'kotlin', 'shader', 'nesc', 'objectivec', 'objectivecpp', 'squirrel', 'ceylon', 'dart', 'cmake', 'cobol', 'commonlisp', 'crystal', 'cypher', 'd', 'diff', 'dtd', 'dylan', 'ebnf', 'ecl', 'eiffel', 'elm', 'factor', 'fcl', 'forth', 'fortran', 'gas', 'gherkin', 'groovy', 'haskell', 'haxe', 'http', 'idl', 'jinja2', 'mathematica', 'mbox', 'mirc', 'modelica', 'mscgen', 'mumps', 'nsis', 'ntriples', 'octave', 'oz', 'pig', 'properties', 'protobuf', 'puppet', 'q', 'sas', 'sass', 'sieve', 'smalltalk', 'solr', 'sparql', 'spreadsheet', 'stex', 'textile', 'tiddlywiki', 'tiki', 'troff', 'ttcn', 'turtle', 'velocity', 'verilog', 'vhdl', 'webidl', 'xquery', 'yacas', 'z80', 'jsx', 'typescript', 'tsx', 'markdown', 'mysql', 'pgsql', 'go', 'shell', 'lua', 'swift', 'tcl', 'yaml', 'vb', 'powershell', 'brainfuck', 'stylus', 'erlang', 'nginx', 'perl', 'ruby', 'pascal', 'livescript', 'less', 'scheme', 'toml', 'vbscript', 'clojure', 'coffeescript', 'julia', 'dockerfile', 'r', 'wast', 'javascript', 'json', 'html', 'css', 'python', 'xml', 'sql', 'java', 'rust', 'cpp', 'lezer', 'php')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE "public"."code_editor_lang_enum"`);
  }
}
