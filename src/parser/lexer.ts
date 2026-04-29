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

  private is_digit(char: string): boolean {
    return /^\d$/.test(char);
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
}
