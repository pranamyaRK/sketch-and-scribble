import React from 'react';
import Loader from './Loader';
import ErrorAlert from './ErrorAlert';
import DownloadIcon from './icons/DownloadIcon';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
  const showComponent = imageUrl || isLoading || error;

  if (!showComponent) {
    return null;
  }
  
  return (
    <div className="mt-8 w-full bg-slate-800/50 rounded-lg border border-slate-700 shadow-lg overflow-hidden">
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-100">Scene Visualization</h3>
                {imageUrl && !isLoading && !error && (
                    <a
                    href={imageUrl}
                    download="narrative-scene.jpeg"
                    className="flex items-center px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500"
                    aria-label="Download scene image"
                    >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download
                    </a>
                )}
            </div>
            <div className="bg-slate-900 rounded-md flex items-center justify-center aspect-video">
                {isLoading && <Loader />}
                {error && <div className="p-4 w-full"><ErrorAlert message={error} /></div>}
                {imageUrl && !isLoading && !error && (
                    <img 
                        src={imageUrl} 
                        alt="Generated scene from scenario" 
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
        </div>
    </div>
  );
};

export default ImageDisplay;