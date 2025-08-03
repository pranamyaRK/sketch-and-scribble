import React, { useState, useCallback } from 'react';
import { DialogueLine } from './types';
import { generateDialogue, generateSceneImage } from './services/geminiService';
import DialogueDisplay from './components/DialogueDisplay';
import ImageDisplay from './components/ImageDisplay';
import Loader from './components/Loader';
import ErrorAlert from './components/ErrorAlert';
import SparklesIcon from './components/icons/SparklesIcon';
import ImageIcon from './components/icons/ImageIcon';
import KeyIcon from './components/icons/KeyIcon';
import ApiKeyModal from './components/ApiKeyModal';

const App: React.FC = () => {
  const [scenario, setScenario] = useState<string>('');

  const [dialogues, setDialogues] = useState<DialogueLine[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);

  const handleGenerateDialogue = useCallback(async () => {
    if (!apiKey) {
      setError("Please set your Google Gemini API key before generating content.");
      setApiKeyModalOpen(true);
      return;
    }
    if (!scenario.trim()) {
      setError("Please enter a scenario description.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setDialogues(null);

    try {
      const result = await generateDialogue(apiKey, scenario);
      setDialogues(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [scenario, apiKey]);

  const handleGenerateImage = useCallback(async () => {
    if (!apiKey) {
      setImageError("Please set your Google Gemini API key before generating content.");
      setApiKeyModalOpen(true);
      return;
    }
    if (!scenario.trim()) {
      setImageError("Please enter a scenario description.");
      return;
    }
    setIsImageLoading(true);
    setImageError(null);
    setImage(null);

    try {
      const result = await generateSceneImage(apiKey, scenario);
      setImage(result);
    } catch (e) {
      if (e instanceof Error) {
        setImageError(e.message);
      } else {
        setImageError("An unknown error occurred.");
      }
    } finally {
      setIsImageLoading(false);
    }
  }, [scenario, apiKey]);

  const exampleScenario = "In the cursed forest of Eldoria, a cynical rogue named Kael and an idealistic knight, Seraphina, discover an ancient, glowing ruin. Kael wants the treasure he assumes is inside, while Seraphina believes it's a sacred place they shouldn't disturb.";

  const anyLoading = isLoading || isImageLoading;
  const hasContent = dialogues || image;
  const hasAnyError = error || imageError;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        currentKey={apiKey}
        onSave={(key) => {
          setApiKey(key);
          setApiKeyModalOpen(false);
          if (error?.includes('API key')) setError(null);
          if (imageError?.includes('API key')) setImageError(null);
        }}
      />
      <main className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={() => setApiKeyModalOpen(true)}
            className="flex items-center px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
          >
            <KeyIcon className="h-4 w-4 mr-2" />
            <span>API Key</span>
            <span
              className={`ml-3 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${apiKey ? 'bg-green-500' : 'bg-red-500'}`}
              title={apiKey ? 'API Key is set' : 'API Key is not set'}
            />
          </button>
        </div>

        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
            Sketch 'n' Scribble: Scene & Dialogue Generator
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Describe a scene, and let AI craft the conversation and visualize the setting.
          </p>
        </header>

        <div className="w-full bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700">
          <label htmlFor="scenario-input" className="block text-lg font-semibold text-slate-200 mb-2">
            Your Scenario
          </label>
          <p className="text-sm text-slate-400 mb-4">
            Describe the characters, setting, and situation. The more detail, the better the results!
          </p>
          <textarea
            id="scenario-input"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder={exampleScenario}
            className="w-full h-48 p-4 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-200 text-slate-200 placeholder-slate-500"
            disabled={anyLoading}
          />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleGenerateDialogue}
              disabled={anyLoading || !scenario.trim()}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="mr-2 h-5 w-5" />
                  Generate Dialogue
                </>
              )}
            </button>
            <button
              onClick={handleGenerateImage}
              disabled={anyLoading || !scenario.trim()}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
            >
              {isImageLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Scene...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-5 w-5" />
                  Generate Scene Image
                </>
              )}
            </button>
          </div>
          {!apiKey && (
            <div className="mt-4 text-center text-sm text-yellow-400 p-3 bg-yellow-900/40 rounded-md border border-yellow-800">
              API Key not set. Please <button onClick={() => setApiKeyModalOpen(true)} className="font-bold underline hover:text-yellow-300 focus:outline-none focus:text-yellow-200">set your API key</button> to enable generation.
            </div>
          )}
        </div>

        <div className="w-full">
          <ImageDisplay
            imageUrl={image}
            isLoading={isImageLoading}
            error={imageError}
          />

          {isLoading && <div className="mt-8"><Loader /></div>}
          {error && <div className="mt-8"><ErrorAlert message={error} /></div>}
          {dialogues && <DialogueDisplay dialogueLines={dialogues} />}

          {!anyLoading && !hasContent && !hasAnyError && (
            <div className="text-center mt-8 py-12 px-6 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
              <h3 className="text-slate-400">Your generated scene and dialogue will appear here.</h3>
            </div>
          )}
        </div>

        <footer className="text-center mt-16 text-slate-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
