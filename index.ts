import { Lexer } from "./lexer";

const input = await Bun.file("./code.flx").text();

const lexer = new Lexer(input);
const tokens = lexer.tokenize();

console.log(tokens);
