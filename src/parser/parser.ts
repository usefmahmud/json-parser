import { AST } from "./ast";
import { Token, TokenValue } from "./lexer";

export class Parser {
  private position = 0;

  constructor(private tokens: TokenValue[]) {}

  private peek(): TokenValue {
    return this.tokens[this.position];
  }

  private advance(): void {
    this.position++;
  }

  private consume(tokenType: TokenValue["type"]) {
    if (this.peek().type !== tokenType) {
      throw new Error("Unexpected Token Type");
    }

    this.advance();
  }

  private is_at_end() {
    return this.position >= this.tokens.length;
  }

  private parse_value() {
    const token = this.peek();

    if (token.type === Token.STRING) {
      return this.token("String", token.value);
    } else if (token.type === Token.NUMBER) {
      return this.token("Number", Number(token.value));
    } else if (token.type === Token.TRUE) {
      return this.token("Boolean", true);
    } else if (token.type === Token.FALSE) {
      return this.token("Boolean", false);
    } else if (token.type === Token.NULL) {
      return this.token("Null", null);
    } else if (token.type === Token.LEFT_BRACE) {
      // parse object
    } else if (token.type === Token.LEFT_BRACKET) {
      // parse array
    } else {
      throw new Error("Unexpected Token Type");
    }
  }

  private token<T extends AST["type"]>(
    type: T,
    value: Extract<AST, { type: T }>["value"],
  ): Extract<AST, { type: T }> {
    return {
      type,
      value,
    } as Extract<AST, { type: T }>;
  }
}
