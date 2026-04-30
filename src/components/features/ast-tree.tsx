import type { AST } from '@/parser/ast';
import { json } from '@codemirror/lang-json';
import { githubLight } from '@uiw/codemirror-theme-github';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useMemo } from 'react';
import { Card } from '../ui/card';

interface ASTTreeProps {
  ast: AST | null;
}

const ASTTree = ({ ast }: ASTTreeProps) => {
  const astString = useMemo(
    () => (ast ? JSON.stringify(ast, null, 2) : '// No AST available yet.'),
    [ast]
  );

  return (
    <div className='flex h-full min-h-0 flex-col gap-3 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-foreground'>AST Tree</h2>
      </div>
      <Card className='flex-1 min-h-0 rounded-none p-0'>
        <ReactCodeMirror
          value={astString}
          editable={false}
          readOnly
          extensions={[json()]}
          className='h-full min-h-0 [&_.cm-content]:min-h-full [&_.cm-editor]:h-full [&_.cm-gutters]:h-full [&_.cm-scroller]:h-full'
          theme={githubLight}
        />
      </Card>
    </div>
  );
};

export default ASTTree;
