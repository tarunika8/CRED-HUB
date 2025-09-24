
import React, { useState, useCallback } from 'react';
import type { Certificate, RoadmapSuggestion } from '../types';
import { generateLearningRoadmap } from '../services/geminiService';

interface LearningRoadmapProps {
  certificates: Certificate[];
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ certificates }) => {
    const [roadmap, setRoadmap] = useState<RoadmapSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateRoadmap = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setRoadmap([]);
        try {
            const result = await generateLearningRoadmap(certificates);
            setRoadmap(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [certificates]);

    return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Your Personalized Learning Roadmap</h1>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">Leverage the power of AI to analyze your current skillset and discover the best next steps to achieve your career goals.</p>
        <button
          onClick={handleGenerateRoadmap}
          disabled={isLoading}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing Your Profile...' : '✨ Generate My AI Roadmap'}
        </button>
      </div>

       <div className="mt-10">
        {isLoading && (
            <div className="flex justify-center items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <p className="text-gray-300">Generating your future...</p>
            </div>
        )}
        {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg text-center">
                <p><strong>Oops! Something went wrong.</strong></p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        )}
        {roadmap.length > 0 && (
            <div className="space-y-4">
                {roadmap.map((suggestion, index) => (
                    <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg">
                        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl text-blue-400">{index + 1}</div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white">{suggestion.title}</h3>
                                <p className="text-gray-300 mt-2">{suggestion.description}</p>
                                <div className="mt-4 bg-gray-700/50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                                    <p className="text-sm font-semibold text-blue-300">Why it's a good next step:</p>
                                    <p className="text-sm text-gray-400 mt-1">{suggestion.rationale}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
        {!isLoading && roadmap.length === 0 && !error && (
            <div className="text-center text-gray-500 pt-10">
                <p>Your personalized roadmap will appear here.</p>
                <p>Click the button above to begin.</p>
            </div>
        )}
       </div>
    </div>
  );
};
