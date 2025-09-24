import React, { useMemo } from 'react';
import type { Certificate } from '../types';
import { BadgeIcon } from './icons/BadgeIcon';

interface CreditScoreProps {
  certificates: Certificate[];
}

// Mock scoring logic
const calculateScore = (certificates: Certificate[]) => {
  if (certificates.length === 0) return { score: 0, rank: 'New Learner', badges: [] };

  const totalPoints = certificates.reduce((sum, cert) => {
    let levelMultiplier = 1;
    if (cert.level === 'Intermediate') levelMultiplier = 1.2;
    if (cert.level === 'Advanced') levelMultiplier = 1.5;
    if (cert.level === 'Expert') levelMultiplier = 2.0;

    return sum + (cert.relevance * 5 + cert.reputation * 5) * levelMultiplier;
  }, 0);
  
  const averagePoints = totalPoints / certificates.length;
  const score = Math.min(100, Math.round(averagePoints / 2));

  let rank = 'New Learner';
  const badges: {name: string, color: string}[] = [];

  if (score > 40) {
      rank = 'Skill Apprentice';
      badges.push({ name: 'Rising Star', color: 'text-yellow-400' });
  }
  if (score > 60) {
      rank = 'Credentialed Pro';
      badges.push({ name: 'Pro Learner', color: 'text-green-400' });
  }
  if (score > 80) {
      rank = 'Expert Virtuoso';
      badges.push({ name: 'Top 10%', color: 'text-purple-400' });
  }
  if (certificates.some(c => c.issuer.toLowerCase().includes('google'))) {
      badges.push({ name: 'Google Certified', color: 'text-blue-400' });
  }
    if (certificates.some(c => c.issuer.toLowerCase().includes('aws'))) {
      badges.push({ name: 'Cloud Certified', color: 'text-orange-400' });
  }


  return { score, rank, badges };
};

export const CreditScore: React.FC<CreditScoreProps> = ({ certificates }) => {
  const { score, rank, badges } = useMemo(() => calculateScore(certificates), [certificates]);
  const scorePercentage = score;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                        className="text-gray-700"
                        strokeDasharray="100, 100"
                        strokeWidth="3"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                    />
                    <path
                        className="text-blue-500"
                        strokeDasharray={`${scorePercentage}, 100`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{score}</span>
                    <span className="text-sm text-gray-400">Credit Score</span>
                </div>
            </div>
             <div className="ml-6">
                <h3 className="text-2xl font-bold text-white">{rank}</h3>
                <p className="text-gray-400">Based on your certified skills and achievements.</p>
            </div>
        </div>
        <div className="mt-6 md:mt-0 flex flex-wrap gap-3 justify-center">
            {badges.map((badge, index) => (
                <div key={index} className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
                    <BadgeIcon className={`w-4 h-4 mr-2 ${badge.color}`} fill={badge.color} />
                    <span className="text-sm font-medium text-gray-200">{badge.name}</span>
                </div>
            ))}
        </div>
    </div>
  );
};