import { json } from '@codemirror/lang-json';
import { githubLight } from '@uiw/codemirror-theme-github';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { Card } from '../ui/card';

export const JsonEditor = () => {
  const [value, setValue] = useState('');
  return (
    <div className='flex h-full min-h-0 flex-col gap-3 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-foreground'>JSON Input</h2>
      </div>
      <Card className='flex-1 min-h-0 p-0 rounded-none'>
        <ReactCodeMirror
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
          extensions={[json()]}
          className='h-full min-h-0 [&_.cm-editor]:h-full [&_.cm-gutters]:h-full [&_.cm-scroller]:h-full [&_.cm-content]:min-h-full'
          theme={githubLight}
        />
      </Card>
    </div>
  );
};
