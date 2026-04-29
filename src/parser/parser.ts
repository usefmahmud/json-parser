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

  private consume(type: Token): TokenValue {
    const token = this.peek();

    if (token.type !== type) {
      throw new Error(`Expected ${Token[type]} but got ${Token[token.type]}`);
    }

    this.advance();
    return token;
  }

  private is_at_end(): boolean {
    return this.position >= this.tokens.length;
  }

  private parse_value(): AST {
    const token = this.peek();

    if (token.type === Token.STRING) {
      const t = this.consume(Token.STRING);
      return this.token("String", t.value!);
    } else if (token.type === Token.NUMBER) {
      const t = this.consume(Token.NUMBER);
      return this.token("Number", Number(t.value));
    } else if (token.type === Token.TRUE) {
      this.consume(Token.TRUE);
      return this.token("Boolean", true);
    } else if (token.type === Token.FALSE) {
      this.consume(Token.FALSE);
      return this.token("Boolean", false);
    } else if (token.type === Token.NULL) {
      this.consume(Token.NULL);
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
    return { type, value } as Extract<AST, { type: T }>;
  }
}
