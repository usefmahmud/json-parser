import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './components/ui/resizable';

function App() {
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
            <ResizablePanel defaultSize={50} minSize={30}></ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={50} minSize={30}></ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </main>
  );
}

export default App;
