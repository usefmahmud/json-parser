export type NodeType = "String" | "Object" | "Array" | "Number" | "Boolean" | "Null";

export interface ASTNode<T extends NodeType> {
  type: T;
}

interface StringNode extends ASTNode<"String"> {
  value: string;
}

export interface ObjectNode extends ASTNode<"Object"> {
  value: Record<string, AST>;
}

export interface ArrayNode extends ASTNode<"Array"> {
  value: AST[];
}

interface NumberNode extends ASTNode<"Number"> {
  value: number;
}

interface BooleanNode extends ASTNode<"Boolean"> {
  value: boolean;
}

interface NullNode extends ASTNode<"Null"> {
  value: null;
}

export type AST =
  | StringNode
  | ObjectNode
  | ArrayNode
  | NumberNode
  | BooleanNode
  | NullNode;
