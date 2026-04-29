enum Token {
  LEFT_BRACE,
  RIGHT_BRACE,
  LEFT_BRACKET,
  RIGHT_BRACKET,
  COMMA,
  COLON,

  STRING,
  NUMBER,

  TRUE,
  FALSE,
  NULL,
}

const Keywords: Record<string, Token> = {
  true: Token.TRUE,
  false: Token.FALSE,
  null: Token.NULL,
};

export type TokenValue = {
  type: Token;
  value?: string;
};

export class Lexer {
  private position = 0;
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  private peek(): string {
    return this.input[this.position];
  }

  private advance(): void {
    this.position++;
  }

  private is_at_end(): boolean {
    return this.position >= this.input.length;
  }

  private is_alpha(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

  private is_digit(char: string): boolean {
    return /^\d$/.test(char);
  }

  private is_keyword(str: string): boolean {
    return str in Keywords;
  }

  private skip_whitespace(): void {
    while (!this.is_at_end() && /\s/.test(this.peek())) {
      this.advance();
    }
  }

  private read_string(): string {
    let result = "";
    this.advance();

    while (!this.is_at_end() && this.peek() !== '"') {
      result += this.peek();
      this.advance();
    }

    this.advance();
    return result;
  }

  private read_number(): string {
    let result = "";
    while (!this.is_at_end() && this.is_digit(this.peek())) {
      result += this.peek();
      this.advance();
    }
    return result;
  }

  public tokenize(): TokenValue[] {
    const tokens: TokenValue[] = [];

    while (!this.is_at_end()) {
      this.skip_whitespace();

      const char = this.peek();

      if (char === "{") {
        tokens.push(this.token(Token.LEFT_BRACE));
        this.advance();
      } else if (char === "}") {
        tokens.push(this.token(Token.RIGHT_BRACE));
        this.advance();
      } else if (char === "[") {
        tokens.push(this.token(Token.LEFT_BRACKET));
        this.advance();
      } else if (char === "]") {
        tokens.push(this.token(Token.RIGHT_BRACKET));
        this.advance();
      } else if (char === ":") {
        tokens.push(this.token(Token.COLON));
        this.advance();
      } else if (char === ",") {
        tokens.push(this.token(Token.COMMA));
        this.advance();
      } else if (char === '"') {
        tokens.push(this.token(Token.STRING, this.read_string()));
      } else if (this.is_digit(char)) {
        tokens.push(this.token(Token.NUMBER, this.read_number()));
      } else if (this.is_alpha(char)) {
        let word = "";

        while (!this.is_at_end() && this.is_alpha(this.peek())) {
          word += this.peek();
          this.advance();
        }

        if (this.is_keyword(word)) {
          tokens.push(this.token(Keywords[word as keyof typeof Keywords]));
        } else {
          throw new Error(`Unexpected Token: ${word}`);
        }
      } else {
        throw new Error(`Unexpected Token at: ${char}`);
      }
    }

    return tokens;
  }

  private token(type: Token, value?: string): TokenValue {
    return { type, value };
  }
}

const input =
  '{"name": "yousef", "age": 21, "isActive": true, "skills": ["skill1", "skill2"]}';
const lexer = new Lexer(input);
const tokens = lexer.tokenize();
console.log(
  tokens.map((token) => ({ type: Token[token.type], value: token.value })),
);
