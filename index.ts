import { Lexer, Token } from "./src/parser/lexer";
import { Parser } from "./src/parser/parser";

const input =
  '{"name": "yousef", "age": 21, "isActive": true, "skills": ["skill1", "skill2"]}';

const lexer = new Lexer(input);
const tokens = lexer.tokenize();

// console.log("tokens:");
// console.log(tokens.map((token) => ({ type: Token[token.type], value: token.value })));

const parser = new Parser(tokens);
const ast = parser.parse();

console.log(input);
console.log("-----");

console.log("ast:");
console.log(JSON.stringify(ast, null, 2));
