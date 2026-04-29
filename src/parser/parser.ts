import { AST, ASTNode, ObjectNode } from "./ast";
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
      return this.parse_object();
    } else if (token.type === Token.LEFT_BRACKET) {
      // parse array
    } else {
      throw new Error("Unexpected Token Type");
    }
  }

  private parse_object(): AST {
    this.consume(Token.LEFT_BRACE);
    const object: ObjectNode["value"] = {};

    if (this.peek().type === Token.RIGHT_BRACE) {
      this.consume(Token.RIGHT_BRACE);
      return this.token("Object", {});
    }

    while (this.peek().type !== Token.RIGHT_BRACE) {
      const keyToken = this.consume(Token.STRING);

      this.consume(Token.COLON);

      const value = this.parse_value();

      object[keyToken.value] = value;

      if (this.peek().type === Token.COMMA) {
        this.consume(Token.COMMA);
      }
    }

    this.consume(Token.RIGHT_BRACE);

    return this.token("Object", object);
  }

  private token<T extends AST["type"]>(
    type: T,
    value: Extract<AST, { type: T }>["value"],
  ): Extract<AST, { type: T }> {
    return { type, value } as Extract<AST, { type: T }>;
  }
}
