import React from 'react';
import { DialogueLine } from '../types';
import DownloadIcon from './icons/DownloadIcon';

interface DialogueDisplayProps {
  dialogueLines: DialogueLine[];
}

const DialogueDisplay: React.FC<DialogueDisplayProps> = ({ dialogueLines }) => {
  const handleDownloadJson = () => {
    if (!dialogueLines || dialogueLines.length === 0) return;
    
    const jsonString = JSON.stringify(dialogueLines, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dialogue.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 w-full bg-slate-800/50 rounded-lg border border-slate-700 shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-100">Generated Dialogue</h3>
          <button
            onClick={handleDownloadJson}
            className="flex items-center px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
            aria-label="Download dialogue as JSON"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download JSON
          </button>
        </div>
        <div className="space-y-4">
          {dialogueLines.map((line, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-slate-900/70 rounded-md">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border-2 border-cyan-500">
                <span className="text-xl font-bold text-cyan-400">{line.character.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-cyan-400">{line.character}</p>
                <p className="text-slate-300 italic">"{line.dialogue}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogueDisplay;