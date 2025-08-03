import React, { useState, useEffect } from 'react';
import KeyIcon from './icons/KeyIcon';
import XIcon from './icons/XIcon';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentKey }) => {
  const [key, setKey] = useState(currentKey);

  useEffect(() => {
    setKey(currentKey);
  }, [currentKey, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(key);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
        onClose();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleSave();
    }
  }

  return (
    <div 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 w-full max-w-md p-6 sm:p-8 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <KeyIcon className="h-6 w-6 text-cyan-400 mr-3" />
            <h2 className="text-2xl font-bold text-slate-100">Set API Key</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-cyan-500" aria-label="Close modal">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg mb-6 text-sm" role="alert">
            <strong className="font-bold">Security Warning:</strong> Your API key is only used in your browser for this session. It is never stored on a server. Close this browser tab to clear it.
        </div>
        
        <div>
          <label htmlFor="api-key-input" className="block text-sm font-medium text-slate-300 mb-2">
            Google Gemini API Key
          </label>
          <input
            id="api-key-input"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Enter your API key here"
            className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-200 text-slate-200 placeholder-slate-500"
            autoFocus
          />
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!key.trim()}
            className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
          >
            Save Key
          </button>
        </div>
      </div>
       <style>{`
          @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.2s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default ApiKeyModal;
