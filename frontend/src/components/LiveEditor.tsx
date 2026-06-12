import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Terminal } from 'lucide-react';

interface LiveEditorProps {
  initialCode: string;
  language: string;
}

const LiveEditor: React.FC<LiveEditorProps> = ({ initialCode, language }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');

  // Reset code when initialCode changes (e.g. changing modules)
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const runCode = () => {
    if (language === 'html' || language === 'css' || language === 'javascript') {
      // For web languages, we use the iframe srcDoc directly mapped to state, 
      // but we can add a small artificial delay or just let it update on 'Run' click
      // if we want to mimic W3Schools "Run" button instead of live updating.
      // Here we will use the 'code' state directly for the iframe.
    } else if (language === 'python') {
      // Fake python execution
      setOutput('> Executing Python script...\n> Hello from Python simulation!\n> ' + code.split('\n')[0]);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
  };

  const isWeb = language === 'html' || language === 'css' || language === 'javascript';

  // Construct HTML for the iframe
  const srcDoc = isWeb ? `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 16px; margin: 0; }
          ${language === 'css' ? code : ''}
        </style>
      </head>
      <body>
        ${language === 'html' ? code : ''}
        ${language === 'javascript' ? `<script>${code}</script>` : ''}
        ${language === 'css' && !code.includes('<html') ? `<div class="preview-box"><h3>CSS Preview</h3><p>This is a paragraph styled by your CSS.</p></div>` : ''}
      </body>
    </html>
  ` : '';

  return (
    <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[500px]">
      
      {/* Header bar */}
      <div className="bg-[#2D2D2D] px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="text-gray-300 font-bold tracking-wider text-sm uppercase">Try It Yourself</span>
          <span className="px-2 py-1 bg-white/10 rounded text-xs text-white uppercase">{language}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 text-gray-300 rounded transition-colors"
          >
            <RotateCcw size={14} /> Reset
          </button>
          {!isWeb && (
            <button 
              onClick={runCode}
              className="flex items-center gap-1 px-4 py-1.5 text-sm bg-green-600 hover:bg-green-500 text-white font-bold rounded transition-colors"
            >
              <Play size={14} fill="currentColor" /> Run
            </button>
          )}
        </div>
      </div>

      {/* Editor & Output Split */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Editor Pane */}
        <div className="flex-1 relative flex flex-col bg-[#1E1E1E] border-r border-white/10 md:border-b-0 border-b">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-4 bg-transparent text-[#D4D4D4] font-mono text-sm resize-none focus:outline-none"
            spellCheck="false"
            style={{ tabSize: 2 }}
          />
        </div>

        {/* Output Pane */}
        <div className="flex-1 bg-white relative flex flex-col">
          {isWeb ? (
            <iframe
              title="Preview"
              srcDoc={srcDoc}
              className="w-full h-full border-none bg-white"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="flex-1 bg-[#0D1117] text-gray-300 p-4 font-mono text-sm overflow-auto">
              <div className="flex items-center gap-2 mb-4 text-gray-500">
                <Terminal size={16} /> Python Terminal Simulator
              </div>
              <pre className="whitespace-pre-wrap">{output || 'Click "Run" to see the output.'}</pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LiveEditor;
