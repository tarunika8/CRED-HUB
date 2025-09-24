
import React, { useState } from 'react';
import type { Certificate, UserProfile } from '../types';
import { CertificateCard } from './CertificateCard';
import { CreditScore } from './CreditScore';
import { ImportCertificate } from './ImportCertificate';

interface DashboardProps {
  user: UserProfile;
  certificates: Certificate[];
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, certificates, addCertificate }) => {
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-400 mt-1">Here's an overview of your professional credentials.</p>
      </div>

      <CreditScore certificates={certificates} />

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl font-semibold text-white">My Credentials</h2>
        <button 
          onClick={() => setImportModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center sm:justify-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Import Certificate
        </button>
      </div>

      {certificates.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 rounded-lg">
            <p className="text-gray-400">You haven't added any certificates yet.</p>
            <p className="text-gray-500 mt-2">Click "Import Certificate" to get started.</p>
        </div>
      )}

      {isImportModalOpen && (
        <ImportCertificate 
            onClose={() => setImportModalOpen(false)} 
            onImport={(cert) => {
                addCertificate(cert);
                setImportModalOpen(false);
            }} 
        />
      )}
    </div>
  );
};
