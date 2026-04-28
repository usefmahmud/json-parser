enum Token {
  Identifier,
  Int,
  String,
  Assignment,
  IntKeyword,
  StringKeyword,
}

const KeywordMap: Record<string, Token> = {
  Int: Token.IntKeyword,
  String: Token.StringKeyword,
};

type TokenValue = {
  type: Token;
  val: string;
};

export class Lexer {
  private position = 0;

  constructor(private input: string) {}

  public tokenize(): TokenValue[] {
    const tokens: TokenValue[] = [];

    while (this.position < this.input.length) {
      const currentChar = this.input[this.position];

      if (this.isWhitespace(currentChar)) {
        this.position++;
        continue;
      }

      if (this.isAlpha(currentChar)) {
        const value = this.readIdentifier();
        tokens.push({
          type: KeywordMap[value] ?? Token.Identifier,
          val: value,
        });
        continue;
      }

      if (this.isDigit(currentChar)) {
        tokens.push({
          type: Token.Int,
          val: this.readNumber(),
        });
        continue;
      }

      if (currentChar === '"') {
        tokens.push({
          type: Token.String,
          val: this.readString(),
        });
        continue;
      }

      if (currentChar === "=") {
        tokens.push({ type: Token.Assignment, val: "=" });
        this.position++;
        continue;
      }

      throw new Error(`Unexpected character: ${currentChar}`);
    }

    return tokens;
  }

  private isAlpha(char: string): boolean {
    return /^[a-zA-Z]$/.test(char);
  }

  private isDigit(char: string): boolean {
    return /^[0-9]$/.test(char);
  }

  private isWhitespace(char: string): boolean {
    return /^\s$/.test(char);
  }

  private readIdentifier(): string {
    let res = "";

    while (
      this.position < this.input.length &&
      this.isAlpha(this.input[this.position])
    ) {
      res += this.input[this.position];
      this.position++;
    }

    return res;
  }

  private readNumber(): string {
    let res = "";

    while (
      this.position < this.input.length &&
      this.isDigit(this.input[this.position])
    ) {
      res += this.input[this.position];
      this.position++;
    }

    return res;
  }

  private readString(): string {
    let res = "";
    this.position++; // skip opening quote

    while (
      this.position < this.input.length &&
      this.input[this.position] !== '"'
    ) {
      res += this.input[this.position];
      this.position++;
    }

    this.position++; // skip closing quote
    return res;
  }
}
