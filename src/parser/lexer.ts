enum Tokens {
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

const Keywords: Record<string, Tokens> = {
  true: Tokens.TRUE,
  false: Tokens.FALSE,
  null: Tokens.NULL,
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

  private skip_whitespace(): void {
    while (!this.is_at_end() && /\s/.test(this.peek())) {
      this.advance();
    }
  }
}
