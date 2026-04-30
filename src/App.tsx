import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';
import ASTTree from './components/features/ast-tree';
import ASTVisualizer from './components/features/ast-visualizer';
import { JsonEditor } from './components/features/json-editor';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import type { AST } from './parser/ast';
import { Lexer } from './parser/lexer';
import { Parser } from './parser/parser';

function App() {
  const [json, setJson] = useState('');
  const [ast, setAST] = useState<AST | null>(null);
  useEffect(() => {
    try {
      const tokens = new Parser(new Lexer(json).tokenize()).parse();
      setAST(tokens);
      console.log(tokens);
    } catch (e) {
      setAST(null);
    }
  }, [json]);

  return (
    <main className='h-screen w-screen overflow-hidden bg-background'>
      <div className='flex flex-col h-full'>
        <header className='border-b border-border px-6 py-4'>
          <h1 className='text-2xl font-bold text-foreground'>
            JSON Parser & Visualizer
          </h1>
        </header>

        <div className='flex-1 overflow-hidden'>
          <ResizablePanelGroup orientation='horizontal'>
            <ResizablePanel defaultSize={50} minSize={30}>
              <JsonEditor code={json} setCode={setJson} />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={50} minSize={30}>
              <Tabs defaultValue='tree' className='h-full flex flex-col'>
                <div className='border-b border-border px-4 py-2'>
                  <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='tree'>AST Tree</TabsTrigger>
                    <TabsTrigger value='graph'>Graph Visualization</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value='tree' className='flex-1 overflow-hidden'>
                  <ASTTree ast={ast} />
                </TabsContent>

                <TabsContent value='graph' className='flex-1 overflow-hidden'>
                  {/* the visualizer component is fully ai generated (عشان فلاح جرافس xD) */}
                  <ASTVisualizer ast={ast} />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </main>
  );
}

export default App;
