/**
 * Enumeration of enabled languages in the code editor.
 * @enum {string} listed languages. eg: "javascript" - the best one in my opinion :3
 * @readonly
 *
 * */
export enum CodeEditorEnabledLanguages {
  apl = "apl",
  asciiarmor = "asciiarmor",
  asterisk = "asterisk",
  brainfuck = "brainfuck",
  c = "c",
  clojure = "clojure",
  cmake = "cmake",
  cobol = "cobol",
  coffeescript = "coffeescript",
  commonlisp = "commonlisp",
  crystal = "crystal",
  css = "css",
  cypher = "cypher",
  d = "d",
  dart = "dart",
  dockerfile = "dockerfile",
  dtd = "dtd",
  dylan = "dylan",
  ecl = "ecl",
  ebnf = "ebnf",
  eiffel = "eiffel",
  elm = "elm",
  erlang = "erlang",
  factor = "factor",
  fcl = "fcl",
  forth = "forth",
  fortran = "fortran",
  gas = "gas",
  gherkin = "gherkin",
  go = "go",
  groovy = "groovy",
  haskell = "haskell",
  haxe = "haxe",
  html = "html",
  http = "http",
  idl = "idl",
  javascript = "javascript",
  jsx = "jsx",
  jinja2 = "jinja2",
  json = "json",
  julia = "julia",
  kotlin = "kotlin",
  lezer = "lezer",
  less = "less",
  livescript = "livescript",
  lua = "lua",
  markdown = "markdown",
  mathematica = "mathematica",
  mbox = "mbox",
  mirc = "mirc",
  modelica = "modelica",
  mscgen = "mscgen",
  mysql = "mysql",
  nsis = "nsis",
  nginx = "nginx",
  ntriples = "ntriples",
  objectivec = "objectivec",
  objectivecpp = "objectivecpp",
  octave = "octave",
  oz = "oz",
  pascal = "pascal",
  perl = "perl",
  pgsql = "pgsql",
  php = "php",
  pig = "pig",
  plaintext = "plaintext",
  powershell = "powershell",
  protobuf = "protobuf",
  properties = "properties",
  puppet = "puppet",
  python = "python",
  q = "q",
  r = "r",
  ruby = "ruby",
  rust = "rust",
  sass = "sass",
  scala = "scala",
  scheme = "scheme",
  shell = "shell",
  sieve = "sieve",
  smalltalk = "smalltalk",
  solr = "solr",
  sparql = "sparql",
  spreadsheet = "spreadsheet",
  sql = "sql",
  squirrel = "squirrel",
  stex = "stex",
  stylesheet = "stylesheet",
  stylus = "stylus",
  swift = "swift",
  tcl = "tcl",
  textile = "textile",
  tiddlywiki = "tiddlywiki",
  tiki = "tiki",
  toml = "toml",
  troff = "troff",
  tsx = "tsx",
  turtle = "turtle",
  typescript = "typescript",
  vb = "vb",
  vbscript = "vbscript",
  velocity = "velocity",
  verilog = "verilog",
  vhdl = "vhdl",
  wast = "wast",
  webidl = "webidl",
  xquery = "xquery",
  xml = "xml",
  yaml = "yaml",
  yacas = "yacas",
  z80 = "z80",
}

// Existing enum values...

// export const LanguageExtensions: Record<CodeEditorEnabledLanguages, string> = {
//   apl: ".apl",
//   asciiarmor: ".asciiarmor",
//   asterisk: ".asterisk",
//   // Add extensions for other languages here...
//   z80: ".z80",
// };

// Usage:
// const extensions = Object.values(LanguageExtensions); // [".apl", ".asciiarmor", ".asterisk", ...]

export const CodeEditorEnabledLanguagesFind = (lang: string): string | null => {
  return (
    Object.keys(CodeEditorEnabledLanguages).find((key) => {
      if (lang === key) {
        return CodeEditorEnabledLanguages[
          key as keyof typeof CodeEditorEnabledLanguages
        ];
      }
      return null;
    }) ?? null
  );
};

/**
 * Configuration options for Prettier.
 * @constant {Object}
 * @readonly
 * */
export const PrettierConfigOptions = {
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: false,
  jsxBracketSameLine: false,
  rangeStart: 0,
  rangeEnd: Infinity,
  parser: undefined,
  filepath: undefined,
  requirePragma: false,
  insertPragma: false,
  proseWrap: "preserve",
  arrowParens: "always",
  plugins: [],
  pluginSearchDirs: [],
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
  quoteProps: "as-needed",
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: false,
};

export type PrettierOptions = keyof typeof PrettierConfigOptions;
