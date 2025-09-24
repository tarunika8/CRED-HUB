
import React from 'react';
import type { Certificate, Job } from '../types';
import { mockJobs } from '../constants';

interface JobMatchingProps {
  certificates: Certificate[];
}

// Simple matching logic for demonstration
const getMatchedJobs = (certificates: Certificate[]): Job[] => {
    // In a real app, this would be a sophisticated API call.
    // Here we just return the mock data.
    return mockJobs.sort((a,b) => b.matchScore - a.matchScore);
};

export const JobMatching: React.FC<JobMatchingProps> = ({ certificates }) => {
    const matchedJobs = getMatchedJobs(certificates);
  return (
    <div>
        <h1 className="text-3xl font-bold text-white">Job & Internship Matches</h1>
        <p className="text-gray-400 mt-1">Discover opportunities that align with your verified skills.</p>

        <div className="mt-8 bg-gray-800 rounded-lg shadow-xl">
            <div className="divide-y divide-gray-700">
            {matchedJobs.map(job => (
                <div key={job.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-700/50 transition-colors">
                    <div className="flex-1 w-full md:w-auto mb-4 md:mb-0">
                        <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-400 hover:underline">{job.title}</a>
                        <p className="text-gray-300 mt-1">{job.company} - <span className="text-gray-400">{job.location}</span></p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {job.requiredSkills.map(skill => (
                                <span key={skill} className="text-xs font-semibold px-2 py-1 bg-gray-700 text-gray-300 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-start md:space-x-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-400">{job.matchScore}%</p>
                            <p className="text-xs text-gray-400">Match</p>
                        </div>
                        <a href={job.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Apply</a>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  );
};
